/**
 * Geocode BTS sites: unique thana+district via Nominatim, then batch-update DB.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function geocode(thana, district) {
  const queries = [
    `${thana}, ${district}, Bangladesh`,
    `${district}, Bangladesh`,
  ];
  for (const q of queries) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1&countrycodes=bd`;
      const res = await fetch(url, { headers: { 'User-Agent': 'FalconCMS/1.0 geocoder' } });
      const data = await res.json();
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), query: q };
      }
    } catch (e) {
      console.error('  fetch error:', e.message);
    }
    await sleep(1200);
  }
  return null;
}

async function main() {
  // Get all unique thana+district combos
  const sites = await prisma.bts.findMany({ select: { id: true, thana: true, district: true, latitude: true } });
  
  // Group by thana+district to geocode once per unique combo
  const cache = new Map();
  const todo = sites.filter(s => s.latitude === null);
  
  console.log(`Sites needing geocoding: ${todo.length} of ${sites.length}`);

  for (let i = 0; i < todo.length; i++) {
    const s = todo[i];
    const key = `${s.thana}||${s.district}`;
    
    let coords = cache.get(key);
    if (!coords) {
      console.log(`[${i+1}/${todo.length}] Geocoding: ${s.thana}, ${s.district}`);
      coords = await geocode(s.thana, s.district);
      cache.set(key, coords || null);
      await sleep(1200); // Nominatim rate limit
    } else {
      console.log(`[${i+1}/${todo.length}] Cache hit: ${s.thana}, ${s.district}`);
    }

    if (coords) {
      await prisma.bts.update({
        where: { id: s.id },
        data: { latitude: coords.lat, longitude: coords.lng },
      });
      console.log(`  ✅ (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}) via "${coords.query}"`);
    } else {
      console.log(`  ⚠️  No result — skipped`);
    }
  }

  const filled = await prisma.bts.count({ where: { latitude: { not: null } } });
  console.log(`\nDone. ${filled}/${sites.length} sites have coordinates.`);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
