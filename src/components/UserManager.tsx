import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Users, Plus, Edit2, Trash2, Shield, UserCheck, UserX } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Profile {
  id: string;
  email: string;
  username: string;
  nama_lengkap: string;
  role: 'admin' | 'guru_bk' | 'wali_kelas' | 'siswa';
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

const UserManager = () => {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    nama_lengkap: '',
    role: 'siswa' as 'admin' | 'guru_bk' | 'wali_kelas' | 'siswa',
    is_active: true
  });

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data pengguna",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingUser) {
        // Update existing user
        const { error } = await supabase
          .from('profiles')
          .update({
            username: formData.username,
            nama_lengkap: formData.nama_lengkap,
            role: formData.role,
            is_active: formData.is_active
          })
          .eq('id', editingUser.id);

        if (error) throw error;
        
        toast({
          title: "Berhasil",
          description: "Data pengguna berhasil diperbarui",
        });
      } else {
        // For new users, we need to create them through Supabase Auth first
        toast({
          title: "Info",
          description: "Untuk menambah pengguna baru, mereka harus mendaftar melalui halaman login",
        });
      }

      setIsDialogOpen(false);
      setEditingUser(null);
      resetForm();
      fetchProfiles();
    } catch (error) {
      console.error('Error saving user:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan data pengguna",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: !currentStatus })
        .eq('id', userId);

      if (error) throw error;
      
      toast({
        title: "Berhasil",
        description: `Pengguna berhasil ${!currentStatus ? 'diaktifkan' : 'dinonaktifkan'}`,
      });
      
      fetchProfiles();
    } catch (error) {
      console.error('Error toggling user status:', error);
      toast({
        title: "Error",
        description: "Gagal mengubah status pengguna",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      username: '',
      nama_lengkap: '',
      role: 'siswa',
      is_active: true
    });
  };

  const openEditDialog = (user: Profile) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      username: user.username,
      nama_lengkap: user.nama_lengkap,
      role: user.role,
      is_active: user.is_active
    });
    setIsDialogOpen(true);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'guru_bk': return 'bg-blue-100 text-blue-800';
      case 'wali_kelas': return 'bg-green-100 text-green-800';
      case 'siswa': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'guru_bk': return 'Guru BK';
      case 'wali_kelas': return 'Wali Kelas';
      case 'siswa': return 'Siswa';
      default: return role;
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  if (loading && profiles.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Manajemen Pengguna</span>
              </CardTitle>
              <CardDescription>
                Kelola pengguna sistem BK Connect
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Pengguna
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingUser ? 'Perbarui informasi pengguna' : 'Pengguna baru harus mendaftar melalui halaman registrasi'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!!editingUser}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                      <Input
                        id="nama_lengkap"
                        value={formData.nama_lengkap}
                        onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select 
                        value={formData.role} 
                        onValueChange={(value: 'admin' | 'guru_bk' | 'wali_kelas' | 'siswa') => setFormData({ ...formData, role: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="siswa">Siswa</SelectItem>
                          <SelectItem value="wali_kelas">Wali Kelas</SelectItem>
                          <SelectItem value="guru_bk">Guru BK</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Menyimpan...' : (editingUser ? 'Perbarui' : 'Simpan')}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Terakhir Login</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">{profile.nama_lengkap}</TableCell>
                    <TableCell>{profile.email}</TableCell>
                    <TableCell>{profile.username}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(profile.role)}>
                        {getRoleLabel(profile.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={profile.is_active ? "default" : "destructive"}>
                        {profile.is_active ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {profile.last_login ? 
                        new Date(profile.last_login).toLocaleDateString('id-ID') : 
                        'Belum pernah'
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(profile)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={profile.is_active ? "destructive" : "default"}
                          size="sm"
                          onClick={() => toggleUserStatus(profile.id, profile.is_active)}
                        >
                          {profile.is_active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {profiles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Belum ada pengguna terdaftar
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManager;
