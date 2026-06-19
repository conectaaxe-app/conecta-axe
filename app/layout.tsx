import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Conecta Axé',
  description: 'O app para descobrir macumbas, casas e pessoas perto de você.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
