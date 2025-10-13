# BUFB CMJ Dashboard - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Open the Main Dashboard
**File:** `cmj_dashboard_bufb.html`

Double-click to open in your web browser. The dashboard will automatically load with all 5,827 tests from your 112 athletes.

### Step 2: Select Your View
**Choose a position** from the dropdown → **Then select an athlete**

Example:
1. Select "S - Safety" 
2. Select "Devyn Bobby (#3)"
3. View his performance trends and latest test results

### Step 3: Explore the Data
- **View individual progression** - Charts show jump height and power over time
- **Check recent tests** - Table shows latest 10 test sessions
- **Open cohort analysis** - Click button to see full position comparison

---

## 📊 What You'll See

### Main Dashboard Features

**Top Section:**
- **Position Selector** - Filter by any position (WR, S, CB, RB, etc.)
- **Athlete Selector** - Choose specific athlete to analyze
- **Top Performers** - Quick view of position leaders

**Individual Athlete View:**
- **Latest Test Results** - Most recent jump height, power, RSI, body weight
- **Trend Indicators** - % change from previous test
- **Progression Charts** - Visual tracking over multiple tests
- **Test History Table** - Detailed results from recent sessions

**Position Comparison:**
- **Summary Table** - Compare all positions
- **Averages** - Jump height, peak power, RSI by position
- **Athlete Counts** - Number of athletes and tests per position

---

## 👥 Cohort Analysis Window

**File:** `cohort_analysis_bufb.html`  
**Opens:** Via "Open Cohort Analysis" button or directly

### What It Shows:
1. **Position Statistics**
   - Total athletes in position
   - Total tests conducted
   - Position averages

2. **Distribution Chart**
   - Histogram showing spread of jump heights
   - Identify high/low performers visually

3. **Full Athlete Table**
   - Every athlete in selected position
   - Sortable by any metric
   - Performance ratings (Excellent/Good/Average/Monitor/Needs Work)

4. **Top Performers**
   - Highest jump in position
   - Highest power output
   - Highest RSI

### How to Use:
1. Select a position from dropdown
2. View full roster with latest tests
3. Sort by different metrics using sort dropdown
4. Identify athletes needing attention

---

## 📈 Your Top Athletes

### Jump Height Champions
| Athlete | Position | Jump Height |
|---------|----------|-------------|
| Devyn Bobby | S #3 | 73.2 cm |
| Carl Williams | S #5 | 67.3 cm |
| Bo Onu | S #21 | 66.5 cm |
| Reggie Bush | CB #22 | 66.3 cm |

### Power Output Leaders  
| Athlete | Position | Peak Power |
|---------|----------|------------|
| Kelsey Johnson | TE #12 | 8,144 W |
| Joshua Cameron | WR #34 | 6,474 W |
| Michael Trigg | TE #1 | 7,485 W |

### Reactive Strength (RSI) Leaders
| Athlete | Position | RSI |
|---------|----------|-----|
| Devyn Bobby | S #3 | 1.04 |
| Leo Almanza | CB #19 | 1.02 |
| KJ Makins | CB #14 | 1.01 |

---

## 🎯 Common Use Cases

### Scenario 1: Monitor Weekly Progress
**Goal:** Track if training is improving jump performance

**Steps:**
1. Select athlete in main dashboard
2. View progression charts
3. Look for upward trend in jump height
4. Check if RSI is stable or improving

**What to look for:**
- ✅ Gradual increase in jump height (5-10% over weeks)
- ✅ Stable or increasing RSI
- ⚠️ Declining RSI = potential fatigue

---

### Scenario 2: Identify At-Risk Athletes
**Goal:** Find athletes who may be overtraining or injured

**Steps:**
1. Open cohort analysis
2. Select position group
3. Sort by "Latest RSI" (lowest first)
4. Look for athletes with low RSI and/or asymmetry issues

**Warning signs:**
- 🔴 RSI drop >10% from baseline
- 🔴 Jump height decline with no injury
- 🔴 High asymmetry (>10%)

---

### Scenario 3: Position Group Benchmarking
**Goal:** Set position-specific standards

**Steps:**
1. Open cohort analysis
2. Select position (e.g., WR)
3. Note the position averages at top
4. Use these as benchmarks for incoming players

**Position Averages (Examples):**
- **WR:** ~50-55 cm jump, 5,000-6,000 W power
- **S:** ~55-60 cm jump, 5,500-6,500 W power  
- **OL:** ~35-40 cm jump, 7,000-8,000 W power

---

### Scenario 4: Return to Play Assessment
**Goal:** Determine if injured athlete is ready to return

**Steps:**
1. Find athlete's pre-injury baseline tests
2. Compare to current test
3. Check three criteria:
   - Jump height >90% of baseline
   - RSI >90% of baseline
   - Asymmetry <10%

**Example:**
Pre-injury: 60 cm jump, 0.85 RSI, 5% asymmetry  
Current: 56 cm jump, 0.78 RSI, 8% asymmetry  
**Decision:** Not ready - all metrics need improvement

---

## 📋 Performance Rating System

The dashboard automatically assigns ratings:

| Rating | Meaning | % vs Position Avg |
|--------|---------|-------------------|
| 🟢 **Excellent** | Elite performer | >15% above |
| 🔵 **Good** | Above average | 5-15% above |
| ⚪ **Average** | At position norm | ±5% |
| 🟡 **Monitor** | Needs attention | 5-15% below |
| 🔴 **Needs Work** | Requires intervention | >15% below |

---

## ⚠️ Key Metrics to Monitor

### Daily/Weekly Monitoring:
1. **RSI-modified** - Most sensitive to fatigue
2. **Jump Height** - Overall performance indicator

### Monthly Assessment:
1. **Peak Power** - Strength training effectiveness
2. **Asymmetry** - Injury risk screening

### Quarterly Review:
1. **Full metric battery** - Comprehensive profiling
2. **Position comparisons** - Benchmarking

---

## 💡 Pro Tips

### Tip 1: Test Consistently
✅ Same time of day  
✅ Same warm-up protocol  
✅ Record in same condition (not after practice)

### Tip 2: Look for Patterns, Not Single Tests
- One bad test ≠ problem
- Consistent decline over 2-3 tests = investigate
- Compare to athlete's own baseline, not just position average

### Tip 3: Context Matters
Ask these questions:
- Recent practice intensity?
- Body weight change?
- Sleep quality?
- Recent injury/illness?

### Tip 4: Use Position-Specific Norms
Don't compare a lineman's jump height to a defensive back's. Use the position comparison table to set appropriate expectations.

### Tip 5: Track Asymmetry Trends
Small asymmetries (<10%) are normal, but watch for:
- Sudden increases
- Consistent one-sided patterns
- Post-injury asymmetries that don't resolve

---

## 🔧 Troubleshooting

### Problem: Charts not loading
**Solution:** Ensure `processed_cmj_data.json` is in the same folder as the HTML files

### Problem: No athletes showing after selecting position
**Solution:** Make sure you selected a position first, then refresh athlete dropdown

### Problem: Data seems incorrect
**Solution:** Check that you're viewing the latest test (not an old one from weeks ago)

---

## 📁 File Structure

Keep these files together in one folder:

```
CMJ_Dashboard/
├── cmj_dashboard_bufb.html          ← Main dashboard (START HERE)
├── cohort_analysis_bufb.html        ← Position group analysis
├── processed_cmj_data.json          ← Your 5,827 tests (auto-loaded)
├── roster_data.json                 ← Athlete roster (auto-loaded)
├── README_BUFB.md                   ← Full documentation
├── METRICS_REFERENCE.md             ← Metrics explained
└── QUICK_START.md                   ← This guide
```

---

## 📞 Next Steps

### For Strength Coaches:
1. Set position-specific benchmarks using cohort data
2. Create weekly monitoring protocols using RSI
3. Identify athletes needing extra attention

### For Sports Scientists:
1. Analyze correlations between metrics
2. Track training block responses
3. Establish periodization strategies

### For Medical Staff:
1. Create return-to-play protocols
2. Monitor asymmetry trends
3. Integrate with injury database

---

## 🎓 Learning Resources

**In This Package:**
- `README_BUFB.md` - Complete documentation
- `METRICS_REFERENCE.md` - Every metric explained in detail

**External Resources:**
- ForceDecks User Manual
- NSCA Vertical Jump Testing Guidelines
- Research papers on RSI and CMJ testing

---

## ✅ Success Checklist

**First Time Setup:**
- [ ] Open `cmj_dashboard_bufb.html` in browser
- [ ] Verify data loads (should see "5,827 Total Tests")
- [ ] Select a position and athlete
- [ ] View progression charts
- [ ] Open cohort analysis window

**Weekly Use:**
- [ ] Check newly tested athletes
- [ ] Review RSI trends for fatigue
- [ ] Identify athletes with declining performance
- [ ] Update training programs based on data

**Monthly Review:**
- [ ] Run cohort analysis for each position
- [ ] Update position norms if needed
- [ ] Identify top performers to highlight
- [ ] Address athletes needing intervention

---

## 🎯 Key Takeaways

1. **Your dashboard contains 5,827 real CMJ tests** from 112 BUFB athletes
2. **Two main views:** Individual athlete tracking + Position cohort analysis
3. **Watch RSI and asymmetry** for early warning signs
4. **Compare to position averages**, not just team averages
5. **Trends matter more than single tests**

---

**Questions?** Refer to `README_BUFB.md` for detailed documentation or `METRICS_REFERENCE.md` for metric definitions.

**Ready to start?** Open `cmj_dashboard_bufb.html` and select your first athlete!
