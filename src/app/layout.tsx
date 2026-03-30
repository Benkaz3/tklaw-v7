import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TK & Associates Law Office',
  description: 'Superior Legal Solutions in Ho Chi Minh City',
  icons: { icon: '/tklaw.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
