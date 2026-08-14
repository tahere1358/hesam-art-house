'use client';

import Link from 'next/link';
import { APP_NAME } from '@/config/constants';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-blue-100 transition">
            🎨 {APP_NAME}
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-blue-100 transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-blue-100 transition">
              Products
            </Link>
            <Link href="/cart" className="hover:text-blue-100 transition">
              Cart
            </Link>
            <Link href="/dashboard" className="hover:text-blue-100 transition">
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
