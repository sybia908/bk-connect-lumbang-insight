
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, AlertTriangle, LogOut, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const SiswaDashboard = () => {
  const { profile, signOut } = useAuth();
  const { toast } = useToast();
  const [consultations, setConsultations] = useState([]);
  const [violations, setViolations] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmittingConsultation, setIsSubmittingConsultation] = useState(false);
  
  // Form states
  const [consultationTitle, setConsultationTitle] = useState('');
  const [consultationMessage, setConsultationMessage] = useState('');
  const [consultationCategory, setConsultationCategory] = useState('');

  useEffect(() => {
    fetchData();
  }, [profile]);

  const fetchData = async () => {
    if (!profile) return;

    try {
      // Get student data
      const { data: studentInfo, error: studentError } = await supabase
        .from('siswa')
        .select('*')
        .eq('user_id', profile.id)
        .single();

      if (studentError) throw studentError;
      setStudentData(studentInfo);

      // Fetch consultations
      const { data: consultationsData, error: consultationsError } = await supabase
        .from('konsultasi')
        .select('*')
        .eq('siswa_id', studentInfo.id)
        .order('created_at', { ascending: false });

      if (consultationsError) throw consultationsError;

      // Fetch violations
      const { data: violationsData, error: violationsError } = await supabase
        .from('pelanggaran_siswa')
        .select(`
          *,
          jenis_pelanggaran_ref (nama_pelanggaran, kategori)
        `)
        .eq('siswa_id', studentInfo.id)
        .order('created_at', { ascending: false });

      if (violationsError) throw violationsError;

      setConsultations(consultationsData || []);
      setViolations(violationsData || []);
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

  const handleSubmitConsultation = async (e) => {
    e.preventDefault();
    
    if (!consultationTitle.trim() || !consultationMessage.trim()) {
      toast({
        title: "Error",
        description: "Judul dan pesan konsultasi harus diisi",
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingConsultation(true);
    try {
      const { error } = await supabase
        .from('konsultasi')
        .insert({
          siswa_id: studentData?.id,
          judul: consultationTitle,
          deskripsi: consultationMessage,
          kategori: consultationCategory || null,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Konsultasi berhasil dikirim"
      });

      // Reset form
      setConsultationTitle('');
      setConsultationMessage('');
      setConsultationCategory('');
      
      // Refresh data
      fetchData();
    } catch (error) {
      console.error('Error submitting consultation:', error);
      toast({
        title: "Error",
        description: "Gagal mengirim konsultasi",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingConsultation(false);
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
                <h1 className="text-xl font-bold text-gray-900">Dashboard Siswa</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Konsultasi</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consultations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Poin Pelanggaran</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {studentData?.total_poin_pelanggaran || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submit Consultation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Ajukan Konsultasi
              </CardTitle>
              <CardDescription>
                Ajukan konsultasi dengan Guru BK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitConsultation} className="space-y-4">
                <div>
                  <Label htmlFor="consultation-category">Kategori (Opsional)</Label>
                  <Input
                    id="consultation-category"
                    value={consultationCategory}
                    onChange={(e) => setConsultationCategory(e.target.value)}
                    placeholder="Contoh: Pribadi, Sosial, Belajar"
                  />
                </div>
                <div>
                  <Label htmlFor="consultation-title">Judul Konsultasi</Label>
                  <Input
                    id="consultation-title"
                    value={consultationTitle}
                    onChange={(e) => setConsultationTitle(e.target.value)}
                    placeholder="Masukkan judul konsultasi"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="consultation-message">Pesan</Label>
                  <Textarea
                    id="consultation-message"
                    value={consultationMessage}
                    onChange={(e) => setConsultationMessage(e.target.value)}
                    placeholder="Jelaskan masalah atau hal yang ingin dikonsultasikan"
                    rows={4}
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isSubmittingConsultation}
                  className="w-full"
                >
                  {isSubmittingConsultation ? 'Mengirim...' : 'Kirim Konsultasi'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* My Violations */}
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pelanggaran</CardTitle>
              <CardDescription>
                Daftar pelanggaran yang pernah dilakukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {violations.length === 0 ? (
                <p className="text-center text-gray-500 py-4">Tidak ada pelanggaran</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {violations.map((violation) => (
                    <div key={violation.id} className="border-l-4 border-red-400 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{violation.jenis_pelanggaran_ref?.nama_pelanggaran}</p>
                          <p className="text-sm text-gray-600">Kategori: {violation.jenis_pelanggaran_ref?.kategori}</p>
                          <p className="text-sm text-red-600">Poin: {violation.poin}</p>
                          {violation.keterangan && (
                            <p className="text-xs text-gray-500 mt-1">{violation.keterangan}</p>
                          )}
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
        </div>

        {/* My Consultations */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Riwayat Konsultasi</CardTitle>
            <CardDescription>
              Status dan riwayat konsultasi Anda
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
                        {consultation.kategori && (
                          <p className="text-sm text-gray-600">Kategori: {consultation.kategori}</p>
                        )}
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
                    <p className="text-xs text-gray-400">
                      Diajukan: {new Date(consultation.created_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiswaDashboard;
