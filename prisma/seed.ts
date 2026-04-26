import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

function parseDeploymentDate(val: any): string {
  if (typeof val === 'string' && val.trim()) return val.trim();
  if (typeof val === 'number') {
    // Excel serial date to JS Date
    const epoch = new Date(1900, 0, 1);
    const days = Math.floor(val) - 2; // Excel's leap year bug
    epoch.setDate(epoch.getDate() + days);
    return epoch.toISOString().split('T')[0];
  }
  return '';
}

async function main() {
  const xlsPath = path.resolve(
    __dirname,
    '../(341) BTS DATABASE 22.04.2026.xls',
  );
  const wb = XLSX.readFile(xlsPath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const raw = XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 });
  // Row 0 = company header, Row 1 = totals, Row 2 = column headers, data from Row 3
  const rows: any[][] = raw.slice(3);

  // Row 0 = company header, Row 1 = totals, Row 2 = column headers, data from Row 3
  const dataRows = rows.slice(3);

  console.log(`Seeding ${dataRows.length} BTS records...`);

  // Clear existing data
  await prisma.bts.deleteMany();

  const records = dataRows
    .filter((r) => r[0] && String(r[0]).trim() !== '') // skip empty rows
    .map((r) => ({
      slNo: r[0] ? Number(r[0]) : null,
      airtelCode: r[1] ? String(r[1]).trim() : null,
      robiCode: r[2] ? String(r[2]).trim() : null,
      siteType: r[3] ? String(r[3]).trim() : null,
      district: r[4] ? String(r[4]).trim() : null,
      thana: r[5] ? String(r[5]).trim() : null,
      address: r[6] ? String(r[6]).trim() : null,
      securityVendor: r[7] ? String(r[7]).trim() : null,
      serviceType: r[8] ? String(r[8]).trim() : null,
      posts: r[9] ? Number(r[9]) : null,
      persons: r[10] ? Number(r[10]) : null,
      deploymentDate: parseDeploymentDate(r[11]),
      guardNames: r[12] ? String(r[12]).trim() : null,
      inchargeNames: r[13] ? String(r[13]).trim() : null,
      remarks: r[14] ? String(r[14]).trim() : null,
    }));

  await prisma.bts.createMany({ data: records });
  console.log(`✅ Seeded ${records.length} BTS records successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
