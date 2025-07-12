
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, FileText, MessageSquare, Calendar, ClipboardList } from 'lucide-react';
import NewsManager from '@/components/NewsManager';
import AIChat from '@/components/AIChat';

const GuruBKDashboard = () => {
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
                <h1 className="text-xl font-semibold text-gray-900">Dashboard Guru BK</h1>
                <p className="text-sm text-gray-500">SMA NEGERI 1 LUMBANG</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{profile?.nama_lengkap}</p>
                <p className="text-xs text-gray-500">Guru BK</p>
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
              <ClipboardList className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="konsultasi" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Konsultasi</span>
            </TabsTrigger>
            <TabsTrigger value="siswa" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Data Siswa</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Berita</span>
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="jadwal" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Jadwal</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Konsultasi Pending</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Menunggu respons</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Konsultasi Hari Ini</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Jadwal konsultasi</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Siswa Bimbingan</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">Total siswa</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Kasus Selesai</CardTitle>
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">Bulan ini</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Konsultasi Terbaru</CardTitle>
                  <CardDescription>Permintaan konsultasi yang memerlukan perhatian</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Ahmad Rizki - Masalah Akademik</p>
                        <p className="text-xs text-gray-500">Urgent - 5 menit yang lalu</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Siti Fatimah - Konseling Pribadi</p>
                        <p className="text-xs text-gray-500">Normal - 1 jam yang lalu</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Budi Santoso - Orientasi Karir</p>
                        <p className="text-xs text-gray-500">Terjadwal - 2 jam yang lalu</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Jadwal Hari Ini</CardTitle>
                  <CardDescription>Agenda konsultasi dan kegiatan BK</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Konsultasi Individual</p>
                        <p className="text-xs text-gray-500">dengan Ahmad Rizki</p>
                      </div>
                      <span className="text-xs font-semibold text-blue-600">09:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Konsultasi Kelompok</p>
                        <p className="text-xs text-gray-500">Kelas XII IPA 1</p>
                      </div>
                      <span className="text-xs font-semibold text-green-600">11:00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Rapat Tim BK</p>
                        <p className="text-xs text-gray-500">Evaluasi bulanan</p>
                      </div>
                      <span className="text-xs font-semibold text-orange-600">14:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="konsultasi">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Konsultasi</CardTitle>
                <CardDescription>Kelola permintaan dan jadwal konsultasi siswa</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Fitur manajemen konsultasi sedang dalam pengembangan.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="siswa">
            <Card>
              <CardHeader>
                <CardTitle>Data Siswa</CardTitle>
                <CardDescription>Informasi dan riwayat bimbingan siswa</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Fitur data siswa sedang dalam pengembangan.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <NewsManager />
          </TabsContent>

          <TabsContent value="ai-chat">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant BK</CardTitle>
                <CardDescription>Asisten AI untuk membantu tugas bimbingan konseling</CardDescription>
              </CardHeader>
              <CardContent>
                <AIChat />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jadwal">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Jadwal</CardTitle>
                <CardDescription>Kelola jadwal konsultasi dan kegiatan BK</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Fitur manajemen jadwal sedang dalam pengembangan.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default GuruBKDashboard;
