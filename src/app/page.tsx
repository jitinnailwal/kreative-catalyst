'use client';

import { useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll, destroySmoothScroll } from '@/lib/smooth-scroll';
import Navbar from '@/components/layout/Navbar';
import CustomCursor from '@/components/layout/CustomCursor';
import Hero from '@/components/sections/Hero';

// Lazy load below-the-fold sections
const About = lazy(() => import('@/components/sections/About'));
const Services = lazy(() => import('@/components/sections/Services'));
const Testimonials = lazy(() => import('@/components/sections/Testimonials'));
const Blog = lazy(() => import('@/components/sections/Blog'));
const Contact = lazy(() => import('@/components/sections/Contact'));
const Footer = lazy(() => import('@/components/layout/Footer'));

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    initSmoothScroll();

    // Refresh ScrollTrigger after everything loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      destroySmoothScroll();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Suspense>
          <About />
          <Services />
          <Testimonials />
          <Blog />
          <Contact />
        </Suspense>
      </main>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
