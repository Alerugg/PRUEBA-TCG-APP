import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '3rem', maxWidth: 860, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem' }}>AntiScamTcgApp</h1>
      <p>Toolkit para estimar riesgo en compras/ventas de cartas coleccionables.</p>
      <Link href="/tool" style={{ color: '#38bdf8' }}>Ir al TCG Risk Toolkit</Link>
    </main>
  );
}
