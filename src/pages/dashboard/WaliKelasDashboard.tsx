
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Users, AlertTriangle, MessageSquare, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const WaliKelasDashboard = () => {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const [students, setStudents] = useState([]);
  const [violations, setViolations] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch students in my class
      const { data: studentsData, error: studentsError } = await supabase
        .from('siswa')
        .select(`
          *,
          kelas (
            nama_kelas,
            wali_kelas_id
          )
        `)
        .eq('kelas.wali_kelas_id', profile?.id);

      if (studentsError) throw studentsError;

      // Fetch violations for my students
      const studentIds = studentsData?.map(s => s.id) || [];
      if (studentIds.length > 0) {
        const { data: violationsData, error: violationsError } = await supabase
          .from('pelanggaran_siswa')
          .select(`
            *,
            siswa (nama_lengkap, nis),
            jenis_pelanggaran_ref (nama_pelanggaran)
          `)
          .in('siswa_id', studentIds)
          .order('created_at', { ascending: false });

        if (violationsError) throw violationsError;

        // Fetch consultations for my students
        const { data: consultationsData, error: consultationsError } = await supabase
          .from('konsultasi')
          .select(`
            *,
            siswa (nama_lengkap, nis)
          `)
          .in('siswa_id', studentIds)
          .order('created_at', { ascending: false });

        if (consultationsError) throw consultationsError;

        setViolations(violationsData || []);
        setConsultations(consultationsData || []);
      }

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

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah logout dari sistem"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">BK</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold">BK</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Wali Kelas</h1>
                <p className="text-sm text-gray-600">Selamat datang, {profile?.nama_lengkap}</p>
              </div>
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Siswa di Kelas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pelanggaran</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{violations.length}</div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Violations */}
          <Card>
            <CardHeader>
              <CardTitle>Pelanggaran Terbaru</CardTitle>
              <CardDescription>
                Pelanggaran siswa di kelas Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              {violations.length === 0 ? (
                <p className="text-center text-gray-500 py-4">Tidak ada pelanggaran</p>
              ) : (
                <div className="space-y-3">
                  {violations.slice(0, 5).map((violation) => (
                    <div key={violation.id} className="border-l-4 border-red-400 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{violation.siswa?.nama_lengkap}</p>
                          <p className="text-sm text-gray-600">{violation.jenis_pelanggaran_ref?.nama_pelanggaran}</p>
                          <p className="text-xs text-gray-500">Poin: {violation.poin}</p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(violation.tanggal_pelanggaran).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Consultations */}
          <Card>
            <CardHeader>
              <CardTitle>Konsultasi Terbaru</CardTitle>
              <CardDescription>
                Konsultasi siswa di kelas Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              {consultations.length === 0 ? (
                <p className="text-center text-gray-500 py-4">Tidak ada konsultasi</p>
              ) : (
                <div className="space-y-3">
                  {consultations.slice(0, 5).map((consultation) => (
                    <div key={consultation.id} className="border-l-4 border-blue-400 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{consultation.siswa?.nama_lengkap}</p>
                          <p className="text-sm text-gray-600">{consultation.judul}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                            consultation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            consultation.status === 'dijadwalkan' ? 'bg-blue-100 text-blue-800' :
                            consultation.status === 'selesai' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {consultation.status}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(consultation.created_at).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WaliKelasDashboard;
