
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ContactInfo {
  alamat: string;
  telepon: string;
  email: string;
  jam_layanan: string;
  whatsapp: string;
}

const ContactPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    alamat: 'SMA Negeri 1 Lumbang\nJl. Raya Lumbang No. 123\nLumbang, Pasuruan, Jawa Timur 67183',
    telepon: '(0343) 123-4567',
    email: 'bk@sman1lumbang.sch.id',
    jam_layanan: 'Senin - Jumat: 07:00 - 15:00 WIB\nSabtu: 07:00 - 12:00 WIB\nMinggu: Tutup',
    whatsapp: '6281234567890'
  });

  useEffect(() => {
    // Load contact info from localStorage if available
    const saved = localStorage.getItem('contact_info');
    if (saved) {
      setContactInfo(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Semua field harus diisi",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Pesan Terkirim",
      description: "Terima kasih! Pesan Anda telah terkirim. Tim BK akan menghubungi Anda segera.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center h-auto sm:h-16 py-4 sm:py-0 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <img 
                src="https://sman1lumbang.sch.id/wp-content/uploads/2022/12/logo-smanilum-cut.png" 
                alt="Logo" 
                className="w-10 h-10 flex-shrink-0"
              />
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Hubungi Kami</h1>
                <p className="text-xs sm:text-sm text-gray-500">SMA NEGERI 1 LUMBANG</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 w-full sm:w-auto justify-center"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-primary-700">Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900">Alamat</h4>
                    <div className="text-gray-600 text-sm whitespace-pre-line">
                      {contactInfo.alamat}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900">Telepon</h4>
                    <p className="text-gray-600 text-sm">
                      {contactInfo.telepon}<br />
                      {contactInfo.whatsapp && `+${contactInfo.whatsapp} (WhatsApp)`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600 text-sm">
                      {contactInfo.email}<br />
                      info@sman1lumbang.sch.id
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900">Jam Layanan</h4>
                    <div className="text-gray-600 text-sm whitespace-pre-line">
                      {contactInfo.jam_layanan}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-primary-700">Tim Bimbingan dan Konseling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-200 pl-4">
                    <h4 className="font-semibold text-gray-900">Koordinator BK</h4>
                    <p className="text-gray-600 text-sm">Dra. Siti Nurhasanah, M.Pd</p>
                    <p className="text-gray-500 text-xs">Konseling Pribadi & Sosial</p>
                  </div>
                  
                  <div className="border-l-4 border-primary-200 pl-4">
                    <h4 className="font-semibold text-gray-900">Guru BK Kelas X</h4>
                    <p className="text-gray-600 text-sm">Ahmad Hidayat, S.Pd</p>
                    <p className="text-gray-500 text-xs">Bimbingan Belajar & Adaptasi</p>
                  </div>
                  
                  <div className="border-l-4 border-primary-200 pl-4">
                    <h4 className="font-semibold text-gray-900">Guru BK Kelas XI & XII</h4>
                    <p className="text-gray-600 text-sm">Dr. Fatimah Azzahra, M.Psi</p>
                    <p className="text-gray-500 text-xs">Konseling Karir & Akademik</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Quick Actions */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-primary-700">Kirim Pesan</CardTitle>
                <p className="text-gray-600 text-sm">
                  Silakan isi form di bawah ini untuk menghubungi tim BK. Kami akan merespon pesan Anda dalam 1x24 jam.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Masukkan alamat email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Masukkan subjek pesan"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan pesan Anda..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary-gradient hover:bg-primary-700"
                  >
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-primary-700">Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/login')}
                >
                  Login ke BK Connect
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/news')}
                >
                  Lihat Berita & Pengumuman
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank')}
                >
                  WhatsApp BK Connect
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
