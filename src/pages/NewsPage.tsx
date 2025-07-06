
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, ArrowRight, Search, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

interface NewsItem {
  id: string;
  judul: string;
  konten: string;
  gambar_url?: string;
  tanggal_publikasi: string;
  created_at: string;
}

const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
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
        .order('tanggal_publikasi', { ascending: false });

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

  const filteredNews = news.filter(item =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.konten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedNews) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://sman1lumbang.sch.id/wp-content/uploads/2022/12/logo-smanilum-cut.png" 
                  alt="Logo" 
                  className="w-10 h-10"
                />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Berita BK</h1>
                  <p className="text-sm text-gray-500">SMA NEGERI 1 LUMBANG</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedNews(null)}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex items-center space-x-2"
                >
                  <span>Beranda</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <article className="bg-white rounded-lg shadow-sm">
            {selectedNews.gambar_url && (
              <div className="w-full h-64 md:h-96 overflow-hidden rounded-t-lg">
                <img 
                  src={selectedNews.gambar_url} 
                  alt={selectedNews.judul}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {selectedNews.judul}
                </h1>
                
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(selectedNews.tanggal_publikasi || selectedNews.created_at).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <Badge variant="outline">Berita BK</Badge>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                {selectedNews.konten.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  }

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
                <h1 className="text-xl font-semibold text-gray-900">Berita & Pengumuman BK</h1>
                <p className="text-sm text-gray-500">SMA NEGERI 1 LUMBANG</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <span>Kembali ke Beranda</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading berita...</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">
                  {searchTerm ? 'Tidak ada berita yang cocok dengan pencarian.' : 'Belum ada berita yang dipublikasikan.'}
                </p>
              </div>
            ) : (
              filteredNews.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <div onClick={() => setSelectedNews(item)}>
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
                      
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-primary-600 hover:text-primary-700 p-0 h-auto font-medium"
                        >
                          Baca Selengkapnya
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default NewsPage;
