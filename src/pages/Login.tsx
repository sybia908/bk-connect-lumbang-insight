
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { createAdminUser } from '@/utils/createAdminUser';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, user, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nama_lengkap: '',
    username: '',
    role: 'siswa' as const
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard/admin');
    }
  }, [user, loading, navigate]);

  // Initialize admin user on component mount
  useEffect(() => {
    createAdminUser().then(result => {
      if (result.success) {
        console.log('Admin user setup completed');
      }
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        let errorMessage = 'Terjadi kesalahan saat login';
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Email atau password salah';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Email belum dikonfirmasi. Silakan cek email Anda';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Terlalu banyak percobaan login. Silakan coba lagi nanti';
        }
        
        toast({
          title: "Login Gagal",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang di BK Connect!",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan sistem",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Password dan konfirmasi password tidak sama",
        variant: "destructive"
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Error", 
        description: "Password harus minimal 6 karakter",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await signUp(signupData.email, signupData.password, {
        nama_lengkap: signupData.nama_lengkap,
        username: signupData.username,
        role: signupData.role
      });
      
      if (error) {
        let errorMessage = 'Terjadi kesalahan saat mendaftar';
        
        if (error.message.includes('User already registered')) {
          errorMessage = 'Email sudah terdaftar. Silakan gunakan email lain atau login';
        } else if (error.message.includes('Password should be at least 6 characters')) {
          errorMessage = 'Password harus minimal 6 karakter';
        } else if (error.message.includes('Unable to validate email address')) {
          errorMessage = 'Format email tidak valid';
        }
        
        toast({
          title: "Registrasi Gagal",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Registrasi Berhasil",
          description: "Akun berhasil dibuat. Silakan cek email untuk konfirmasi.",
        });
        
        // Reset form
        setSignupData({
          email: '',
          password: '',
          confirmPassword: '',
          nama_lengkap: '',
          username: '',
          role: 'siswa'
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan sistem",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">BK</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
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
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">BK Connect</h1>
                <p className="text-xs sm:text-sm text-gray-500">SMA NEGERI 1 LUMBANG</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali ke Beranda</span>
              <span className="sm:hidden">Kembali</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">BK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Selamat Datang</h2>
            <p className="text-gray-600 mt-2">Sistem Bimbingan dan Konseling Digital</p>
          </div>

          <Card className="shadow-lg">
            <Tabs defaultValue="login" className="w-full">
              <CardHeader className="space-y-1 pb-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Masuk</TabsTrigger>
                  <TabsTrigger value="signup">Daftar</TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent className="space-y-4">
                <TabsContent value="login" className="space-y-4 mt-0">
                  <div className="space-y-2 text-center">
                    <CardTitle className="text-xl">Masuk ke Akun Anda</CardTitle>
                    <CardDescription>
                      Masukkan email dan password untuk mengakses dashboard
                    </CardDescription>
                  </div>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="nama@contoh.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                          disabled={isSubmitting}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isSubmitting}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary-gradient hover:bg-primary-700" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sedang Masuk...' : 'Masuk'}
                    </Button>
                  </form>

                  {/* Admin Credentials Info */}
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">Akun Admin:</p>
                    <p className="text-xs text-blue-600">Email: andikabgs@gmail.com</p>
                    <p className="text-xs text-blue-600">Password: G4l4xymini</p>
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-0">
                  <div className="space-y-2 text-center">
                    <CardTitle className="text-xl">Buat Akun Baru</CardTitle>
                    <CardDescription>
                      Lengkapi informasi di bawah untuk mendaftar
                    </CardDescription>
                  </div>
                  
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-nama">Nama Lengkap</Label>
                        <Input
                          id="signup-nama"
                          type="text"
                          placeholder="Nama lengkap"
                          value={signupData.nama_lengkap}
                          onChange={(e) => setSignupData({ ...signupData, nama_lengkap: e.target.value })}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-username">Username</Label>
                        <Input
                          id="signup-username"
                          type="text"
                          placeholder="Username"
                          value={signupData.username}
                          onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="nama@contoh.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Minimal 6 karakter"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm">Konfirmasi Password</Label>
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="Ulangi password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary-gradient hover:bg-primary-700" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sedang Mendaftar...' : 'Daftar'}
                    </Button>
                  </form>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Butuh bantuan?{' '}
              <button 
                onClick={() => navigate('/contact')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Hubungi Tim BK
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
