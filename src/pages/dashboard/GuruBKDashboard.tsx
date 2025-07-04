
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  AlertTriangle, 
  Calendar, 
  Users,
  LogOut,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface GuruBKStats {
  konsultasiPending: number;
  konsultasiHariIni: number;
  totalSiswa: number;
  pelanggaranBulanIni: number;
}

const GuruBKDashboard = () => {
  const { profile, signOut } = useAuth();
  const [stats, setStats] = useState<GuruBKStats>({
    konsultasiPending: 0,
    konsultasiHariIni: 0,
    totalSiswa: 0,
    pelanggaranBulanIni: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch pending consultations
      const { count: pendingCount } = await supabase
        .from('konsultasi')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Fetch today's consultations
      const today = new Date().toISOString().split('T')[0];
      const { count: todayCount } = await supabase
        .from('konsultasi')
        .select('*', { count: 'exact', head: true })
        .gte('tanggal_jadwal', `${today}T00:00:00`)
        .lt('tanggal_jadwal', `${today}T23:59:59`);

      // Fetch total students
      const { count: siswaCount } = await supabase
        .from('siswa')
        .select('*', { count: 'exact', head: true });

      // Fetch violations this month
      const currentMonth = new Date().toISOString().slice(0, 7);
      const { count: pelanggaranCount } = await supabase
        .from('pelanggaran_siswa')
        .select('*', { count: 'exact', head: true })
        .gte('tanggal_pelanggaran', `${currentMonth}-01`);

      setStats({
        konsultasiPending: pendingCount || 0,
        konsultasiHariIni: todayCount || 0,
        totalSiswa: siswaCount || 0,
        pelanggaranBulanIni: pelanggaranCount || 0
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
                <h1 className="text-xl font-semibold text-gray-900">Dashboard Guru BK</h1>
                <p className="text-sm text-gray-500">BK Connect - SMA Negeri 1 Lumbang</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{profile?.nama_lengkap}</p>
                <Badge variant="secondary" className="text-xs">Guru BK</Badge>
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
            Kelola konsultasi dan bimbingan siswa dari dashboard ini.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Konsultasi Pending</CardTitle>
              <MessageSquare className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {loading ? '...' : stats.konsultasiPending}
              </div>
              <p className="text-xs text-gray-500">Menunggu tindak lanjut</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jadwal Hari Ini</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {loading ? '...' : stats.konsultasiHariIni}
              </div>
              <p className="text-xs text-gray-500">Konsultasi terjadwal</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {loading ? '...' : stats.totalSiswa}
              </div>
              <p className="text-xs text-gray-500">Siswa bimbingan</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pelanggaran Bulan Ini</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {loading ? '...' : stats.pelanggaranBulanIni}
              </div>
              <p className="text-xs text-gray-500">Kasus tercatat</p>
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
                Kelola konsultasi dan jadwal bimbingan siswa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Lihat Konsultasi Pending
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Jadwal Konsultasi
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Riwayat Konsultasi
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Pelanggaran & Kasus
              </CardTitle>
              <CardDescription>
                Kelola pelanggaran dan kasus siswa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Input Pelanggaran
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Data Siswa Bermasalah
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Tindak Lanjut Kasus
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GuruBKDashboard;
