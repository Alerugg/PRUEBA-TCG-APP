import fs from 'fs/promises';
import path from 'path';

const BAND_THRESHOLDS = { low: 33, medium: 66 };

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function pickBand(score) {
  if (score <= BAND_THRESHOLDS.low) return 'low';
  if (score <= BAND_THRESHOLDS.medium) return 'medium';
  return 'high';
}

function fillTemplate(message, score, preset) {
  return message.replaceAll('{{score}}', String(score)).replaceAll('{{preset}}', preset);
}

export async function loadRules(preset) {
  const rulePath = path.join(process.cwd(), 'rules', `${preset}.json`);
  const file = await fs.readFile(rulePath, 'utf-8');
  return JSON.parse(file);
}

export async function analyzeRisk(input) {
  const rules = await loadRules(input.preset);
  let score = rules.base_score ?? 40;
  const reasons = [];

  for (const [field, options] of Object.entries(rules.select_rules || {})) {
    const selected = input[field];
    const def = options[selected];
    if (!def) continue;
    score += def.score;
    reasons.push({ reason: def.reason, impact: def.score });
  }

  for (const checkRule of rules.checkbox_rules || []) {
    if (input[checkRule.field]) {
      score += checkRule.score;
      reasons.push({ reason: checkRule.reason, impact: checkRule.score });
    }
  }

  score = clamp(Math.round(score), 0, 100);
  const band = pickBand(score);

  const top_reasons = reasons
    .filter((entry) => entry.impact > 0)
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 5)
    .map((entry) => entry.reason);

  const action_plan = rules.action_plan?.[band]?.slice(0, 3) || [];
  const messages = (rules.messages?.[band] || [])
    .slice(0, 3)
    .map((msg) => fillTemplate(msg, score, input.preset));

  return { score, band, top_reasons, action_plan, messages };
}
