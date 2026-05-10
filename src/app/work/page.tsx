'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/layout/CustomCursor';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    client: 'UT Sarees',
    industry: 'E-Commerce / Fashion',
    headline: 'From Zero to ₹50 Lacs Revenue',
    description:
      'We partnered with UT Sarees to build and scale their online presence from scratch. Through strategic Google Search and Shopping campaigns, we delivered exceptional results that transformed their business.',
    results: [
      { metric: '₹50 Lacs', label: 'Revenue Generated' },
      { metric: '10X', label: 'Return on Ad Spend' },
      { metric: 'Top 3', label: 'Google Rankings' },
    ],
    services: ['Google Ads', 'Shopping Campaigns', 'SEO'],
  },
  {
    client: 'The Usee Shop',
    industry: 'E-Commerce / Banarasi Silk',
    headline: 'First-Page Ranking for Competitive Keywords',
    description:
      'The Usee Shop came to us struggling with visibility in a highly competitive niche. Our comprehensive SEO strategy achieved first-page ranking for "banarasi silk tissue saree" and drove significant organic sales growth.',
    results: [
      { metric: '#1 Page', label: 'Google Ranking' },
      { metric: '300%+', label: 'Organic Traffic Growth' },
      { metric: 'Significant', label: 'Sales Increase' },
    ],
    services: ['SEO', 'Content Strategy', 'On-Page Optimization'],
  },
  {
    client: 'E-Commerce Client',
    industry: 'E-Commerce',
    headline: '₹30 Lakh in Sales with 14X ROAS',
    description:
      'Through precise website-ad alignment and continuous optimization, we helped this e-commerce brand achieve remarkable returns. Our approach combined landing page optimization with targeted ad campaigns for maximum conversion.',
    results: [
      { metric: '₹30 Lakh', label: 'Total Sales' },
      { metric: '14X', label: 'Return on Ad Spend' },
      { metric: '60%', label: 'Lower CPA' },
    ],
    services: ['Google Ads', 'Landing Pages', 'Conversion Optimization'],
  },
];

const triplePlayPillars = [
  {
    title: 'SEO',
    subtitle: 'Organic Foundation',
    description:
      'Build a strong organic foundation with keyword-optimized content, technical SEO, and authority building. SEO drives long-term, sustainable traffic that compounds over time.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: 'Meta Ads',
    subtitle: 'Social Discovery',
    description:
      'Leverage Facebook and Instagram ads for brand awareness and demand generation. Meta Ads reach users in discovery mode, creating interest before they even search.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    title: 'Google Ads',
    subtitle: 'Intent Capture',
    description:
      'Capture high-intent searches with Google Search and Shopping campaigns. When users are actively looking for your product, Google Ads ensures you\'re right there.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
];

export default function WorkPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.case-study-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.case-studies-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.pillar-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pillars-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div ref={pageRef}>
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(200,169,106,0.06) 0%, transparent 70%)' }}
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
            >
              Our Work
            </motion.span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight mb-6">
              <AnimatedText text="Results that speak" />
              <br />
              <span className="text-gradient">
                <AnimatedText text="for themselves" delay={0.2} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-light-300 text-lg max-w-2xl mx-auto"
            >
              Real campaigns. Real numbers. See how we&apos;ve helped businesses achieve
              extraordinary growth through strategic digital marketing.
            </motion.p>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-8 md:py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-10 md:mb-16"
            >
              <span className="text-accent-blue text-sm font-medium tracking-widest uppercase mb-4 block">
                Case Studies
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Client <span className="text-gradient">Success Stories</span>
              </h2>
            </motion.div>

            <div className="case-studies-grid space-y-8">
              {caseStudies.map((study) => (
                <div key={study.client} className="case-study-card">
                  <GlassCard className="p-6 sm:p-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-accent-gold text-xs font-medium tracking-wider uppercase">{study.industry}</span>
                    </div>

                    <h3 className="font-heading font-bold text-2xl md:text-3xl mb-2">{study.client}</h3>
                    <p className="text-lg text-accent-blue font-medium mb-4">{study.headline}</p>
                    <p className="text-light-300/60 leading-relaxed mb-8 max-w-3xl">{study.description}</p>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {study.results.map((result) => (
                        <div key={result.label} className="text-center glass rounded-xl p-4">
                          <div className="text-2xl md:text-3xl font-heading font-bold text-gradient mb-1">
                            {result.metric}
                          </div>
                          <div className="text-xs text-light-300/50">{result.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Services used */}
                    <div className="flex flex-wrap gap-2">
                      {study.services.map((svc) => (
                        <span key={svc} className="px-3 py-1 rounded-full text-xs text-light-300/50 border border-dark-700/50">
                          {svc}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Triple Play Model */}
        <section className="py-16 md:py-32 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-gold text-sm font-medium tracking-widest uppercase mb-4 block"
              >
                Our Approach
              </motion.span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
                The <span className="text-gradient">Triple Play Model</span>
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-light-300/60 text-lg max-w-2xl mx-auto"
              >
                A unified system that combines three powerful channels into one cohesive strategy.
                Instead of running isolated campaigns, we create synergies that multiply your results.
              </motion.p>
            </div>

            {/* Three Pillars */}
            <div className="pillars-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {triplePlayPillars.map((pillar) => (
                <div key={pillar.title} className="pillar-card">
                  <GlassCard className="p-6 sm:p-8 text-center h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass mb-4 text-accent-blue">
                      {pillar.icon}
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-1">{pillar.title}</h3>
                    <p className="text-accent-gold text-sm font-medium mb-4">{pillar.subtitle}</p>
                    <p className="text-light-300/60 text-sm leading-relaxed">{pillar.description}</p>
                  </GlassCard>
                </div>
              ))}
            </div>

            {/* Synergy Explanation */}
            <GlassCard className="p-6 sm:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-heading font-bold text-2xl mb-4">
                    Why it works <span className="text-gradient">together</span>
                  </h3>
                  <div className="space-y-4 text-light-300/60 leading-relaxed">
                    <p>
                      Most agencies treat SEO, Meta Ads, and Google Ads as separate silos. We don&apos;t.
                      The Triple Play Model creates a flywheel effect where each channel reinforces the others.
                    </p>
                    <p>
                      Meta Ads generate awareness and demand. Google Ads capture that high-intent search traffic.
                      SEO builds the long-term organic foundation that reduces your ad dependency over time.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Lower Customer Acquisition Cost', desc: 'Multi-channel attribution reduces wasteful spending' },
                    { title: 'Compound Growth', desc: 'SEO builds equity while ads deliver immediate results' },
                    { title: 'Full Funnel Coverage', desc: 'Awareness → Consideration → Conversion → Retention' },
                    { title: 'Data Synergies', desc: 'Insights from each channel improve the others' },
                  ].map((benefit) => (
                    <div key={benefit.title} className="flex items-start gap-3">
                      <div className="mt-1 shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-blue">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-light-300">{benefit.title}</div>
                        <div className="text-xs text-light-300/40">{benefit.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Want results like these for <span className="text-gradient">your business?</span>
            </h2>
            <p className="text-light-300/60 mb-8">
              Let&apos;s talk about how the Triple Play Model can work for your brand.
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300"
              data-cursor="pointer"
            >
              Book A Free Call
            </a>
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  );
}
