
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Target, Award, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="https://sman1lumbang.sch.id/wp-content/uploads/2022/12/logo-smanilum-cut.png" 
                alt="Logo" 
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Tentang BK Connect</h1>
                <p className="text-sm text-gray-500">SMA NEGERI 1 LUMBANG</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <img 
                src="https://sman1lumbang.sch.id/wp-content/uploads/2022/12/logo-smanilum-cut.png" 
                alt="BK Connect Logo" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              BK Connect
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sistem Bimbingan dan Konseling digital yang menghubungkan siswa, guru, dan orang tua 
              dalam mendukung perkembangan optimal siswa SMA Negeri 1 Lumbang.
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary-700">
                <Target className="w-6 h-6" />
                <span>Visi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Menjadi sistem bimbingan dan konseling digital terdepan yang mampu memfasilitasi 
                perkembangan optimal siswa melalui layanan yang komprehensif, mudah diakses, dan 
                berorientasi pada kebutuhan individu.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary-700">
                <Award className="w-6 h-6" />
                <span>Misi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-700 space-y-2">
                <li>• Memberikan layanan konseling yang mudah diakses dan berkualitas</li>
                <li>• Memfasilitasi komunikasi efektif antara siswa, guru BK, dan orang tua</li>
                <li>• Mengembangkan sistem monitoring perkembangan siswa yang komprehensif</li>
                <li>• Mendukung pembentukan karakter dan pengembangan potensi siswa</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Fitur Unggulan BK Connect
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary-700">
                  <Users className="w-6 h-6" />
                  <span>Konsultasi Online</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Layanan konsultasi online yang memudahkan siswa untuk berkonsultasi 
                  dengan guru BK kapan saja dan dimana saja.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary-700">
                  <Heart className="w-6 h-6" />
                  <span>Monitoring Perkembangan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sistem monitoring yang membantu melacak perkembangan akademik, 
                  sosial, dan emosional siswa secara berkelanjutan.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary-700">
                  <Award className="w-6 h-6" />
                  <span>Manajemen Data</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Platform terintegrasi untuk mengelola data siswa, riwayat konseling, 
                  dan laporan perkembangan dengan efisien.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Info */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Tim Bimbingan dan Konseling
          </h3>
          
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6">
              Tim BK SMA Negeri 1 Lumbang terdiri dari guru-guru bimbingan dan konseling 
              yang berpengalaman dan berkomitmen dalam membantu perkembangan siswa. 
              Kami siap mendampingi perjalanan pendidikan siswa dengan pendekatan yang 
              profesional dan penuh perhatian.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary-700 mb-2">Layanan Pribadi</h4>
                <p className="text-gray-600">Konseling individual untuk masalah pribadi dan emosional</p>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary-700 mb-2">Layanan Sosial</h4>
                <p className="text-gray-600">Bimbingan untuk pengembangan keterampilan sosial</p>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary-700 mb-2">Layanan Karir</h4>
                <p className="text-gray-600">Orientasi dan perencanaan karir masa depan</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="text-center">
          <Card className="shadow-sm max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-primary-700">Hubungi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Untuk informasi lebih lanjut atau bantuan, jangan ragu untuk menghubungi 
                tim BK SMA Negeri 1 Lumbang.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Alamat:</strong> SMA Negeri 1 Lumbang, Pasuruan, Jawa Timur</p>
                <p><strong>Jam Operasional:</strong> Senin - Jumat, 07:00 - 15:00 WIB</p>
              </div>
              <div className="mt-6">
                <Button 
                  onClick={() => navigate('/login')}
                  className="bg-primary-gradient hover:bg-primary-700"
                >
                  Mulai Menggunakan BK Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
