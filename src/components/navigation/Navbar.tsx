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
          ? "bg-white/90 backdrop-blur-md border-b border-zinc-200/80 py-3.5 shadow-sm"
          : "bg-transparent py-5 md:py-7"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded"
          aria-label="Upthrust Design Home"
        >
          <UpthrustLogo variant="dark" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-brand-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <a
            href={ctaLink}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-extrabold uppercase tracking-widest rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{ctaText}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-900 hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-md"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-xl px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-extrabold uppercase tracking-widest text-zinc-800 hover:text-brand-orange py-2 border-b border-zinc-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={ctaLink}
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-brand-orange text-white text-xs font-black uppercase tracking-widest rounded-full text-center shadow-md"
          >
            <span>{ctaText}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}
