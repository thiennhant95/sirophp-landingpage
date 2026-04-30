'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-semibold text-lg">SiroPHP</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">
              Features
            </Link>
            <Link href="#why-siro" className="text-gray-400 hover:text-white transition-colors text-sm">
              Why Siro
            </Link>
            <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
              Blog
            </Link>
            <Link href="#docs" className="text-gray-400 hover:text-white transition-colors text-sm">
              Docs
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/SiroSoft/SiroPHP"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-gray-400 hover:text-white transition-colors text-sm px-4 py-2"
            >
              GitHub
            </Link>
            <Link
              href="#get-started"
              className="bg-white text-black hover:bg-gray-100 transition-colors text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
