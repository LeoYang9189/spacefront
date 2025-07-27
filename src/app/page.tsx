'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import ProductShowcase from '@/components/ProductShowcase';
import ServiceAdvantage from '@/components/ServiceAdvantage';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <HeroBanner />
      <ProductShowcase />
      <ServiceAdvantage />
      <ContactForm />
    </main>
  );
}
