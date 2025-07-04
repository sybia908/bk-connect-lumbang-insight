
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Users, Award } from "lucide-react";

const About = () => {
  return (
    <section id="tentang" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Tentang <span className="text-primary-600">Bimbingan Konseling</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Bimbingan dan Konseling SMA NEGERI 1 LUMBANG berkomitmen untuk memberikan 
                layanan terbaik dalam pengembangan potensi siswa secara holistik. Melalui 
                pendekatan yang personal dan profesional, kami membantu siswa dalam menghadapi 
                berbagai tantangan akademik, sosial, dan personal.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dengan dukungan teknologi BK Connect, kami menghadirkan layanan konseling yang 
                lebih mudah diakses, terintegrasi, dan efektif untuk seluruh warga sekolah.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-3xl font-bold text-primary-600 mb-2">8+</div>
                <div className="text-sm font-medium text-gray-700">Tahun Pengalaman</div>
              </div>
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
                <div className="text-sm font-medium text-gray-700">Tingkat Kepuasan</div>
              </div>
            </div>
          </div>

          {/* Right Content - Vision Mission */}
          <div className="space-y-6">
            <Card className="border-l-4 border-l-primary-500 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Eye className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Visi</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Menjadi pusat layanan bimbingan dan konseling yang unggul, inovatif, 
                      dan terdepan dalam mengembangkan potensi siswa SMA NEGERI 1 LUMBANG 
                      menuju generasi yang berkarakter, mandiri, dan berprestasi.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary-500 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Target className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Misi</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Memberikan layanan konseling yang profesional dan berkualitas</li>
                      <li>• Mengembangkan sistem bimbingan terintegrasi berbasis teknologi</li>
                      <li>• Memfasilitasi pengembangan potensi akademik dan non-akademik siswa</li>
                      <li>• Menciptakan lingkungan sekolah yang kondusif dan supportif</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary-500 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Award className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Nilai-Nilai</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-semibold text-primary-600">Profesional</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-semibold text-primary-600">Empati</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-semibold text-primary-600">Integritas</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-semibold text-primary-600">Inovatif</div>
                      </div>
                    </div>
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

export default About;
