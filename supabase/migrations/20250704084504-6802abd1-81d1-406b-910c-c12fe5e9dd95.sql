
-- Create enums for various statuses and roles
CREATE TYPE user_role AS ENUM ('admin', 'guru_bk', 'wali_kelas', 'siswa');
CREATE TYPE jenis_kelamin AS ENUM ('L', 'P');
CREATE TYPE status_konsultasi AS ENUM ('pending', 'dijadwalkan', 'selesai', 'dibatalkan');
CREATE TYPE jenis_pelanggaran AS ENUM ('ringan', 'sedang', 'berat');
CREATE TYPE status_kehadiran AS ENUM ('hadir', 'tidak_hadir', 'izin');

-- Profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  nama_lengkap TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'siswa',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Classes table
CREATE TABLE public.kelas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_kelas TEXT NOT NULL,
  tingkat INTEGER NOT NULL CHECK (tingkat IN (10, 11, 12)),
  jurusan TEXT,
  wali_kelas_id UUID REFERENCES public.profiles(id),
  tahun_ajaran TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Students table
CREATE TABLE public.siswa (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  nis TEXT UNIQUE NOT NULL,
  nisn TEXT UNIQUE NOT NULL,
  nama_lengkap TEXT NOT NULL,
  jenis_kelamin jenis_kelamin NOT NULL,
  tempat_lahir TEXT,
  tanggal_lahir DATE,
  alamat TEXT,
  no_hp TEXT,
  nama_orang_tua TEXT,
  no_hp_orang_tua TEXT,
  kelas_id UUID REFERENCES public.kelas(id),
  total_poin_pelanggaran INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Teachers table
CREATE TABLE public.guru (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  nip TEXT UNIQUE NOT NULL,
  nama_lengkap TEXT NOT NULL,
  jenis_kelamin jenis_kelamin NOT NULL,
  no_hp TEXT,
  alamat TEXT,
  mata_pelajaran TEXT,
  is_guru_bk BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Violation types table
CREATE TABLE public.jenis_pelanggaran_ref (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_pelanggaran TEXT NOT NULL,
  kategori jenis_pelanggaran NOT NULL,
  poin INTEGER NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Student violations table
CREATE TABLE public.pelanggaran_siswa (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  siswa_id UUID REFERENCES public.siswa(id) ON DELETE CASCADE NOT NULL,
  jenis_pelanggaran_id UUID REFERENCES public.jenis_pelanggaran_ref(id) NOT NULL,
  tanggal_pelanggaran DATE NOT NULL DEFAULT CURRENT_DATE,
  keterangan TEXT,
  tindak_lanjut TEXT,
  guru_pelapor_id UUID REFERENCES public.guru(id),
  poin INTEGER NOT NULL,
  status TEXT DEFAULT 'aktif',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Consultations table
CREATE TABLE public.konsultasi (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  siswa_id UUID REFERENCES public.siswa(id) ON DELETE CASCADE NOT NULL,
  guru_bk_id UUID REFERENCES public.guru(id),
  judul TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  kategori TEXT,
  status status_konsultasi DEFAULT 'pending',
  tanggal_pengajuan TIMESTAMP WITH TIME ZONE DEFAULT now(),
  tanggal_jadwal TIMESTAMP WITH TIME ZONE,
  lokasi TEXT,
  catatan_guru TEXT,
  tindak_lanjut TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Counseling attendance table
CREATE TABLE public.kehadiran_konseling (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  konsultasi_id UUID REFERENCES public.konsultasi(id) ON DELETE CASCADE NOT NULL,
  siswa_id UUID REFERENCES public.siswa(id) ON DELETE CASCADE NOT NULL,
  status_kehadiran status_kehadiran NOT NULL,
  tanggal_kehadiran DATE NOT NULL,
  catatan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- News/announcements table
CREATE TABLE public.berita (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  judul TEXT NOT NULL,
  konten TEXT NOT NULL,
  penulis_id UUID REFERENCES public.profiles(id) NOT NULL,
  tanggal_publikasi TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_published BOOLEAN DEFAULT true,
  gambar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default violation types
INSERT INTO public.jenis_pelanggaran_ref (nama_pelanggaran, kategori, poin, deskripsi) VALUES
('Terlambat masuk kelas', 'ringan', 5, 'Datang terlambat ke sekolah atau kelas'),
('Tidak mengerjakan PR', 'ringan', 10, 'Tidak menyelesaikan pekerjaan rumah'),
('Tidak memakai seragam lengkap', 'ringan', 15, 'Tidak memakai atribut seragam sesuai aturan'),
('Membuat keributan di kelas', 'sedang', 25, 'Mengganggu proses pembelajaran'),
('Tidak sopan kepada guru', 'sedang', 35, 'Berbicara atau bersikap tidak sopan kepada guru'),
('Berkelahi dengan teman', 'berat', 50, 'Terlibat perkelahian dengan siswa lain'),
('Membawa barang terlarang', 'berat', 75, 'Membawa rokok, senjata tajam, atau barang terlarang lainnya'),
('Bolos sekolah', 'berat', 40, 'Tidak masuk sekolah tanpa keterangan yang jelas');

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kelas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guru ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jenis_pelanggaran_ref ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pelanggaran_siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.konsultasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kehadiran_konseling ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;

-- Create security definer functions to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.get_user_profile_id()
RETURNS UUID AS $$
  SELECT id FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin');
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_guru_bk()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p 
    JOIN public.guru g ON p.id = g.user_id 
    WHERE p.user_id = auth.uid() AND g.is_guru_bk = true
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can manage all profiles" ON public.profiles
  FOR ALL USING (public.is_admin());

-- RLS Policies for kelas table
CREATE POLICY "Authenticated users can view classes" ON public.kelas
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and Guru BK can manage classes" ON public.kelas
  FOR ALL USING (public.is_admin() OR public.is_guru_bk());

-- RLS Policies for siswa table
CREATE POLICY "Students can view their own data" ON public.siswa
  FOR SELECT USING (user_id = public.get_user_profile_id());

CREATE POLICY "Admins and Guru BK can view all students" ON public.siswa
  FOR SELECT USING (public.is_admin() OR public.is_guru_bk());

CREATE POLICY "Wali kelas can view their class students" ON public.siswa
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.kelas k 
      JOIN public.profiles p ON k.wali_kelas_id = p.id 
      WHERE k.id = siswa.kelas_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins and Guru BK can manage students" ON public.siswa
  FOR ALL USING (public.is_admin() OR public.is_guru_bk());

-- RLS Policies for guru table
CREATE POLICY "Teachers can view their own data" ON public.guru
  FOR SELECT USING (user_id = public.get_user_profile_id());

CREATE POLICY "Authenticated users can view teachers" ON public.guru
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage teachers" ON public.guru
  FOR ALL USING (public.is_admin());

-- RLS Policies for jenis_pelanggaran_ref table
CREATE POLICY "Authenticated users can view violation types" ON public.jenis_pelanggaran_ref
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and Guru BK can manage violation types" ON public.jenis_pelanggaran_ref
  FOR ALL USING (public.is_admin() OR public.is_guru_bk());

-- RLS Policies for pelanggaran_siswa table
CREATE POLICY "Students can view their own violations" ON public.pelanggaran_siswa
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.siswa s 
      WHERE s.id = pelanggaran_siswa.siswa_id AND s.user_id = public.get_user_profile_id()
    )
  );

CREATE POLICY "Admins and Guru BK can view all violations" ON public.pelanggaran_siswa
  FOR SELECT USING (public.is_admin() OR public.is_guru_bk());

CREATE POLICY "Wali kelas can view their class student violations" ON public.pelanggaran_siswa
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.siswa s 
      JOIN public.kelas k ON s.kelas_id = k.id 
      JOIN public.profiles p ON k.wali_kelas_id = p.id 
      WHERE s.id = pelanggaran_siswa.siswa_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins and Guru BK can manage violations" ON public.pelanggaran_siswa
  FOR ALL USING (public.is_admin() OR public.is_guru_bk());

-- RLS Policies for konsultasi table
CREATE POLICY "Students can view their own consultations" ON public.konsultasi
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.siswa s 
      WHERE s.id = konsultasi.siswa_id AND s.user_id = public.get_user_profile_id()
    )
  );

CREATE POLICY "Students can create their own consultations" ON public.konsultasi
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.siswa s 
      WHERE s.id = konsultasi.siswa_id AND s.user_id = public.get_user_profile_id()
    )
  );

CREATE POLICY "Admins and Guru BK can view all consultations" ON public.konsultasi
  FOR SELECT USING (public.is_admin() OR public.is_guru_bk());

CREATE POLICY "Admins and Guru BK can manage consultations" ON public.konsultasi
  FOR ALL USING (public.is_admin() OR public.is_guru_bk());

-- RLS Policies for kehadiran_konseling table
CREATE POLICY "Students can view their own attendance" ON public.kehadiran_konseling
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.siswa s 
      WHERE s.id = kehadiran_konseling.siswa_id AND s.user_id = public.get_user_profile_id()
    )
  );

CREATE POLICY "Admins and Guru BK can manage attendance" ON public.kehadiran_konseling
  FOR ALL USING (public.is_admin() OR public.is_guru_bk());

-- RLS Policies for berita table
CREATE POLICY "Everyone can view published news" ON public.berita
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins and Guru BK can manage news" ON public.berita
  FOR ALL USING (public.is_admin() OR public.is_guru_bk());

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, username, nama_lengkap, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'nama_lengkap', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'siswa')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update total violation points
CREATE OR REPLACE FUNCTION public.update_total_poin_pelanggaran()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.siswa 
    SET total_poin_pelanggaran = total_poin_pelanggaran + NEW.poin
    WHERE id = NEW.siswa_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.siswa 
    SET total_poin_pelanggaran = total_poin_pelanggaran - OLD.poin
    WHERE id = OLD.siswa_id;
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.siswa 
    SET total_poin_pelanggaran = total_poin_pelanggaran - OLD.poin + NEW.poin
    WHERE id = NEW.siswa_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update violation points
CREATE TRIGGER trigger_update_poin_pelanggaran
  AFTER INSERT OR UPDATE OR DELETE ON public.pelanggaran_siswa
  FOR EACH ROW EXECUTE FUNCTION public.update_total_poin_pelanggaran();
