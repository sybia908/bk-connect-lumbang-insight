
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  AlertTriangle, 
  Calendar, 
  BookOpen,
  LogOut,
  Plus,
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SiswaStats {
  totalPoinPelanggaran: number;
  konsultasiAktif: number;
  konsultasiSelesai: number;
  jadwalMendatang: number;
}

const SiswaDashboard = () => {
  const { profile, signOut } = useAuth();
  const [stats, setStats] = useState<SiswaStats>({
    totalPoinPelanggaran: 0,
    konsultasiAktif: 0,
    konsultasiSelesai: 0,
    jadwalMendatang: 0
  });
  const [siswaData, setSiswaData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, [profile]);

  const fetchDashboardStats = async () => {
    if (!profile) return;
    
    try {
      setLoading(true);
      
      // Get student data
      const { data: siswa } = await supabase
        .from('siswa')
        .select('*, kelas:kelas_id(nama_kelas, tingkat)')
        .eq('user_id', profile.id)
        .single();

      setSiswaData(siswa);

      if (siswa) {
        // Fetch active consultations
        const { count: aktifCount } = await supabase
          .from('konsultasi')
          .select('*', { count: 'exact', head: true })
          .eq('siswa_id', siswa.id)
          .in('status', ['pending', 'dijadwalkan']);

        // Fetch completed consultations
        const { count: selesaiCount } = await supabase
          .from('konsultasi')
          .select('*', { count: 'exact', head: true })
          .eq('siswa_id', siswa.id)
          .eq('status', 'selesai');

        // Fetch upcoming scheduled consultations
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const { count: jadwalCount } = await supabase
          .from('konsultasi')
          .select('*', { count: 'exact', head: true })
          .eq('siswa_id', siswa.id)
          .eq('status', 'dijadwalkan')
          .gte('tanggal_jadwal', new Date().toISOString());

        setStats({
          totalPoinPelanggaran: siswa.total_poin_pelanggaran || 0,
          konsultasiAktif: aktifCount || 0,
          konsultasiSelesai: selesaiCount || 0,
          jadwalMendatang: jadwalCount || 0
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

  const getPoinColor = (poin: number) => {
    if (poin < 25) return 'text-green-600';
    if (poin < 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPoinStatus = (poin: number) => {
    if (poin < 25) return 'Aman';
    if (poin < 50) return 'Perhatian';
    return 'Risiko Tinggi';
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
                <h1 className="text-xl font-semibold text-gray-900">Dashboard Siswa</h1>
                <p className="text-sm text-gray-500">BK Connect - SMA Negeri 1 Lumbang</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{profile?.nama_lengkap}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">Siswa</Badge>
                  {siswaData && (
                    <Badge variant="outline" className="text-xs">
                      {siswaData.kelas?.nama_kelas}
                    </Badge>
                  )}
                </div>
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
            Selamat Datang, {siswaData?.nama_lengkap || profile?.nama_lengkap}
          </h2>
          <p className="text-gray-600">
            Kelola konsultasi dan lihat riwayat bimbingan Anda.
          </p>
          {siswaData && (
            <div className="mt-2 text-sm text-gray-500">
              NIS: {siswaData.nis} | NISN: {siswaData.nisn} | Kelas: {siswaData.kelas?.nama_kelas}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Poin Pelanggaran</CardTitle>
              <AlertTriangle className={`h-4 w-4 ${getPoinColor(stats.totalPoinPelanggaran)}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getPoinColor(stats.totalPoinPelanggaran)}`}>
                {loading ? '...' : stats.totalPoinPelanggaran}
              </div>
              <p className="text-xs text-gray-500">
                Status: {getPoinStatus(stats.totalPoinPelanggaran)}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Konsultasi Aktif</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {loading ? '...' : stats.konsultasiAktif}
              </div>
              <p className="text-xs text-gray-500">Sedang berjalan</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Konsultasi Selesai</CardTitle>
              <BookOpen className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {loading ? '...' : stats.konsultasiSelesai}
              </div>
              <p className="text-xs text-gray-500">Total selesai</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jadwal Mendatang</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {loading ? '...' : stats.jadwalMendatang}
              </div>
              <p className="text-xs text-gray-500">Konsultasi terjadwal</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Konsultasi & Bimbingan
              </CardTitle>
              <CardDescription>
                Ajukan konsultasi atau lihat riwayat bimbingan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-primary-gradient hover:bg-primary-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajukan Konsultasi Baru
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Lihat Konsultasi Aktif
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Riwayat Konsultasi
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Riwayat & Informasi
              </CardTitle>
              <CardDescription>
                Lihat riwayat pelanggaran dan informasi BK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Lihat Riwayat Pelanggaran
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Jadwal Konsultasi
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Panduan BK
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SiswaDashboard;
