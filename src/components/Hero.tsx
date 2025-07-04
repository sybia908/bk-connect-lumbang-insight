
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, MessageCircle, Award } from "lucide-react";

const Hero = () => {
  return (
    <section id="beranda" className="bg-gradient-to-br from-primary-50 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Selamat Datang di{' '}
                <span className="text-primary-600">BK Connect</span>
              </h1>
              <p className="text-xl text-gray-600">
                SMA NEGERI 1 LUMBANG
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Sistem informasi bimbingan dan konseling terintegrasi yang memfasilitasi komunikasi 
                antara siswa, guru BK, wali kelas, dan admin untuk menciptakan lingkungan belajar yang 
                supportif dan produktif.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary-gradient hover:bg-primary-700 text-white px-8">
                Pelajari Lebih Lanjut
              </Button>
              <Button size="lg" variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                Hubungi Kami
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-gray-600">Siswa Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">15+</div>
                <div className="text-sm text-gray-600">Guru BK</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">30+</div>
                <div className="text-sm text-gray-600">Wali Kelas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">1000+</div>
                <div className="text-sm text-gray-600">Konsultasi</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6 animate-slide-in-right">
            <Card className="border-l-4 border-l-primary-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Multi-Role System</h3>
                    <p className="text-gray-600">
                      Akses sesuai peran untuk Admin BK, Guru BK, Wali Kelas, dan Siswa dengan fitur yang disesuaikan.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Sistem Konsultasi</h3>
                    <p className="text-gray-600">
                      Platform terintegrasi untuk pengajuan konsultasi, penjadwalan, dan follow-up bimbingan.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Manajemen Data</h3>
                    <p className="text-gray-600">
                      Kelola data siswa, pelanggaran, kehadiran, dan laporan dengan sistem yang efisien.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Award className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Sistem Point</h3>
                    <p className="text-gray-600">
                      Monitoring pelanggaran dengan sistem point-based yang fair dan transparan.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
