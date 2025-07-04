
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
  
  const { signIn, signInWithGoogle, signUp, user, profile } = useAuth();
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          title: "Error Login Google",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat login dengan Google",
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

            {!isSignUp && (
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Atau
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-4"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Masuk dengan Google
                </Button>
              </div>
            )}

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
