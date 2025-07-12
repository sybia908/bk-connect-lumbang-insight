
import { supabase } from '@/integrations/supabase/client';

export interface Profile {
  id: string;
  email: string;
  username: string;
  nama_lengkap: string;
  role: 'admin' | 'guru_bk' | 'wali_kelas' | 'siswa';
  is_active: boolean;
}

export const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
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
