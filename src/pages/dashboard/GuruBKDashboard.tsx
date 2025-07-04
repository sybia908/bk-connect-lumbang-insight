import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Users, MessageSquare, AlertTriangle, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import AIChat from '@/components/AIChat';
import ThemeToggle from '@/components/ThemeToggle';

type ConsultationStatus = Database['public']['Enums']['status_konsultasi'];

const GuruBKDashboard = () => {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const [consultations, setConsultations] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch consultations
      const { data: consultationsData, error: consultationsError } = await supabase
        .from('konsultasi')
        .select(`
          *,
          siswa (
            nama_lengkap,
            nis
          )
        `)
        .order('created_at', { ascending: false });

      if (consultationsError) throw consultationsError;

      // Fetch students
      const { data: studentsData, error: studentsError } = await supabase
        .from('siswa')
        .select('*')
        .order('nama_lengkap');

      if (studentsError) throw studentsError;

      setConsultations(consultationsData || []);
      setStudents(studentsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateConsultationStatus = async (consultationId: string, newStatus: ConsultationStatus) => {
    try {
      const { error } = await supabase
        .from('konsultasi')
        .update({ status: newStatus })
        .eq('id', consultationId);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: `Status konsultasi berhasil diubah menjadi ${newStatus}`
      });

      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating consultation:', error);
      toast({
        title: "Error",
        description: "Gagal mengubah status konsultasi",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah logout dari sistem"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse overflow-hidden bg-white">
            <img 
              src="https://drive.google.com/uc?export=view&id=1DhBycV4hx0FYtOEGM7IwwV5xbOSbSSw8" 
              alt="BK Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

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
                <h1 className="text-xl font-bold text-foreground">Dashboard Guru BK</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Siswa Bimbingan</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Konsultasi Pending</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {consultations.filter(c => c.status === 'pending').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Konsultasi</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consultations.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Consultations List */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Konsultasi</CardTitle>
              <CardDescription>
                Kelola konsultasi dari siswa
              </CardDescription>
            </CardHeader>
            <CardContent>
              {consultations.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Belum ada konsultasi</p>
              ) : (
                <div className="space-y-4">
                  {consultations.map((consultation) => (
                    <div key={consultation.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{consultation.judul}</h3>
                          <p className="text-sm text-gray-600">
                            Siswa: {consultation.siswa?.nama_lengkap} ({consultation.siswa?.nis})
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{consultation.deskripsi}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          consultation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          consultation.status === 'dijadwalkan' ? 'bg-blue-100 text-blue-800' :
                          consultation.status === 'selesai' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {consultation.status}
                        </span>
                      </div>
                      
                      {consultation.status === 'pending' && (
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            onClick={() => updateConsultationStatus(consultation.id, 'dijadwalkan')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Terima
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateConsultationStatus(consultation.id, 'dibatalkan')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Tolak
                          </Button>
                        </div>
                      )}
                      
                      {consultation.status === 'dijadwalkan' && (
                        <Button
                          size="sm"
                          onClick={() => updateConsultationStatus(consultation.id, 'selesai')}
                          className="mt-3"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Tandai Selesai
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Chat Section */}
          <div>
            <AIChat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuruBKDashboard;
