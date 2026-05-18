import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // We keep the request ingestion to prevent client-side errors, 
    // but we override the response for the financial strip.
    await req.json(); 

    return NextResponse.json({
      cost: 0,
      method_id: 'flat_rate',
      method_title: 'FREE (TEST)'
    });

  } catch (error) {
    return NextResponse.json({ cost: 0, method_title: "FREE (TEST)" });
  }
}
