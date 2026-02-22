import { NextResponse } from 'next/server';
import { analyzeSchema } from '../../../lib/validation';
import { analyzeRisk } from '../../../lib/ruleEngine';

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = analyzeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: parsed.error.flatten()
        },
        { status: 400 }
      );
    }

    const result = await analyzeRisk(parsed.data);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
