# Data Update Guide

## How to Update Athlete Data

### Quick Method (Current Setup)

1. **Export data from force plate software** to JSON format
2. **Update the data file:**
   - Edit `src/data/sampleData.js`
   - Replace the `cmjDataFull` array with new data
3. **Rebuild:**
   ```bash
   npm run build
   ```
4. **Deploy:**
   ```bash
   git add .
   git commit -m "Update: Add new CMJ test data"
   git push origin main
   ```
5. Netlify auto-deploys in ~2 minutes

### Data Format Required

Each test entry should follow this structure:

```javascript
{
  name: "Athlete Name",          // String
  position: "S",                 // Position code (S, CB, WR, etc.)
  number: "3",                   // Jersey number
  date: "10/02/2025",           // Test date (MM/DD/YYYY)
  bw_kg: 78.71,                 // Body weight in kg
  rsi_modified: 1.04,           // RSI-modified value
  jump_height_cm: 70.1,         // Jump height in cm
  peak_power: 6782,             // Peak power in watts
  peak_force: 2731,             // Peak force in newtons
  takeoff_velocity: 3.71,       // Takeoff velocity in m/s
  contraction_time: 645,        // Contraction time in ms
  countermovement_depth: 39.1,  // CM depth in cm
  tests: 24                     // Total tests for this athlete
}
```

## Future: Automated Updates (Advanced)

### Google Sheets Integration

1. Create Google Sheet with columns matching data format
2. Use Google Sheets API or publish as CSV
3. App fetches on load - no rebuild needed

### Backend API (Professional)

For high-frequency updates or multiple users:
1. Set up database (MongoDB/PostgreSQL)
2. Create admin interface for data entry
3. API endpoints for dashboard to fetch data
4. Real-time updates

## Best Practices

### Data Organization
- Keep backups of all JSON files
- Use date-stamped filenames: `cmj_data_2025_01_20.json`
- Version control all changes in git

### Update Frequency
- **Daily updates:** Use Google Sheets or API
- **Weekly updates:** JSON file method is fine
- **Monthly updates:** Any method works

### Data Validation
Before deploying, verify:
- All required fields present
- No null/undefined values
- Dates in correct format
- Numbers are numeric (not strings)

### Testing Updates
```bash
# Test locally first
npm run dev

# Check for errors in console
# Verify new data appears correctly

# Then build and deploy
npm run build
npm run preview  # Preview production build
git push origin main
```

## Need Help?

- Check data format in `src/data/sampleData.js`
- Ensure JSON is valid: https://jsonlint.com
- Test locally before pushing to production
