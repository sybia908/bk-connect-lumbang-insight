
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Profile, fetchUserProfile } from '@/services/profileService';
import { signInWithEmail, signInWithGoogle, signUpWithEmail, signOutUser } from '@/services/authHelpers';
import { SessionManager } from '@/services/sessionManager';

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

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionManager, setSessionManager] = useState<SessionManager | null>(null);
  const { toast } = useToast();

  const handleSessionTimeout = async () => {
    await handleSignOut();
    toast({
      title: "Sesi Berakhir",
      description: "Anda telah logout otomatis karena tidak ada aktivitas selama 15 menit.",
      variant: "destructive"
    });
  };

  const handleSignOut = async () => {
    try {
      if (sessionManager) {
        sessionManager.cleanup();
        setSessionManager(null);
      }
      
      const { error } = await signOutUser();
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
            const profileData = await fetchUserProfile(session.user.id);
            setProfile(profileData);
            
            // Setup session manager for inactivity tracking
            if (!sessionManager) {
              const manager = new SessionManager(handleSessionTimeout);
              manager.startTimer();
              setSessionManager(manager);
            }
          }, 500);
        } else {
          setProfile(null);
          if (sessionManager) {
            sessionManager.cleanup();
            setSessionManager(null);
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
          const profileData = await fetchUserProfile(session.user.id);
          setProfile(profileData);
          
          if (!sessionManager) {
            const manager = new SessionManager(handleSessionTimeout);
            manager.startTimer();
            setSessionManager(manager);
          }
        }, 500);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
      if (sessionManager) {
        sessionManager.cleanup();
      }
    };
  }, []);

  const value = {
    user,
    profile,
    session,
    signIn: signInWithEmail,
    signInWithGoogle,
    signUp: signUpWithEmail,
    signOut: handleSignOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
