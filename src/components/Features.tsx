
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  FileText, 
  Calendar, 
  BarChart3, 
  Shield, 
  MessageSquare, 
  UserCheck, 
  BookOpen 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Manajemen Siswa",
      description: "Kelola data lengkap siswa, riwayat bimbingan, dan progress akademik dalam satu platform terintegrasi.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: MessageSquare,
      title: "Sistem Konsultasi",
      description: "Platform komunikasi antara siswa dan guru BK untuk konsultasi pribadi, akademik, dan karier.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Shield,
      title: "Manajemen Pelanggaran",
      description: "Sistem point-based untuk mencatat dan mengelola pelanggaran siswa dengan fair dan transparan.",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Calendar,
      title: "Penjadwalan",
      description: "Atur jadwal konseling, pertemuan orang tua, dan kegiatan BK dengan sistem kalender terintegrasi.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: FileText,
      title: "Laporan Otomatis",
      description: "Generate laporan bulanan dan tahunan secara otomatis untuk evaluasi program BK.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: UserCheck,
      title: "Kehadiran Konseling",
      description: "Monitor kehadiran siswa dalam sesi konseling dan follow-up yang diperlukan.",
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: BarChart3,
      title: "Dashboard Analytics",
      description: "Visualisasi data dan statistik untuk membantu pengambilan keputusan yang tepat.",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: BookOpen,
      title: "Bank Kasus",
      description: "Dokumentasi kasus dan solusi untuk referensi penanganan masalah serupa di masa depan.",
      color: "bg-pink-100 text-pink-600"
    }
  ];

  return (
    <section id="layanan" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Fitur <span className="text-primary-600">BK Connect</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Solusi lengkap untuk manajemen bimbingan dan konseling yang memfasilitasi 
            kolaborasi efektif antara semua stakeholder pendidikan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md group hover:scale-105 transform transition-transform"
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-full ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transform transition-transform`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-primary-gradient p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              Siap Meningkatkan Layanan BK Anda?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Bergabunglah dengan SMA NEGERI 1 LUMBANG dalam mengoptimalkan layanan bimbingan dan konseling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Mulai Sekarang
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Konsultasi Gratis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
