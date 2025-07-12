
import { supabase } from '@/integrations/supabase/client';

export const signInWithEmail = async (email: string, password: string) => {
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

export const signInWithGoogle = async () => {
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

export const signUpWithEmail = async (email: string, password: string, userData: any) => {
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

export const signOutUser = async () => {
  try {
    console.log('Signing out');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
    }
    return { error };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
};
