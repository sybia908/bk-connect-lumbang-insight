
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Phone, Mail, Clock, Save } from 'lucide-react';

interface ContactInfo {
  id?: string;
  alamat: string;
  telepon: string;
  email: string;
  jam_layanan: string;
  whatsapp: string;
}

const ContactManager = () => {
  const { toast } = useToast();
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    alamat: 'SMA Negeri 1 Lumbang\nJl. Raya Lumbang No. 123\nLumbang, Pasuruan, Jawa Timur 67183',
    telepon: '(0343) 123-4567',
    email: 'bk@sman1lumbang.sch.id',
    jam_layanan: 'Senin - Jumat: 07:00 - 15:00 WIB\nSabtu: 07:00 - 12:00 WIB\nMinggu: Tutup',
    whatsapp: '6281234567890'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For now, we'll store this in localStorage since we don't have a contact_info table
      localStorage.setItem('contact_info', JSON.stringify(contactInfo));
      
      toast({
        title: "Berhasil",
        description: "Informasi kontak berhasil disimpan",
      });
    } catch (error) {
      console.error('Error saving contact info:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan informasi kontak",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load contact info from localStorage
    const saved = localStorage.getItem('contact_info');
    if (saved) {
      setContactInfo(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Kelola Informasi Kontak</span>
          </CardTitle>
          <CardDescription>
            Kelola informasi kontak yang ditampilkan di halaman kontak
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat Sekolah</Label>
                <Textarea
                  id="alamat"
                  value={contactInfo.alamat}
                  onChange={(e) => setContactInfo({ ...contactInfo, alamat: e.target.value })}
                  placeholder="Alamat lengkap sekolah"
                  rows={4}
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="telepon">Nomor Telepon</Label>
                  <Input
                    id="telepon"
                    value={contactInfo.telepon}
                    onChange={(e) => setContactInfo({ ...contactInfo, telepon: e.target.value })}
                    placeholder="(0343) 123-4567"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="bk@sman1lumbang.sch.id"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp (dengan kode negara)</Label>
                  <Input
                    id="whatsapp"
                    value={contactInfo.whatsapp}
                    onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
                    placeholder="6281234567890"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jam_layanan">Jam Layanan</Label>
              <Textarea
                id="jam_layanan"
                value={contactInfo.jam_layanan}
                onChange={(e) => setContactInfo({ ...contactInfo, jam_layanan: e.target.value })}
                placeholder="Jam layanan BK"
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactManager;
