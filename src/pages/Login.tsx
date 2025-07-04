
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Sign up additional fields
  const [username, setUsername] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  
  const { signIn, signUp, user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user && profile) {
      // Redirect based on role
      switch (profile.role) {
        case 'admin':
          navigate('/dashboard/admin');
          break;
        case 'guru_bk':
          navigate('/dashboard/guru-bk');
          break;
        case 'wali_kelas':
          navigate('/dashboard/wali-kelas');
          break;
        case 'siswa':
          navigate('/dashboard/siswa');
          break;
        default:
          navigate('/dashboard');
      }
    }
  }, [user, profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (!selectedRole) {
          toast({
            title: "Error",
            description: "Silakan pilih peran Anda",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        const { data, error } = await signUp(email, password, {
          username,
          nama_lengkap: namaLengkap,
          role: selectedRole
        });

        if (error) {
          toast({
            title: "Error Pendaftaran",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Pendaftaran Berhasil",
            description: "Akun Anda telah dibuat. Silakan login.",
          });
          setIsSignUp(false);
        }
      } else {
        const { data, error } = await signIn(email, password);

        if (error) {
          toast({
            title: "Error Login",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Login Berhasil",
            description: "Selamat datang di BK Connect!",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">BK</span>
          </div>
          <h1 className="text-3xl font-bold text-primary-700 mb-2">BK Connect</h1>
          <p className="text-gray-600">SMA NEGERI 1 LUMBANG</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary-700">
              {isSignUp ? 'Daftar Akun' : 'Login'}
            </CardTitle>
            <CardDescription>
              {isSignUp ? 'Buat akun baru untuk mengakses BK Connect' : 'Masuk ke akun BK Connect Anda'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="role">Peran</Label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih peran Anda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin BK</SelectItem>
                        <SelectItem value="guru_bk">Guru BK</SelectItem>
                        <SelectItem value="wali_kelas">Wali Kelas</SelectItem>
                        <SelectItem value="siswa">Siswa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Masukkan username"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="namaLengkap">Nama Lengkap</Label>
                    <Input
                      id="namaLengkap"
                      type="text"
                      value={namaLengkap}
                      onChange={(e) => setNamaLengkap(e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-gradient hover:bg-primary-700"
                disabled={loading}
              >
                {loading ? (
                  "Loading..."
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    {isSignUp ? 'Daftar' : 'Masuk'}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary-600 hover:text-primary-700"
              >
                {isSignUp ? 'Sudah punya akun? Login' : 'Belum punya akun? Daftar'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="text-primary-600 border-primary-200 hover:bg-primary-50"
          >
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
