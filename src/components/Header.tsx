
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleLogin = (role: string) => {
    console.log(`Login sebagai ${role}`);
    // Handle login logic here
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-primary-500 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">BK</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-700">BK Connect</h1>
              <p className="text-sm text-gray-600">SMA NEGERI 1 LUMBANG</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#beranda" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Beranda
            </a>
            <a href="#tentang" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Tentang BK
            </a>
            <a href="#layanan" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Layanan
            </a>
            <a href="#berita" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Berita
            </a>
            <a href="#kontak" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Kontak
            </a>
          </nav>

          {/* Login Button */}
          <div className="flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary-gradient hover:bg-primary-700 text-white font-medium px-6">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center text-primary-700">Login BK Connect</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Pilih Peran</Label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih peran Anda" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="admin">Admin BK</SelectItem>
                        <SelectItem value="guru">Guru BK</SelectItem>
                        <SelectItem value="wali">Wali Kelas</SelectItem>
                        <SelectItem value="siswa">Siswa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Username / NIS / NISN</Label>
                    <Input id="username" type="text" placeholder="Masukkan username" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Masukkan password" />
                  </div>
                  
                  <Button 
                    className="w-full bg-primary-gradient hover:bg-primary-700" 
                    onClick={() => handleLogin(selectedRole)}
                    disabled={!selectedRole}
                  >
                    Masuk
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#beranda" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Beranda
              </a>
              <a href="#tentang" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Tentang BK
              </a>
              <a href="#layanan" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Layanan
              </a>
              <a href="#berita" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Berita
              </a>
              <a href="#kontak" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Kontak
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
