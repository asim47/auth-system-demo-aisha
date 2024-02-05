'use client';
import { useEffect } from 'react';

const baseURL = 'https://linkwave.io';
const url = `${baseURL}/sign-up`;
const title = `Sign up | Linkwave | Your Custom Link to Infinite Horizons |`;
const description = 'Sign up | Linkwave | Your Custom Link to Infinite Horizons |';

export default function ChildLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (document) {
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    }
  }, []);

  return <>{children}</>;
}