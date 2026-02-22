import './globals.css';

export const metadata = {
  title: 'AntiScamTcgApp',
  description: 'TCG Risk Toolkit for safer card transactions.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
