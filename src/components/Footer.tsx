
import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold">BK</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">BK Connect</h3>
                <p className="text-sm text-gray-300">SMA NEGERI 1 LUMBANG</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Sistem informasi bimbingan dan konseling terintegrasi untuk menciptakan 
              lingkungan pendidikan yang supportif dan berkualitas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Jl. Raya Lumbang No. 1</p>
                  <p>Lumbang, Pasuruan, Jawa Timur</p>
                  <p>67181</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-sm text-gray-300">(0343) 123456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-sm text-gray-300">bk@sman1lumbang.sch.id</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Menu Cepat</h4>
            <ul className="space-y-2">
              <li>
                <a href="#beranda" className="text-sm text-gray-300 hover:text-primary-400 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#tentang" className="text-sm text-gray-300 hover:text-primary-400 transition-colors">
                  Tentang BK
                </a>
              </li>
              <li>
                <a href="#layanan" className="text-sm text-gray-300 hover:text-primary-400 transition-colors">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#berita" className="text-sm text-gray-300 hover:text-primary-400 transition-colors">
                  Berita
                </a>
              </li>
              <li>
                <a href="#kontak" className="text-sm text-gray-300 hover:text-primary-400 transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Office Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Jam Pelayanan</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-400 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p className="font-medium">Senin - Jumat</p>
                  <p>07:00 - 15:00 WIB</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-400 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p className="font-medium">Sabtu</p>
                  <p>07:00 - 12:00 WIB</p>
                </div>
              </div>
              <div className="text-sm text-gray-300">
                <p className="font-medium text-red-400">Minggu: Tutup</p>
              </div>
            </div>
            <div className="bg-primary-900/50 p-4 rounded-lg">
              <p className="text-xs text-gray-300">
                <strong>Layanan Darurat:</strong><br />
                Hubungi (0343) 123456 ext. 911 untuk konsultasi mendesak.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 BK Connect - SMA NEGERI 1 LUMBANG. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
