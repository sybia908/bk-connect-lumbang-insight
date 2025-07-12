
import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async () => {
  try {
    // First check if admin user already exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'andikabgs@gmail.com')
      .single();

    if (existingProfile) {
      console.log('Admin user already exists in profiles table');
      return { success: true, message: 'Admin user already exists' };
    }

    // Check if user exists in auth
    const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error checking existing users:', listError);
    }

    const existingAuthUser = usersData?.users?.find((user: any) => user.email === 'andikabgs@gmail.com');
    
    if (!existingAuthUser) {
      console.log('Admin user needs to be created through registration');
      return { 
        success: false, 
        message: 'Admin user must register through the login page first' 
      };
    }

    // If auth user exists but no profile, create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          user_id: existingAuthUser.id,
          email: 'andikabgs@gmail.com',
          username: 'andikabgs',
          nama_lengkap: 'Administrator BK',
          role: 'admin',
          is_active: true
        }
      ]);

    if (profileError) {
      console.error('Error creating admin profile:', profileError);
      return { success: false, message: 'Failed to create admin profile' };
    }

    return { success: true, message: 'Admin profile created successfully' };
  } catch (error) {
    console.error('Error in createAdminUser:', error);
    return { success: false, message: 'Error creating admin user' };
  }
};
