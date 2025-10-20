# 📊 CMJ Data Pipeline

Automated system for ingesting daily CMJ test data into the dashboard.

## 🚀 Quick Start

### Daily Workflow (Recommended)

1. **Export today's tests** from your force plate software to JSON
2. **Drag the file** into `data-pipeline/incoming/` folder
3. **Run the ingestion:**
   ```bash
   npm run ingest-data
   ```
4. **Deploy updates:**
   ```bash
   npm run deploy-data
   ```

That's it! Dashboard updates in ~2 minutes.

---

## 📁 Folder Structure

```
data-pipeline/
├── incoming/          # Drop new data files here
├── processed/         # Auto-archived after processing
├── ingest.js         # Main ingestion script
├── watch.js          # Auto-watcher (optional)
└── README.md         # This file
```

---

## 🔧 Available Commands

### `npm run ingest-data`
Processes all `.json` files in `incoming/` folder:
- Reads new test data
- Appends to master dataset
- Removes duplicates (by athlete + date)
- Moves files to `processed/` folder

### `npm run watch-data`
Starts file watcher for automatic processing:
- Monitors `incoming/` folder
- Auto-processes new files when dropped
- Runs continuously until stopped (Ctrl+C)

### `npm run deploy-data`
One-command deploy:
- Ingests new data
- Commits changes
- Pushes to GitHub
- Netlify auto-deploys

---

## 📋 Data Format

Your exported JSON should be an array of test objects:

```json
[
  {
    "name": "Athlete Name",
    "position": "S",
    "number": "3",
    "date": "01/20/2025",
    "bw_kg": 78.71,
    "rsi_modified": 1.04,
    "jump_height_cm": 70.1,
    "peak_power": 6782,
    "peak_force": 2731,
    "takeoff_velocity": 3.71,
    "contraction_time": 645,
    "countermovement_depth": 39.1,
    "tests": 24
  }
]
```

**Required fields:**
- `name` - Athlete name (string)
- `position` - Position code (string)
- `number` - Jersey number (string)
- `date` - Test date in MM/DD/YYYY format (string)
- All metric fields (numbers)

---

## 🎯 Workflows

### Option 1: Manual (Safest)

Best for weekly/monthly updates:

```bash
# 1. Drop files into incoming/
# 2. Process them
npm run ingest-data

# 3. Test locally
npm run dev

# 4. Deploy when ready
git add .
git commit -m "Data: Add CMJ tests from [date]"
git push origin main
```

### Option 2: Automated (Fastest)

Best for daily updates:

```bash
# Start the watcher (keeps running)
npm run watch-data

# In another terminal or just drop files
# Files auto-process when added to incoming/

# Deploy with one command
npm run deploy-data
```

### Option 3: Fully Automated (Advanced)

For true hands-off automation, set up:
1. Scheduled task to export data
2. Auto-move files to `incoming/`
3. Cron job or GitHub Action to run ingestion
4. Auto-deploy on schedule

*(See Advanced Setup below)*

---

## ✨ Features

### Automatic Deduplication
- Detects duplicates by: `athlete name + position + date`
- Skips existing tests automatically
- Shows summary of new vs. duplicate tests

### Smart File Handling
- Processes only `.json` files
- Archives to `processed/` with timestamp
- Handles multiple file formats:
  - Simple array: `[test1, test2, ...]`
  - Wrapped object: `{ "tests": [...] }`

### Error Handling
- Validates JSON structure
- Reports parsing errors
- Continues processing other files if one fails

---

## 📊 Example Usage

```bash
$ npm run ingest-data

🚀 CMJ Data Ingestion Pipeline

==================================================

📂 Found 2 file(s) to process

📊 Current master dataset: 30 tests

📄 Processing: daily_export_2025-01-20.json
   ✓ Added 15 new test(s)
   ⚠ Skipped 2 duplicate(s)
   ✓ Moved to processed/

📄 Processing: morning_session_2025-01-21.json
   ✓ Added 8 new test(s)
   ✓ Moved to processed/

✅ Master dataset updated!
   Total tests: 30 → 53 (+23)

==================================================

✨ Done!

📝 Next steps:
   1. Test locally: npm run dev
   2. Commit changes: git add . && git commit -m "Data: Add new CMJ tests"
   3. Deploy: git push origin main

   Or run: npm run deploy-data
```

---

## 🔐 Security Notes

- Don't commit large files to git (>10MB)
- Keep `processed/` folder in `.gitignore`
- Back up raw data separately
- Consider privacy for athlete data

---

## 🐛 Troubleshooting

### "Could not parse cmjDataFull"
- Check that `src/data/sampleData.js` has correct format
- Ensure `export const cmjDataFull = [...]` exists

### "Invalid format in [file]"
- Verify JSON is valid (use jsonlint.com)
- Check that structure matches expected format
- Ensure all required fields are present

### "No new files to process"
- Check files are in `incoming/` folder
- Ensure files have `.json` extension
- Verify permissions (read/write access)

### Duplicates not detected
- Check date format is MM/DD/YYYY
- Verify name spelling is consistent
- Position codes must match exactly

---

## 🚀 Advanced Setup

### GitHub Actions Auto-Deploy

Create `.github/workflows/data-update.yml`:

```yaml
name: Auto-Deploy Data Updates

on:
  push:
    paths:
      - 'src/data/sampleData.js'
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      # Netlify deploys automatically via webhook
```

### Scheduled Data Sync

Run ingestion daily at 8 AM:

```yaml
on:
  schedule:
    - cron: '0 8 * * *'  # 8 AM UTC daily

jobs:
  sync-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run ingest-data
      - run: git add . && git commit -m "Data: Daily sync" && git push
```

---

## 📞 Support

Questions about the pipeline?
- Check data format in `EXAMPLE_daily_export_2025-01-20.json`
- Review main data guide in `/DATA_UPDATE_GUIDE.md`
- Test with example file first

---

**Happy data ingesting!** 📈
