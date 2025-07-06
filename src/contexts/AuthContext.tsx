
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  email: string;
  username: string;
  nama_lengkap: string;
  role: 'admin' | 'guru_bk' | 'wali_kelas' | 'siswa';
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Auto logout after 15 minutes of inactivity
  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    if (session) {
      const newTimer = setTimeout(async () => {
        await signOut();
        toast({
          title: "Sesi Berakhir",
          description: "Anda telah logout otomatis karena tidak ada aktivitas selama 15 menit.",
          variant: "destructive"
        });
      }, 15 * 60 * 1000); // 15 minutes
      
      setInactivityTimer(newTimer);
    }
  };

  // Track user activity
  useEffect(() => {
    const handleActivity = () => resetInactivityTimer();
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [inactivityTimer, session]);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      console.log('Profile fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile with a small delay to ensure database trigger has run
          setTimeout(async () => {
            const profileData = await fetchProfile(session.user.id);
            setProfile(profileData);
            resetInactivityTimer();
          }, 500); // Small delay to ensure profile is created
        } else {
          setProfile(null);
          if (inactivityTimer) {
            clearTimeout(inactivityTimer);
            setInactivityTimer(null);
          }
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
          resetInactivityTimer();
        }, 500);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }

      console.log('Sign in successful:', data.user?.email);

      // Update last login
      if (data.user) {
        try {
          await supabase
            .from('profiles')
            .update({ last_login: new Date().toISOString() })
            .eq('user_id', data.user.id);
        } catch (updateError) {
          console.error('Error updating last login:', updateError);
          // Don't throw this error as it's not critical
        }
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('Attempting Google sign in');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error('Google sign in error:', error);
      }

      return { data, error };
    } catch (error) {
      console.error('Google sign in error:', error);
      return { data: null, error };
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log('Attempting sign up for:', email, 'with userData:', userData);
      
      // Check if username already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', userData.username)
        .single();

      if (existingUser) {
        throw new Error('Username sudah digunakan, silakan pilih username lain');
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            username: userData.username,
            nama_lengkap: userData.nama_lengkap,
            role: userData.role
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        
        // Handle specific errors
        if (error.message.includes('User already registered')) {
          throw new Error('Email sudah terdaftar, silakan gunakan email lain atau login');
        } else if (error.message.includes('Password should be at least')) {
          throw new Error('Password minimal 6 karakter');
        } else if (error.message.includes('Invalid email')) {
          throw new Error('Format email tidak valid');
        }
        
        throw error;
      }

      console.log('Sign up successful:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error: error instanceof Error ? error : new Error('Terjadi kesalahan saat mendaftar') };
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out');
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
        setInactivityTimer(null);
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
      
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    user,
    profile,
    session,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
