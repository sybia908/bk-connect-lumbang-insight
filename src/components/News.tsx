
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Workshop Penguatan Karakter Siswa SMA NEGERI 1 LUMBANG",
      excerpt: "Kegiatan workshop untuk meningkatkan karakter positif siswa melalui pendekatan konseling modern dan metode interaktif.",
      date: "15 Desember 2024",
      author: "Tim BK",
      category: "Workshop",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      featured: true
    },
    {
      id: 2,
      title: "Sosialisasi Program BK Connect kepada Wali Murid",
      excerpt: "Pengenalan sistem BK Connect kepada orang tua siswa untuk meningkatkan kolaborasi dalam pembimbingan anak.",
      date: "10 Desember 2024",
      author: "Koordinator BK",
      category: "Sosialisasi",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846"
    },
    {
      id: 3,
      title: "Pelatihan Guru BK: Konseling Digital Era Modern",
      excerpt: "Program peningkatan kompetensi guru BK dalam menggunakan teknologi untuk layanan konseling yang lebih efektif.",
      date: "5 Desember 2024",
      author: "Kepala BK",
      category: "Pelatihan",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    },
    {
      id: 4,
      title: "Implementasi Sistem Point Pelanggaran Berbasis Digital",
      excerpt: "Launching sistem baru untuk pencatatan dan monitoring pelanggaran siswa secara real-time dan transparan.",
      date: "1 Desember 2024",
      author: "Admin BK",
      category: "Sistem",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    {
      id: 5,
      title: "Seminar Kesehatan Mental Remaja",
      excerpt: "Kegiatan edukasi tentang pentingnya menjaga kesehatan mental remaja di era digital bersama psikolog ahli.",
      date: "28 November 2024",
      author: "Tim BK",
      category: "Seminar",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56"
    },
    {
      id: 6,
      title: "Program Konseling Karier untuk Kelas XII",
      excerpt: "Bimbingan khusus untuk siswa kelas XII dalam mempersiapkan masa depan dan pilihan studi lanjutan.",
      date: "25 November 2024",
      author: "Guru BK Kelas XII",
      category: "Konseling",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Workshop: "bg-blue-100 text-blue-700",
      Sosialisasi: "bg-green-100 text-green-700",
      Pelatihan: "bg-purple-100 text-purple-700",
      Sistem: "bg-orange-100 text-orange-700",
      Seminar: "bg-red-100 text-red-700",
      Konseling: "bg-teal-100 text-teal-700"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const featuredNews = newsItems.find(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <section id="berita" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Berita & <span className="text-primary-600">Kegiatan BK</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ikuti perkembangan terbaru kegiatan bimbingan dan konseling di SMA NEGERI 1 LUMBANG.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured News */}
          {featuredNews && (
            <div className="lg:col-span-2">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <img 
                    src={featuredNews.image} 
                    alt={featuredNews.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoryColor(featuredNews.category)}>
                      {featuredNews.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {featuredNews.title}
                  </CardTitle>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {featuredNews.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {featuredNews.date}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {featuredNews.author}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="group/btn">
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* News List */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Berita Lainnya</h3>
            {regularNews.slice(0, 5).map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow group cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="mb-2">
                        <Badge className={`${getCategoryColor(item.category)} text-xs`}>
                          {item.category}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-tight group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 space-x-3">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.date}
                        </div>
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {item.author}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button variant="outline" className="w-full">
              Lihat Semua Berita
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
