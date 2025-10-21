#!/usr/bin/env node

/**
 * Script de nettoyage des données analytics anciennes
 *
 * Usage:
 *   node scripts/cleanup-old-data.mjs --before=2025-10-18 [--dry-run]
 *
 * Options:
 *   --before=YYYY-MM-DD  Supprimer les données avant cette date
 *   --dry-run            Afficher ce qui serait supprimé sans supprimer
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Parse command line arguments
const args = process.argv.slice(2);
const beforeDateArg = args.find(arg => arg.startsWith('--before='));
const dryRun = args.includes('--dry-run');

if (!beforeDateArg) {
  console.error('❌ Error: --before=YYYY-MM-DD is required');
  console.log('\nUsage: node scripts/cleanup-old-data.mjs --before=2025-10-18 [--dry-run]');
  process.exit(1);
}

const beforeDate = beforeDateArg.split('=')[1];

// Validate date format
if (!/^\d{4}-\d{2}-\d{2}$/.test(beforeDate)) {
  console.error('❌ Error: Invalid date format. Use YYYY-MM-DD');
  process.exit(1);
}

const cutoffDate = new Date(beforeDate);

console.log('🗑️  Nettoyage des données analytics anciennes\n');
console.log(`Options:`);
console.log(`  Date limite: ${beforeDate}`);
console.log(`  Mode: ${dryRun ? 'DRY RUN (simulation)' : 'SUPPRESSION RÉELLE'}\n`);

async function cleanup() {
  try {
    // Count records to be deleted
    const dailyMetricsCount = await prisma.dailyMetric.count({
      where: {
        date: {
          lt: cutoffDate,
        },
      },
    });

    const rawEventsCount = await prisma.rawEvent.count({
      where: {
        timestamp: {
          lt: cutoffDate,
        },
      },
    });

    console.log('📊 Données à supprimer:');
    console.log(`  DailyMetric: ${dailyMetricsCount} enregistrements`);
    console.log(`  RawEvent: ${rawEventsCount} enregistrements`);
    console.log();

    if (dailyMetricsCount === 0 && rawEventsCount === 0) {
      console.log('✅ Aucune donnée à supprimer');
      return;
    }

    if (dryRun) {
      console.log('⚠️  DRY RUN - Aucune donnée supprimée');
      console.log('Exécutez sans --dry-run pour supprimer réellement les données');
      return;
    }

    // Delete DailyMetrics
    console.log('🗑️  Suppression des DailyMetric...');
    const deletedMetrics = await prisma.dailyMetric.deleteMany({
      where: {
        date: {
          lt: cutoffDate,
        },
      },
    });
    console.log(`  ✅ ${deletedMetrics.count} DailyMetric supprimés`);

    // Delete RawEvents
    console.log('🗑️  Suppression des RawEvent...');
    const deletedEvents = await prisma.rawEvent.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate,
        },
      },
    });
    console.log(`  ✅ ${deletedEvents.count} RawEvent supprimés`);

    console.log();
    console.log('🎉 Nettoyage terminé avec succès!');
    console.log(`\nRésumé:`);
    console.log(`  - ${deletedMetrics.count} métriques journalières supprimées`);
    console.log(`  - ${deletedEvents.count} événements bruts supprimés`);
    console.log(`  - Date limite: avant le ${beforeDate}`);

  } catch (error) {
    console.error('\n❌ Erreur lors du nettoyage:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup();
