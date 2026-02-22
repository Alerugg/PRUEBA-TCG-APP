'use client';

import { useMemo, useState } from 'react';
import { CHECKBOX_FIELDS, PRESETS, SELECT_FIELDS } from '../../lib/constants';
import './tool.css';

const DEFAULT_FORM = {
  preset: 'wallapop',
  seller_reputation: 'good',
  payment_protection: 'full',
  shipping_tracking: 'insured',
  product_evidence: 'detailed_photos',
  price_too_good: false,
  seller_pushes_off_platform: false,
  urgent_sale_pressure: false,
  refuses_timestamp: false,
  inconsistent_story: false,
  asks_friends_family_payment: false,
  unwilling_live_verification: false,
  account_recently_created: false,
  refuses_secure_meeting_point: false,
  note: ''
};

const TCG_BRANDS = ['Pokémon', 'Magic: The Gathering', 'Yu-Gi-Oh!', 'One Piece', 'Lorcana', 'Digimon', 'Dragon Ball Super', 'Flesh and Blood'];

export default function ToolPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const trafficLight = useMemo(() => {
    if (!result) return '⚪';
    if (result.band === 'low') return '🟢';
    if (result.band === 'medium') return '🟡';
    return '🔴';
  }, [result]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error analizando riesgo');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyMessage = async (message) => navigator.clipboard.writeText(message);

  const shareLink = async () => {
    const params = new URLSearchParams();
    Object.entries(form).forEach(([k, v]) => params.set(k, String(v)));
    const url = `${window.location.origin}/tool?${params.toString()}`;
    await navigator.clipboard.writeText(url);
  };

  return (
    <main className="tool-page">
      <section className="tool-shell">
        <header className="tool-header">
          <h1 style={{ margin: 0 }}>AntiScamTcgApp · TCG Risk Toolkit</h1>
          <p style={{ color: '#cbd5e1' }}>Evaluación de riesgo con estética dark silver y reglas específicas por marketplace.</p>
          <div className="badge-collage">{TCG_BRANDS.map((b) => <span key={b}>{b}</span>)}</div>
        </header>

        <form onSubmit={onSubmit} className="card">
          <div className="grid">
            <div className="field">
              <label>Preset de plataforma</label>
              <select value={form.preset} onChange={(e) => setForm({ ...form, preset: e.target.value })}>
                {PRESETS.map((preset) => <option key={preset} value={preset}>{preset}</option>)}
              </select>
            </div>

            {Object.entries(SELECT_FIELDS).map(([field, options]) => (
              <div className="field" key={field}>
                <label>{field.replaceAll('_', ' ')}</label>
                <select value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })}>
                  {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            ))}
          </div>

          <h3>Red flags</h3>
          <div className="flags">
            {CHECKBOX_FIELDS.map((item) => (
              <label key={item.key}>
                <input
                  type="checkbox"
                  checked={form[item.key]}
                  onChange={(e) => setForm({ ...form, [item.key]: e.target.checked })}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          <div className="field" style={{ marginTop: '.8rem' }}>
            <label>Nota opcional</label>
            <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} maxLength={500} />
          </div>

          <button className="submit-btn" type="submit" disabled={loading}>{loading ? 'Calculando...' : 'Analizar riesgo'}</button>
        </form>

        {error && <p style={{ color: '#fca5a5' }}>{error}</p>}

        {result && (
          <section className="result">
            <h2>{trafficLight} Score: {result.score}/100 ({result.band})</h2>
            <div className="row">
              <div className="card">
                <h3>Top razones</h3>
                <ul>{result.top_reasons.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
              <div className="card">
                <h3>Action plan</h3>
                <ol>{result.action_plan.map((p) => <li key={p}>{p}</li>)}</ol>
              </div>
            </div>

            <div className="card" style={{ marginTop: '.8rem' }}>
              <h3>Mensajes sugeridos</h3>
              <ul>
                {result.messages.map((msg) => (
                  <li key={msg}>
                    {msg}
                    <button className="mini-btn" type="button" onClick={() => copyMessage(msg)}>Copiar</button>
                  </li>
                ))}
              </ul>
              <button className="mini-btn" type="button" onClick={shareLink}>Share link</button>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
