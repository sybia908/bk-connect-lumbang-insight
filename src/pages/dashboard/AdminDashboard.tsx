
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, FileText, MessageSquare, BarChart3, Settings } from 'lucide-react';
import NewsManager from '@/components/NewsManager';
import AIChat from '@/components/AIChat';

const AdminDashboard = () => {
  const { signOut, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="https://sman1lumbang.sch.id/wp-content/uploads/2022/12/logo-smanilum-cut.png" 
                alt="Logo" 
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Dashboard Admin BK</h1>
                <p className="text-sm text-gray-500">SMA NEGERI 1 LUMBANG</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{profile?.nama_lengkap}</p>
                <p className="text-xs text-gray-500">Administrator BK</p>
              </div>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Berita</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Pengguna</span>
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Laporan</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Pengaturan</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+20 dari bulan lalu</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Konsultasi Aktif</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">+2 hari ini</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Berita Terpublikasi</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 minggu ini</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pelanggaran Bulan Ini</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">-12% dari bulan lalu</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                  <CardDescription>Ringkasan aktivitas sistem BK Connect</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Konsultasi baru dari Ahmad Rizki</p>
                        <p className="text-xs text-gray-500">2 menit yang lalu</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Berita "Workshop Karakter" dipublikasikan</p>
                        <p className="text-xs text-gray-500">1 jam yang lalu</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Pelanggaran ringan dicatat untuk Siti Aminah</p>
                        <p className="text-xs text-gray-500">3 jam yang lalu</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistik Minggu Ini</CardTitle>
                  <CardDescription>Performa sistem dalam 7 hari terakhir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Konsultasi Selesai</span>
                      <span className="text-sm font-semibold">18</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Siswa Aktif</span>
                      <span className="text-sm font-semibold">234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Berita Dilihat</span>
                      <span className="text-sm font-semibold">1,456</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rating Kepuasan</span>
                      <span className="text-sm font-semibold">4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="news">
            <NewsManager />
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Pengguna</CardTitle>
                <CardDescription>Kelola pengguna sistem BK Connect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Fitur manajemen pengguna sedang dalam pengembangan.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-chat">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant BK</CardTitle>
                <CardDescription>Asisten AI untuk membantu tugas administrasi BK</CardDescription>
              </CardHeader>
              <CardContent>
                <AIChat />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Laporan dan Analitik</CardTitle>
                <CardDescription>Laporan komprehensif aktivitas BK</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Fitur laporan sedang dalam pengembangan.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Sistem</CardTitle>
                <CardDescription>Konfigurasi sistem BK Connect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Fitur pengaturan sedang dalam pengembangan.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
