
import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async () => {
  try {
    // First, sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'andikabgs@gmail.com',
      password: 'G4l4xymini',
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          username: 'Afrils',
          nama_lengkap: 'Afril Sandi',
          role: 'admin'
        }
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      return { success: false, error: authError.message };
    }

    console.log('Admin user created successfully:', authData);
    return { success: true, data: authData };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return { success: false, error: error.message };
  }
};
