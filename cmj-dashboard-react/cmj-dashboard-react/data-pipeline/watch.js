#!/usr/bin/env node

/**
 * CMJ Data Pipeline File Watcher
 *
 * Automatically watches for new files in the incoming/ folder
 * and processes them immediately
 *
 * Usage:
 *   npm run watch-data
 *
 * Features:
 *   - Watches data-pipeline/incoming/ for new .json files
 *   - Auto-processes new files when detected
 *   - Appends to master dataset
 *   - Removes duplicates
 *   - Optional: Auto-commit and deploy
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const INCOMING_DIR = path.join(__dirname, 'incoming');

console.log('👀 CMJ Data Pipeline - File Watcher\n');
console.log('Watching:', INCOMING_DIR);
console.log('Drop JSON files here to auto-process\n');
console.log('Press Ctrl+C to stop\n');

// Ensure incoming directory exists
if (!fs.existsSync(INCOMING_DIR)) {
  fs.mkdirSync(INCOMING_DIR, { recursive: true });
  console.log('✓ Created incoming directory\n');
}

// Track recently processed files to avoid duplicate processing
const recentlyProcessed = new Set();

/**
 * Run the ingestion script
 */
function runIngestion() {
  return new Promise((resolve, reject) => {
    const ingest = spawn('node', [path.join(__dirname, 'ingest.js')], {
      stdio: 'inherit'
    });

    ingest.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Ingestion failed with code ${code}`));
      }
    });
  });
}

/**
 * Process file when detected
 */
async function handleNewFile(filename) {
  // Skip if not JSON or recently processed
  if (!filename.endsWith('.json')) return;
  if (recentlyProcessed.has(filename)) return;

  console.log(`\n📥 New file detected: ${filename}`);
  console.log('⏳ Processing...\n');

  recentlyProcessed.add(filename);

  // Small delay to ensure file is fully written
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    await runIngestion();
    console.log(`\n✅ Successfully processed ${filename}`);

    // Clean up tracking after 10 seconds
    setTimeout(() => {
      recentlyProcessed.delete(filename);
    }, 10000);

  } catch (error) {
    console.error(`\n❌ Error processing ${filename}:`, error.message);
    recentlyProcessed.delete(filename);
  }

  console.log('\n👀 Watching for more files...\n');
}

// Watch for new files
fs.watch(INCOMING_DIR, (eventType, filename) => {
  if (eventType === 'rename' && filename) {
    const filepath = path.join(INCOMING_DIR, filename);

    // Check if file exists (rename can mean added or deleted)
    if (fs.existsSync(filepath)) {
      handleNewFile(filename);
    }
  }
});

// Process any existing files on startup
const existingFiles = fs.readdirSync(INCOMING_DIR).filter(f => f.endsWith('.json'));
if (existingFiles.length > 0) {
  console.log(`📂 Found ${existingFiles.length} existing file(s)\n`);
  runIngestion().catch(err => {
    console.error('❌ Error processing existing files:', err.message);
  });
}

console.log('✓ Watcher is running');
console.log('✓ Drop .json files into data-pipeline/incoming/ to process\n');

// Keep process alive
process.stdin.resume();
