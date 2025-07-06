
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Edit2, Trash2, Eye, Calendar, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NewsItem {
  id: string;
  judul: string;
  konten: string;
  gambar_url?: string;
  is_published: boolean;
  tanggal_publikasi?: string;
  created_at: string;
  penulis_id: string;
}

const NewsManager = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    gambar_url: '',
    is_published: false
  });
  const { profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching news:', error);
        toast({
          title: "Error",
          description: "Gagal memuat berita",
          variant: "destructive"
        });
      } else {
        setNews(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memuat berita",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.judul.trim() || !formData.konten.trim()) {
      toast({
        title: "Error",
        description: "Judul dan konten harus diisi",
        variant: "destructive"
      });
      return;
    }

    if (!profile?.id) {
      toast({
        title: "Error",
        description: "Profile tidak ditemukan",
        variant: "destructive"
      });
      return;
    }

    try {
      const newsData = {
        judul: formData.judul.trim(),
        konten: formData.konten.trim(),
        gambar_url: formData.gambar_url.trim() || null,
        is_published: formData.is_published,
        penulis_id: profile.id,
        tanggal_publikasi: formData.is_published ? new Date().toISOString() : null
      };

      let result;
      if (editingNews) {
        result = await supabase
          .from('berita')
          .update(newsData)
          .eq('id', editingNews.id);
      } else {
        result = await supabase
          .from('berita')
          .insert([newsData]);
      }

      if (result.error) {
        console.error('Error saving news:', result.error);
        toast({
          title: "Error",
          description: `Gagal ${editingNews ? 'mengupdate' : 'menyimpan'} berita`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Berhasil",
          description: `Berita berhasil ${editingNews ? 'diupdate' : 'disimpan'}`,
        });
        
        setFormData({ judul: '', konten: '', gambar_url: '', is_published: false });
        setEditingNews(null);
        setShowDialog(false);
        fetchNews();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan sistem",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setFormData({
      judul: newsItem.judul,
      konten: newsItem.konten,
      gambar_url: newsItem.gambar_url || '',
      is_published: newsItem.is_published
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('berita')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting news:', error);
        toast({
          title: "Error",
          description: "Gagal menghapus berita",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Berhasil",
          description: "Berita berhasil dihapus",
        });
        fetchNews();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menghapus berita",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({ judul: '', konten: '', gambar_url: '', is_published: false });
    setEditingNews(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading berita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manajemen Berita</h2>
          <p className="text-gray-600">Kelola berita dan pengumuman sekolah</p>
        </div>
        
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                resetForm();
                setShowDialog(true);
              }}
              className="bg-primary-600 hover:bg-primary-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Berita
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? 'Edit Berita' : 'Tambah Berita Baru'}
              </DialogTitle>
              <DialogDescription>
                {editingNews ? 'Edit informasi berita' : 'Buat berita atau pengumuman baru'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="judul">Judul Berita</Label>
                <Input
                  id="judul"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Masukkan judul berita"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="konten">Konten</Label>
                <Textarea
                  id="konten"
                  value={formData.konten}
                  onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                  placeholder="Masukkan konten berita"
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gambar_url">URL Gambar (opsional)</Label>
                <Input
                  id="gambar_url"
                  type="url"
                  value={formData.gambar_url}
                  onChange={(e) => setFormData({ ...formData, gambar_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="is_published">Publikasikan berita</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingNews ? 'Update Berita' : 'Simpan Berita'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowDialog(false)}
                >
                  Batal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {news.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <Eye className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-center">
                Belum ada berita. Klik "Tambah Berita" untuk membuat berita pertama.
              </p>
            </CardContent>
          </Card>
        ) : (
          news.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{item.judul}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(item.created_at).toLocaleDateString('id-ID')}
                      </div>
                      <Badge variant={item.is_published ? "default" : "secondary"}>
                        {item.is_published ? "Dipublikasikan" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 line-clamp-3">
                  {item.konten}
                </p>
                {item.gambar_url && (
                  <div className="mt-4">
                    <img 
                      src={item.gambar_url} 
                      alt={item.judul}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsManager;
