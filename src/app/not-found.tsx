"use client";

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="p-4 text-neon-blue font-mono">
      <h1 className="text-2xl font-bold">404 // NOT_FOUND</h1>
      <p className="mt-2 text-sm">The requested operational sector or memory register is unavailable.</p>
      <Link
        href="/"
        className="mt-4 inline-block px-3 py-1 border border-neon-blue text-neon-blue hover:bg-neon-blue/10 cursor-pointer"
      >
        Return to Nexus Home
      </Link>
    </section>
  );
}
