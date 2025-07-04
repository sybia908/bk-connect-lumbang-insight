
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserCheck, 
  AlertTriangle, 
  MessageSquare, 
  BarChart3,
  Settings,
  LogOut,
  Plus
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalSiswa: number;
  totalGuru: number;
  pelanggaranBulanIni: number;
  konsultasiPending: number;
}

const AdminDashboard = () => {
  const { profile, signOut } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalSiswa: 0,
    totalGuru: 0,
    pelanggaranBulanIni: 0,
    konsultasiPending: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch total students
      const { count: siswaCount } = await supabase
        .from('siswa')
        .select('*', { count: 'exact', head: true });

      // Fetch total teachers
      const { count: guruCount } = await supabase
        .from('guru')
        .select('*', { count: 'exact', head: true });

      // Fetch violations this month
      const currentMonth = new Date().toISOString().slice(0, 7);
      const { count: pelanggaranCount } = await supabase
        .from('pelanggaran_siswa')
        .select('*', { count: 'exact', head: true })
        .gte('tanggal_pelanggaran', `${currentMonth}-01`);

      // Fetch pending consultations
      const { count: konsultasiCount } = await supabase
        .from('konsultasi')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      setStats({
        totalSiswa: siswaCount || 0,
        totalGuru: guruCount || 0,
        pelanggaranBulanIni: pelanggaranCount || 0,
        konsultasiPending: konsultasiCount || 0
      });
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
                <h1 className="text-xl font-semibold text-gray-900">Dashboard Admin</h1>
                <p className="text-sm text-gray-500">BK Connect - SMA Negeri 1 Lumbang</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{profile?.nama_lengkap}</p>
                <Badge variant="default" className="text-xs">Admin BK</Badge>
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
            Kelola sistem BK Connect dari dashboard admin ini.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {loading ? '...' : stats.totalSiswa}
              </div>
              <p className="text-xs text-gray-500">Siswa terdaftar</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {loading ? '...' : stats.totalGuru}
              </div>
              <p className="text-xs text-gray-500">Guru & staff</p>
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
              <CardTitle className="text-sm font-medium">Konsultasi Pending</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {loading ? '...' : stats.konsultasiPending}
              </div>
              <p className="text-xs text-gray-500">Menunggu tindak lanjut</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Manajemen Data
              </CardTitle>
              <CardDescription>
                Kelola data siswa, guru, dan kelas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Siswa Baru
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Guru Baru
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Kelola Kelas
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Laporan & Analisis
              </CardTitle>
              <CardDescription>
                Lihat laporan dan statistik BK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Laporan Pelanggaran
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Laporan Konsultasi
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Statistik Kehadiran
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
