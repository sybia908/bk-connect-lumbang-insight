import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Users, FileText, AlertTriangle, MessageSquare, LogOut, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AIChat from '@/components/AIChat';
import ThemeToggle from '@/components/ThemeToggle';

const AdminDashboard = () => {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSiswa: 0,
    totalViolations: 0,
    totalConsultations: 0
  });
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [usersRes, siswaRes, violationsRes, consultationsRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('siswa').select('id', { count: 'exact' }),
        supabase.from('pelanggaran_siswa').select('id', { count: 'exact' }),
        supabase.from('konsultasi').select('id', { count: 'exact' })
      ]);

      setStats({
        totalUsers: usersRes.count || 0,
        totalSiswa: siswaRes.count || 0,
        totalViolations: violationsRes.count || 0,
        totalConsultations: consultationsRes.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddAnnouncement = async () => {
    if (!newAnnouncementTitle.trim() || !newAnnouncementContent.trim()) {
      toast({
        title: "Error",
        description: "Judul dan konten pengumuman harus diisi",
        variant: "destructive"
      });
      return;
    }

    setIsAddingAnnouncement(true);
    try {
      const { error } = await supabase
        .from('berita')
        .insert({
          judul: newAnnouncementTitle,
          konten: newAnnouncementContent,
          penulis_id: profile?.id
        });

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Pengumuman berhasil ditambahkan"
      });

      setNewAnnouncementTitle('');
      setNewAnnouncementContent('');
    } catch (error) {
      console.error('Error adding announcement:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan pengumuman",
        variant: "destructive"
      });
    } finally {
      setIsAddingAnnouncement(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah logout dari sistem"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white">
                <img 
                  src="https://drive.google.com/uc?export=view&id=1DhBycV4hx0FYtOEGM7IwwV5xbOSbSSw8" 
                  alt="BK Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Dashboard Admin</h1>
                <p className="text-sm text-muted-foreground">Selamat datang, {profile?.nama_lengkap}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Semua pengguna sistem</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSiswa}</div>
              <p className="text-xs text-muted-foreground">Siswa aktif</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pelanggaran</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViolations}</div>
              <p className="text-xs text-muted-foreground">Semua pelanggaran</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Konsultasi</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalConsultations}</div>
              <p className="text-xs text-muted-foreground">Semua konsultasi</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Tambah Pengumuman
              </CardTitle>
              <CardDescription>
                Buat pengumuman baru untuk semua pengguna
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="announcement-title">Judul Pengumuman</Label>
                <Input
                  id="announcement-title"
                  value={newAnnouncementTitle}
                  onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                  placeholder="Masukkan judul pengumuman"
                />
              </div>
              <div>
                <Label htmlFor="announcement-content">Isi Pengumuman</Label>
                <Textarea
                  id="announcement-content"
                  value={newAnnouncementContent}
                  onChange={(e) => setNewAnnouncementContent(e.target.value)}
                  placeholder="Masukkan isi pengumuman"
                  rows={4}
                />
              </div>
              <Button 
                onClick={handleAddAnnouncement}
                disabled={isAddingAnnouncement}
                className="w-full"
              >
                {isAddingAnnouncement ? 'Menambahkan...' : 'Tambah Pengumuman'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Menu Cepat</CardTitle>
              <CardDescription>
                Akses fitur utama dengan cepat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Kelola Pengguna
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Lihat Laporan
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Kelola Pelanggaran
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Kelola Konsultasi
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Chat Section */}
        <div className="mb-8">
          <AIChat />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
