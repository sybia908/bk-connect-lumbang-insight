
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, Menu, X } from "lucide-react";
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-background shadow-lg border-b-4 border-primary-500 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-white">
              <img 
                src="https://drive.google.com/uc?export=view&id=1DhBycV4hx0FYtOEGM7IwwV5xbOSbSSw8" 
                alt="BK Connect Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-700">BK Connect</h1>
              <p className="text-sm text-muted-foreground">SMA NEGERI 1 LUMBANG</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#beranda" className="text-foreground hover:text-primary-600 transition-colors font-medium">
              Beranda
            </a>
            <a href="#tentang" className="text-foreground hover:text-primary-600 transition-colors font-medium">
              Tentang BK
            </a>
            <a href="#layanan" className="text-foreground hover:text-primary-600 transition-colors font-medium">
              Layanan
            </a>
            <a href="#berita" className="text-foreground hover:text-primary-600 transition-colors font-medium">
              Berita
            </a>
            <a href="#kontak" className="text-foreground hover:text-primary-600 transition-colors font-medium">
              Kontak
            </a>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button 
              onClick={() => navigate('/login')}
              className="bg-primary-gradient hover:bg-primary-700 text-white font-medium px-6"
            >
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>

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
              <a href="#beranda" className="text-foreground hover:text-primary-600 transition-colors font-medium">
                Beranda
              </a>
              <a href="#tentang" className="text-foreground hover:text-primary-600 transition-colors font-medium">
                Tentang BK
              </a>
              <a href="#layanan" className="text-foreground hover:text-primary-600 transition-colors font-medium">
                Layanan
              </a>
              <a href="#berita" className="text-foreground hover:text-primary-600 transition-colors font-medium">
                Berita
              </a>
              <a href="#kontak" className="text-foreground hover:text-primary-600 transition-colors font-medium">
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
