
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  AlertTriangle, 
  MessageSquare, 
  TrendingUp,
  LogOut,
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface WaliKelasStats {
  totalSiswaKelas: number;
  pelanggaranBulanIni: number;
  konsultasiBulanIni: number;
  siswaRisikoTinggi: number;
}

const WaliKelasDashboard = () => {
  const { profile, signOut } = useAuth();
  const [stats, setStats] = useState<WaliKelasStats>({
    totalSiswaKelas: 0,
    pelanggaranBulanIni: 0,
    konsultasiBulanIni: 0,
    siswaRisikoTinggi: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Get wali kelas data first
      const { data: kelasData } = await supabase
        .from('kelas')
        .select('id, nama_kelas')
        .eq('wali_kelas_id', profile?.id)
        .single();

      if (kelasData) {
        // Fetch students in class
        const { count: siswaCount } = await supabase
          .from('siswa')
          .select('*', { count: 'exact', head: true })
          .eq('kelas_id', kelasData.id);

        // Fetch violations this month for class students
        const currentMonth = new Date().toISOString().slice(0, 7);
        const { count: pelanggaranCount } = await supabase
          .from('pelanggaran_siswa')
          .select('siswa_id', { count: 'exact', head: true })
          .in('siswa_id', 
            (await supabase.from('siswa').select('id').eq('kelas_id', kelasData.id))
              .data?.map(s => s.id) || []
          )
          .gte('tanggal_pelanggaran', `${currentMonth}-01`);

        // Fetch consultations this month for class students
        const { count: konsultasiCount } = await supabase
          .from('konsultasi')
          .select('siswa_id', { count: 'exact', head: true })
          .in('siswa_id', 
            (await supabase.from('siswa').select('id').eq('kelas_id', kelasData.id))
              .data?.map(s => s.id) || []
          )
          .gte('tanggal_pengajuan', `${currentMonth}-01T00:00:00`);

        // Fetch high-risk students (with high violation points)
        const { count: risikoTinggiCount } = await supabase
          .from('siswa')
          .select('*', { count: 'exact', head: true })
          .eq('kelas_id', kelasData.id)
          .gte('total_poin_pelanggaran', 50);

        setStats({
          totalSiswaKelas: siswaCount || 0,
          pelanggaranBulanIni: pelanggaranCount || 0,
          konsultasiBulanIni: konsultasiCount || 0,
          siswaRisikoTinggi: risikoTinggiCount || 0
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold">BK</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Dashboard Wali Kelas</h1>
                <p className="text-sm text-gray-500">BK Connect - SMA Negeri 1 Lumbang</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{profile?.nama_lengkap}</p>
                <Badge variant="outline" className="text-xs">Wali Kelas</Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Selamat Datang, {profile?.nama_lengkap}
          </h2>
          <p className="text-gray-600">
            Monitor dan kelola siswa kelas Anda dari dashboard ini.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Siswa Kelas</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {loading ? '...' : stats.totalSiswaKelas}
              </div>
              <p className="text-xs text-gray-500">Siswa dalam kelas</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pelanggaran Bulan Ini</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {loading ? '...' : stats.pelanggaranBulanIni}
              </div>
              <p className="text-xs text-gray-500">Kasus tercatat</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Konsultasi Bulan Ini</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {loading ? '...' : stats.konsultasiBulanIni}
              </div>
              <p className="text-xs text-gray-500">Konsultasi diajukan</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Siswa Risiko Tinggi</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {loading ? '...' : stats.siswaRisikoTinggi}
              </div>
              <p className="text-xs text-gray-500">Perlu perhatian khusus</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Data Siswa Kelas
              </CardTitle>
              <CardDescription>
                Lihat dan monitor siswa dalam kelas Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Lihat Daftar Siswa
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Siswa Bermasalah
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Riwayat Konsultasi
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Monitor Pelanggaran
              </CardTitle>
              <CardDescription>
                Pantau pelanggaran dan kasus siswa kelas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Lihat Pelanggaran Terbaru
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analisis Pelanggaran
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Laporan Bulanan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default WaliKelasDashboard;
