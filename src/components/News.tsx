
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  judul: string;
  konten: string;
  gambar_url?: string;
  tanggal_publikasi: string;
  created_at: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .eq('is_published', true)
        .order('tanggal_publikasi', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching news:', error);
      } else {
        setNews(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
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
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading berita...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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

        {news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-6">Belum ada berita yang dipublikasikan.</p>
            <Button 
              onClick={() => navigate('/news')}
              variant="outline"
            >
              Kunjungi Halaman Berita
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <div onClick={() => navigate('/news')}>
                    {item.gambar_url && (
                      <div className="w-full h-48 overflow-hidden rounded-t-lg">
                        <img 
                          src={item.gambar_url} 
                          alt={item.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Berita BK</Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(item.tanggal_publikasi || item.created_at).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary-600 transition-colors">
                        {item.judul}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {item.konten}
                      </p>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary-600 hover:text-primary-700 p-0 h-auto font-medium"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                onClick={() => navigate('/news')}
                variant="outline" 
                className="px-8"
              >
                Lihat Semua Berita
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default News;
