'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

function ScatteredLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll('.logo-char');
    if (!chars.length) return;

    // Set initial scattered state
    chars.forEach((char) => {
      const el = char as HTMLElement;
      const randX = (Math.random() - 0.5) * 120;
      const randY = (Math.random() - 0.5) * 60;
      const randRotate = (Math.random() - 0.5) * 90;
      const randScale = Math.random() * 0.3 + 0.3;

      gsap.set(el, {
        x: randX,
        y: randY,
        rotation: randRotate,
        scale: randScale,
        opacity: 0,
        filter: 'blur(4px)',
      });
    });

    const tl = gsap.timeline({ delay: 0.8 });

    // Phase 1: Fade in at scattered positions
    tl.to(chars, {
      opacity: 0.5,
      scale: 0.7,
      filter: 'blur(2px)',
      duration: 0.5,
      stagger: { each: 0.03, from: 'random' },
      ease: 'power1.out',
    });

    // Phase 2: Assemble into final position
    tl.to(
      chars,
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        stagger: { each: 0.03, from: 'random' },
        ease: 'power3.out',
      },
      '-=0.2'
    );

    // Phase 3: Subtle settle bounce
    tl.fromTo(
      chars,
      { y: 0 },
      {
        y: -2,
        duration: 0.12,
        stagger: { each: 0.015, from: 'start' },
        ease: 'power2.out',
      },
      '-=0.15'
    );
    tl.to(chars, {
      y: 0,
      duration: 0.25,
      stagger: { each: 0.015, from: 'start' },
      ease: 'bounce.out',
    });

    return () => {
      tl.kill();
    };
  }, []);

  const text1 = 'Kreative';
  const text2 = ' Catalyst';

  return (
    <div ref={containerRef} className="font-heading font-semibold text-lg tracking-tight inline-flex">
      {text1.split('').map((char, i) => (
        <span
          key={`k-${i}`}
          className="logo-char inline-block"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          {char}
        </span>
      ))}
      {text2.split('').map((char, i) => (
        <span
          key={`c-${i}`}
          className="logo-char inline-block text-accent-blue"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar — hidden when mobile menu is open */}
      <AnimatePresence>
        {!mobileOpen && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
              scrolled
                ? 'glass-strong py-3'
                : 'py-5 bg-transparent'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
              {/* Logo */}
              <a href="#" className="flex items-center gap-3 group" data-cursor="pointer">
                <Image
                  src="/KC_Logo.jpeg"
                  alt="Kreative Catalyst"
                  width={40}
                  height={40}
                  className="rounded-lg group-hover:scale-110 transition-transform duration-300"
                />
                <ScatteredLogo />
              </a>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="text-sm text-light-300 hover:text-light transition-colors relative group"
                    data-cursor="pointer"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-blue group-hover:w-full transition-all duration-300" />
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 hover:scale-105"
                  data-cursor="pointer"
                >
                  Book A Free Call
                </motion.a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden flex flex-col gap-1.5 p-2"
                data-cursor="pointer"
              >
                <span className="w-6 h-[2px] bg-light block" />
                <span className="w-6 h-[2px] bg-light block" />
                <span className="w-6 h-[2px] bg-light block" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu — full page overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] glass-strong flex flex-col md:hidden"
          >
            {/* Close button at top-right */}
            <div className="flex justify-end px-4 sm:px-6 py-5">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex flex-col gap-1.5 p-2"
                data-cursor="pointer"
              >
                <motion.span
                  initial={{ rotate: 0, y: 0 }}
                  animate={{ rotate: 45, y: 6 }}
                  exit={{ rotate: 0, y: 0 }}
                  className="w-6 h-[2px] bg-light block"
                />
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 1 }}
                  className="w-6 h-[2px] bg-light block"
                />
                <motion.span
                  initial={{ rotate: 0, y: 0 }}
                  animate={{ rotate: -45, y: -6 }}
                  exit={{ rotate: 0, y: 0 }}
                  className="w-6 h-[2px] bg-light block"
                />
              </button>
            </div>

            {/* Menu content centered */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              <Image
                src="/KreativeCatalystCrop_Logo.jpeg"
                alt="Kreative Catalyst"
                width={220}
                height={70}
                className="rounded-lg mb-4"
              />
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-heading font-semibold text-light hover:text-accent-blue transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
