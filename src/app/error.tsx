"use client";

import React from 'react';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="p-4 text-neon-red font-mono">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-3 py-1 border border-neon-red text-neon-red hover:bg-neon-red/10 cursor-pointer"
      >
        Try again
      </button>
    </section>
  );
}
