#!/usr/bin/env node

/**
 * CMJ Data Ingestion Script
 *
 * Automatically processes new test data files and appends to master dataset
 *
 * Usage:
 *   npm run ingest-data
 *
 * Workflow:
 *   1. Drop new JSON files into data-pipeline/incoming/
 *   2. Run this script (or set up auto-watch)
 *   3. Script appends new tests to master dataset
 *   4. Removes duplicates based on athlete name + date
 *   5. Moves processed files to data-pipeline/processed/
 */

const fs = require('fs');
const path = require('path');

// Paths
const INCOMING_DIR = path.join(__dirname, 'incoming');
const PROCESSED_DIR = path.join(__dirname, 'processed');
const MASTER_DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'sampleData.js');

// Ensure directories exist
[INCOMING_DIR, PROCESSED_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * Parse the current master dataset from sampleData.js
 */
function readMasterData() {
  const content = fs.readFileSync(MASTER_DATA_FILE, 'utf8');

  // Extract the cmjDataFull array using regex
  const match = content.match(/export const cmjDataFull = \[([\s\S]*?)\];/);
  if (!match) {
    throw new Error('Could not parse cmjDataFull from sampleData.js');
  }

  // Parse the array (note: this uses eval which is safe here since we control the source)
  const arrayContent = `[${match[1]}]`;
  return eval(arrayContent);
}

/**
 * Write updated data back to sampleData.js
 */
function writeMasterData(data) {
  const content = fs.readFileSync(MASTER_DATA_FILE, 'utf8');

  // Format the data array nicely
  const formattedData = data.map(test =>
    `  ${JSON.stringify(test)}`
  ).join(',\n');

  // Replace the cmjDataFull array
  const newContent = content.replace(
    /export const cmjDataFull = \[[\s\S]*?\];/,
    `export const cmjDataFull = [\n${formattedData}\n];`
  );

  fs.writeFileSync(MASTER_DATA_FILE, newContent, 'utf8');
}

/**
 * Create a unique key for deduplication
 */
function createTestKey(test) {
  return `${test.name}-${test.position}-${test.date}`;
}

/**
 * Process incoming data files
 */
function processIncomingFiles() {
  const files = fs.readdirSync(INCOMING_DIR).filter(f => f.endsWith('.json'));

  if (files.length === 0) {
    console.log('✓ No new files to process');
    return 0;
  }

  console.log(`\n📂 Found ${files.length} file(s) to process\n`);

  // Read current master data
  let masterData = readMasterData();
  const originalCount = masterData.length;
  console.log(`📊 Current master dataset: ${originalCount} tests`);

  // Create a Set of existing test keys for deduplication
  const existingKeys = new Set(masterData.map(createTestKey));

  let totalNewTests = 0;
  let totalDuplicates = 0;

  // Process each file
  files.forEach(filename => {
    const filepath = path.join(INCOMING_DIR, filename);
    console.log(`\n📄 Processing: ${filename}`);

    try {
      const fileContent = fs.readFileSync(filepath, 'utf8');
      const newData = JSON.parse(fileContent);

      // Handle different JSON structures
      let tests = [];
      if (Array.isArray(newData)) {
        tests = newData;
      } else if (newData.tests && Array.isArray(newData.tests)) {
        tests = newData.tests;
      } else {
        console.error(`   ❌ Invalid format in ${filename}`);
        return;
      }

      let newCount = 0;
      let dupCount = 0;

      // Add new tests, skip duplicates
      tests.forEach(test => {
        const key = createTestKey(test);
        if (!existingKeys.has(key)) {
          masterData.push(test);
          existingKeys.add(key);
          newCount++;
        } else {
          dupCount++;
        }
      });

      totalNewTests += newCount;
      totalDuplicates += dupCount;

      console.log(`   ✓ Added ${newCount} new test(s)`);
      if (dupCount > 0) {
        console.log(`   ⚠ Skipped ${dupCount} duplicate(s)`);
      }

      // Move file to processed
      const processedPath = path.join(PROCESSED_DIR, `${Date.now()}_${filename}`);
      fs.renameSync(filepath, processedPath);
      console.log(`   ✓ Moved to processed/`);

    } catch (error) {
      console.error(`   ❌ Error processing ${filename}:`, error.message);
    }
  });

  // Write updated master data
  if (totalNewTests > 0) {
    writeMasterData(masterData);
    console.log(`\n✅ Master dataset updated!`);
    console.log(`   Total tests: ${originalCount} → ${masterData.length} (+${totalNewTests})`);
  } else {
    console.log(`\n✓ No new tests to add (${totalDuplicates} duplicates skipped)`);
  }

  return totalNewTests;
}

/**
 * Main execution
 */
console.log('🚀 CMJ Data Ingestion Pipeline\n');
console.log('=' .repeat(50));

try {
  const newTests = processIncomingFiles();

  console.log('\n' + '='.repeat(50));
  console.log('\n✨ Done!\n');

  if (newTests > 0) {
    console.log('📝 Next steps:');
    console.log('   1. Test locally: npm run dev');
    console.log('   2. Commit changes: git add . && git commit -m "Data: Add new CMJ tests"');
    console.log('   3. Deploy: git push origin main');
    console.log('\n   Or run: npm run deploy-data (if configured)\n');
  }

  process.exit(0);

} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
