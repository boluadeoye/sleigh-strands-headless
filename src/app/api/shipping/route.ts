import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { state } = await req.json();
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;
    const baseUrl = process.env.WC_SITE_URL || 'https://sleighstrands.com/admin';
    const auth = `?consumer_key=${ck}&consumer_secret=${cs}`;

    // 1. Fetch all zones
    const zonesRes = await fetch(`${baseUrl}/wp-json/wc/v3/shipping/zones${auth}`);
    const zones = await zonesRes.json();

    // 2. Fetch locations for all zones to find the best match
    const zoneLocations = await Promise.all(
      zones.map(async (zone: any) => {
        const locRes = await fetch(`${baseUrl}/wp-json/wc/v3/shipping/zones/${zone.id}/locations${auth}`);
        const locations = await locRes.json();
        return { id: zone.id, locations: Array.isArray(locations) ? locations : [] };
      })
    );

    let bestZoneId = 0;
    let highestScore = 0;

    for (const zone of zoneLocations) {
      for (const loc of zone.locations) {
        // PRIORITY 1: Exact State Match (e.g., NG:LA) - 10 Points
        if (loc.code === `NG:${state}` || loc.code === state) {
          bestZoneId = zone.id;
          highestScore = 10;
          break;
        }
        // PRIORITY 2: Country Match (e.g., NG) - 5 Points
        if (loc.type === 'country' && loc.code === 'NG' && highestScore < 10) {
          bestZoneId = zone.id;
          highestScore = 5;
        }
      }
      if (highestScore === 10) break; // Stop if we found the most specific match
    }

    // 3. Fetch methods for the highest scoring zone
    const methodsRes = await fetch(`${baseUrl}/wp-json/wc/v3/shipping/zones/${bestZoneId}/methods${auth}`);
    const methods = await methodsRes.json();

    // Find the enabled flat_rate method
    const activeMethod = Array.isArray(methods)
      ? methods.find((m: any) => m.enabled && m.method_id === 'flat_rate') || methods.find((m: any) => m.enabled)
      : null;

    if (!activeMethod) {
      return NextResponse.json({ cost: 0, method_title: "Not Available" });
    }

    return NextResponse.json({
      cost: parseFloat(activeMethod.settings.cost?.value || "0"),
      method_id: activeMethod.method_id,
      method_title: activeMethod.title
    });

  } catch (error) {
    return NextResponse.json({ error: 'Sync Failed' }, { status: 500 });
  }
}
