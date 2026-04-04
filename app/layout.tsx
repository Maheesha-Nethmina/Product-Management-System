import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Produit — Product Manager',
  description: 'Simple product management app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-950 transition-colors selection:bg-indigo-100 selection:text-indigo-700">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}