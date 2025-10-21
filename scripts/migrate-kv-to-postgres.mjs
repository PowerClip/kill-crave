#!/usr/bin/env node

/**
 * Migration script: Vercel KV → Prisma Postgres
 *
 * This script migrates analytics data from Vercel KV to Prisma Postgres
 * with daily metrics structure.
 *
 * Usage:
 *   node scripts/migrate-kv-to-postgres.mjs [--simulate] [--spread-days=30]
 *
 * Options:
 *   --simulate        Dry run - don't actually write to database
 *   --spread-days=N   Spread totals across N days (default: all on today)
 */

import { kv } from '@vercel/kv';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Parse command line arguments
const args = process.argv.slice(2);
const simulate = args.includes('--simulate');
const spreadDaysArg = args.find(arg => arg.startsWith('--spread-days='));
const spreadDays = spreadDaysArg ? parseInt(spreadDaysArg.split('=')[1]) : 0;

console.log('🚀 Migration KV → Postgres\n');
console.log('Options:');
console.log(`  Simulate: ${simulate ? 'YES (dry run)' : 'NO (will write to DB)'}`);
console.log(`  Spread days: ${spreadDays || 'No (all on today)'}\n`);

// List of all KV keys to migrate
const KV_KEYS = [
  // Visits
  'visits:total',
  'visits:unique',
  // Devices
  'device:iphone',
  'device:android',
  'device:mac',
  'device:windows',
  'device:mobile',
  'device:desktop',
  // Countries
  'country:FR',
  'country:BE',
  'country:CH',
  'country:CA',
  'country:US',
  'country:other',
  // Events
  'events:ViewContent',
  'events:AddToCart',
  'events:InitiateCheckout',
  'events:Purchase',
  // QR Codes (legacy)
  'qr:flyers:scans',
  // Clicks
  'clicks:cta',
];

/**
 * Fetch all KV data
 */
async function fetchKVData() {
  console.log('📥 Fetching data from KV...');
  const data = {};

  for (const key of KV_KEYS) {
    try {
      const value = await kv.get(key);
      data[key] = value || 0;
      console.log(`  ${key}: ${value || 0}`);
    } catch (e) {
      console.error(`  ❌ Error fetching ${key}:`, e.message);
      data[key] = 0;
    }
  }

  // Also fetch campaigns
  let campaigns = [];
  try {
    const campaignSlugs = await kv.smembers('campaigns:list');
    if (campaignSlugs && campaignSlugs.length > 0) {
      console.log(`\n📋 Found ${campaignSlugs.length} campaigns`);
      for (const slug of campaignSlugs) {
        const campaign = await kv.hgetall(`campaign:${slug}`);
        campaigns.push({ slug, ...campaign });
        console.log(`  ${campaign.name}: ${campaign.scans || 0} scans`);
      }
    }
  } catch (e) {
    console.error('  ❌ Error fetching campaigns:', e.message);
  }

  return { metrics: data, campaigns };
}

/**
 * Save backup to JSON file
 */
function saveBackup(data) {
  const backupPath = path.join(process.cwd(), 'scripts', 'kv-backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
  console.log(`\n💾 Backup saved to: ${backupPath}`);
}

/**
 * Distribute a total across N days
 */
function distributeAcrossDays(total, days) {
  if (days <= 1) return [total];

  const baseValue = Math.floor(total / days);
  const remainder = total % days;
  const distribution = new Array(days).fill(baseValue);

  // Distribute remainder across random days
  for (let i = 0; i < remainder; i++) {
    const randomIndex = Math.floor(Math.random() * days);
    distribution[randomIndex]++;
  }

  return distribution;
}

/**
 * Migrate metrics to Postgres
 */
async function migrateMetrics(metricsData) {
  console.log('\n📊 Migrating metrics to Postgres...');

  const today = new Date();
  const dates = [];

  // Generate dates
  if (spreadDays > 0) {
    for (let i = spreadDays - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
  } else {
    dates.push(today.toISOString().split('T')[0]);
  }

  let totalInserted = 0;

  for (const [metric, total] of Object.entries(metricsData)) {
    if (total === 0) continue;

    const values = distributeAcrossDays(total, dates.length);

    for (let i = 0; i < dates.length; i++) {
      const value = values[i];
      if (value === 0) continue;

      if (!simulate) {
        await prisma.dailyMetric.upsert({
          where: {
            date_metric: {
              date: new Date(dates[i]),
              metric,
            },
          },
          update: {
            value: {
              increment: value,
            },
          },
          create: {
            date: new Date(dates[i]),
            metric,
            value,
          },
        });
      }

      console.log(`  ${dates[i]} | ${metric}: +${value}`);
      totalInserted++;
    }
  }

  console.log(`\n✅ Inserted ${totalInserted} daily metric records`);
}

/**
 * Migrate campaigns to Postgres
 */
async function migrateCampaigns(campaignsData) {
  if (campaignsData.length === 0) {
    console.log('\n📋 No campaigns to migrate');
    return;
  }

  console.log('\n📋 Migrating campaigns to Postgres...');

  for (const campaign of campaignsData) {
    if (!simulate) {
      await prisma.campaign.upsert({
        where: { slug: campaign.slug },
        update: {
          name: campaign.name || campaign.slug,
          destination: campaign.destination || 'https://www.kill-crave.com',
          description: campaign.description || null,
          scans: parseInt(campaign.scans) || 0,
        },
        create: {
          slug: campaign.slug,
          name: campaign.name || campaign.slug,
          destination: campaign.destination || 'https://www.kill-crave.com',
          description: campaign.description || null,
          scans: parseInt(campaign.scans) || 0,
        },
      });
    }

    console.log(`  ✅ ${campaign.name}: ${campaign.scans || 0} scans`);
  }

  console.log(`\n✅ Migrated ${campaignsData.length} campaigns`);
}

/**
 * Main migration function
 */
async function main() {
  try {
    // 1. Fetch KV data
    const kvData = await fetchKVData();

    // 2. Save backup
    saveBackup(kvData);

    // 3. Migrate metrics
    await migrateMetrics(kvData.metrics);

    // 4. Migrate campaigns
    await migrateCampaigns(kvData.campaigns);

    if (simulate) {
      console.log('\n⚠️  DRY RUN COMPLETE - No data was written to database');
      console.log('Run without --simulate to perform actual migration');
    } else {
      console.log('\n🎉 Migration completed successfully!');
      console.log('\nNext steps:');
      console.log('1. Verify data in your analytics dashboard');
      console.log('2. Once validated, you can clean up KV keys if desired');
    }
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
