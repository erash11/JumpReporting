# 🚀 Quick Data Update Workflow

## Your New Daily Routine (30 seconds!)

### Step 1: Export from Force Plate
- Run your daily CMJ tests as normal
- Export results to JSON format
- Save file (name doesn't matter, e.g., `daily_tests.json`)

### Step 2: Drop & Process
```bash
# Navigate to your project
cd cmj-dashboard-react/cmj-dashboard-react

# Drop your JSON file into:
data-pipeline/incoming/

# Process it
npm run ingest-data
```

### Step 3: Deploy
```bash
# One command to deploy everything
npm run deploy-data
```

**Done!** Dashboard updates in ~2 minutes on Netlify.

---

## Even Faster: Auto-Watch Mode

Run once, leave it running:
```bash
npm run watch-data
```

Now just **drag files to `incoming/`** folder - they auto-process! 🎉

---

## What Happens Behind the Scenes

1. ✅ Script reads your new test data
2. ✅ Appends to master dataset (`src/data/sampleData.js`)
3. ✅ Removes duplicates (same athlete + date)
4. ✅ Archives processed file to `processed/` folder
5. ✅ Commits changes to git
6. ✅ Pushes to GitHub
7. ✅ Netlify auto-deploys

---

## Example Data File Format

Your exported JSON should look like this:

```json
[
  {
    "name": "John Smith",
    "position": "WR",
    "number": "11",
    "date": "01/20/2025",
    "bw_kg": 85.5,
    "rsi_modified": 0.95,
    "jump_height_cm": 62.3,
    "peak_power": 6850,
    "peak_force": 2680,
    "takeoff_velocity": 3.50,
    "contraction_time": 655,
    "countermovement_depth": 35.2,
    "tests": 15
  }
]
```

See `data-pipeline/incoming/EXAMPLE_daily_export_2025-01-20.json` for full example.

---

## Troubleshooting

**Files not processing?**
- Check file extension is `.json`
- Verify JSON is valid at jsonlint.com
- Run `npm run ingest-data` manually to see errors

**Duplicates appearing?**
- Dates must be in MM/DD/YYYY format
- Athlete names must match exactly
- Position codes must be consistent

**Dashboard not updating?**
- Check Netlify deploy status
- Verify git push succeeded: `git status`
- Try manual deploy: `npm run deploy-data`

---

## Full Documentation

- **Data Pipeline Details:** `data-pipeline/README.md`
- **General Data Guide:** `/DATA_UPDATE_GUIDE.md`
- **Project README:** `/README.md`

---

**Questions?** Check the detailed guides above! 📚
