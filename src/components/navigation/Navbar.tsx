"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UpthrustLogo } from "@/components/brand/Logo";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  ctaText?: string;
  ctaLink?: string;
}

export function Navbar({
  ctaText = "CONTACT US",
  ctaLink = "#contact",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "SERVICES", href: "#services" },
    { label: "WORK", href: "#services" },
    { label: "ABOUT", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-zinc-200/90 py-3 shadow-sm"
          : "bg-transparent py-4 sm:py-5 border-b border-zinc-200/60"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo: 🚀 Upthrust */}
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none group select-none"
          aria-label="Upthrust Design Home"
        >
          <span className="text-lg sm:text-xl transform -rotate-45 inline-block" aria-hidden="true">
            🚀
          </span>
          <span className="text-base sm:text-lg font-black tracking-tight text-zinc-950 font-sans">
            Upthrust
          </span>
        </Link>

        {/* Orange Hamburger Menu Trigger */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex flex-col justify-center items-end gap-1.5 p-2 focus:outline-none cursor-pointer group"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-brand-orange" />
          ) : (
            <>
              <span className="w-6 sm:w-7 h-[3.5px] bg-brand-orange rounded-full transition-transform group-hover:scale-x-105" />
              <span className="w-6 sm:w-7 h-[3.5px] bg-brand-orange rounded-full transition-transform group-hover:scale-x-105" />
              <span className="w-6 sm:w-7 h-[3.5px] bg-brand-orange rounded-full transition-transform group-hover:scale-x-105" />
            </>
          )}
        </button>
      </div>

      {/* Navigation Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] sm:top-[68px] bg-white/98 backdrop-blur-2xl border-b border-zinc-200 shadow-2xl px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top-2 duration-200 z-50">
          <div className="max-w-[1440px] mx-auto w-full px-2 sm:px-4 flex flex-col gap-6">
            <nav className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 border-b border-zinc-100 pb-6" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base sm:text-lg font-black uppercase tracking-wider text-zinc-900 hover:text-brand-orange py-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-500 font-medium">
                Bold design that performs.
              </span>
              <a
                href={ctaLink}
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-md w-full sm:w-auto"
              >
                <span>{ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
