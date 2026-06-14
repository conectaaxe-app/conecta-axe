import './globals.css';

export const metadata = {
  title: 'Conecta Axé',
  description: 'O app para descobrir macumbas, casas e pessoas perto de você.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
