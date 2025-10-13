# CMJ Performance Dashboard - BUFB 2025

## Your Actual Data Summary

**Total CMJ Tests:** 5,827  
**Unique Athletes:** 112  
**Testing Period:** September - October 2025  
**Data Source:** ForceDecks Force Plate System

### Test Distribution by Position

| Position | Athletes | Total Tests | Position |
Athletes | Total Tests |
|----------|----------|-------------|----------|----------|-------------|
| **S** (Safety) | - | 912 | **CB** (Cornerback) | - | 639 |
| **OL** (Offensive Line) | - | 904 | **DL** (Defensive Line) | - | 742 |
| **TE** (Tight End) | - | 484 | **WR** (Wide Receiver) | - | 452 |
| **LB** (Linebacker) | - | 395 | **QB** (Quarterback) | - | 316 |
| **RB** (Running Back) | - | 315 | **OLB** (Outside Linebacker) | - | 287 |
| **K** (Kicker) | - | 148 | **LS** (Long Snapper) | - | 124 |
| **P** (Punter) | - | 109 | | | |

## Files Included

### Main Dashboard
**📊 cmj_dashboard_bufb.html** - Interactive dashboard with your actual data
- Position and athlete selection
- Individual athlete progression tracking
- Latest test results and trends
- Position group comparisons
- Top performers across all positions

### Cohort Analysis
**👥 cohort_analysis_bufb.html** - Position-specific cohort analysis
- Full athlete roster by position
- Performance distribution charts
- Sortable comparison tables
- Position statistics and rankings

### Data Files
**📁 processed_cmj_data.json** - All 5,827 CMJ tests processed from ForceDecks export
**📁 roster_data.json** - Complete roster with position assignments

### Original Data
**📄 BUFB_forcedecks-test-export-10_08_2025.csv** - Raw ForceDecks export
**📄 2025Roster.csv** - Team roster with positions

## Top Performers Highlights

### Jump Height Leaders
1. **Devyn Bobby** (S #3) - 73.2 cm
2. **Carl Williams** (S #5) - 67.3 cm  
3. **Bo Onu** (S #21) - 66.5 cm
4. **Reggie Bush** (CB #22) - 66.3 cm
5. **Placide Djungu-Sungu** (S #20) - 64.5 cm

### Peak Power Leaders
1. **Kelsey Johnson** (TE #12) - 8,144 W
2. **Joshua Cameron** (WR #34) - 6,474 W
3. **Michael Trigg** (TE #1) - 7,485 W

### RSI-Modified Leaders
1. **Devyn Bobby** (S #3) - 1.04
2. **Leo Almanza** (CB #19) - 1.02
3. **KJ Makins** (CB #14) - 1.01

## How to Use

### 1. Open the Main Dashboard
Open `cmj_dashboard_bufb.html` in your web browser. The dashboard will automatically load your processed data.

### 2. Select a Position
Use the "Position Group" dropdown to filter by position:
- Wide Receivers (WR)
- Safeties (S)
- Cornerbacks (CB)
- And all other positions...

### 3. Select an Athlete
After selecting a position, choose an athlete from the dropdown to see:
- Latest test results
- Performance trends over time
- Test history table
- Progression charts

### 4. View Cohort Analysis
Click "Open Cohort Analysis" to see position-specific analysis:
- Full athlete roster for the position
- Performance distribution charts
- Sortable comparison tables
- Position averages and statistics

## Metrics Included

Your ForceDecks data includes these metrics:

### Primary Metrics
- **Jump Height** - Calculated from impulse-momentum (inches converted to cm)
- **Peak Power** - Maximum power output in Watts
- **Peak Force** - Maximum concentric force in Newtons
- **RSI-modified** - Reactive Strength Index (modified version)

### Secondary Metrics
- **Concentric Impulse** - Force-time integral during concentric phase
- **Contraction Time** - Duration of movement
- **Takeoff Velocity** - Vertical velocity at takeoff
- **Countermovement Depth** - Maximum eccentric displacement
- **Eccentric Duration** - Time spent in eccentric phase
- **Body Weight** - Athlete body weight in kg

### Asymmetry Metrics
- **Concentric Impulse % Asymmetry** - Left/Right imbalance
- **Eccentric Braking Impulse % Asymmetry** - Left/Right imbalance

## Understanding the Data

### Performance Ratings
The dashboard automatically calculates performance ratings by comparing each athlete to their position average:

- **Excellent** - More than 15% above position average
- **Good** - 5-15% above position average  
- **Average** - Within 5% of position average
- **Monitor** - 5-15% below position average
- **Needs Work** - More than 15% below position average

### Trend Analysis
When viewing individual athletes:
- **Green trends** indicate improvement from previous test
- **Red trends** indicate decline from previous test
- Charts show progression over multiple test sessions

### Position Comparisons
The position comparison table shows:
- Average jump height, power, and RSI for each position
- Number of athletes and tests per position
- Useful for identifying position-specific norms

## Data Processing Notes

### What Was Done
1. **Matched roster to CMJ data** - Athletes identified by name
2. **Converted units** - Jump height converted from inches to centimeters
3. **Sorted chronologically** - Tests ordered by date for trend analysis
4. **Calculated averages** - Position and athlete-level statistics
5. **Extracted asymmetries** - Parsed L/R indicators from raw data

### Data Quality
- All 5,827 tests successfully processed
- 112 unique athletes identified and matched to roster
- No missing critical data fields (jump height, power, force)
- Body weight tracked for context

## Technical Details

### Browser Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge recommended)
- JavaScript must be enabled
- No internet connection required after initial load

### Technology Stack
- **TailwindCSS v3** - Styling
- **DaisyUI v5** - UI components  
- **Chart.js** - Interactive visualizations
- **Native JavaScript** - Data processing and interactivity

### File Dependencies
The dashboard requires these files in the same directory:
- `cmj_dashboard_bufb.html`
- `cohort_analysis_bufb.html`
- `processed_cmj_data.json`
- `roster_data.json`

## Insights from Your Data

### Position-Specific Observations

**Skill Positions (WR, RB, DB, S):**
- Highest average jump heights (typically 50-60+ cm for top performers)
- Best RSI-modified scores (>0.90 for elite athletes)
- Lower body weights (typically 75-95 kg)

**Big Skill (TE, LB, QB):**
- Moderate jump heights (45-55 cm range)
- High peak power outputs (often 6,000-8,000+ W)
- Mid-range body weights (95-115 kg)

**Linemen (OL, DL):**
- Lower jump heights (typically 30-45 cm)
- Highest peak forces (often 3,000-4,000+ N)
- Highest body weights (120-170 kg)

### Testing Frequency
Your data shows multiple tests per athlete, allowing for:
- **Trend analysis** - Track improvements or declines over time
- **Load monitoring** - Identify potential fatigue or overtraining
- **Recovery tracking** - Monitor response to training interventions

## Recommendations for Use

### For Strength & Conditioning Coaches
1. **Weekly monitoring** - Track RSI and jump height trends
2. **Position comparisons** - Set position-specific goals and standards
3. **Fatigue detection** - Watch for declining RSI or power outputs
4. **Return to play** - Compare post-injury to baseline values

### For Sports Scientists  
1. **Normative data** - Use position averages to establish norms
2. **Correlation studies** - Analyze relationships between metrics
3. **Periodization** - Track responses to training blocks
4. **Individual profiling** - Identify athlete-specific characteristics

### For Medical Staff
1. **Baseline testing** - Pre-season or pre-injury baselines
2. **Asymmetry monitoring** - Identify >10% imbalances for assessment
3. **Progress tracking** - Quantify rehab progression
4. **RTP criteria** - Use as objective return-to-play metrics

## Export and Reporting

### Current Functionality
- Position-specific cohort tables
- Individual athlete test histories
- Performance trend charts

### Future Enhancements
- PDF report generation
- CSV exports for external analysis
- Longitudinal tracking across seasons
- Integration with other performance metrics

## Support and Questions

### Data Questions
- Raw data is preserved in original CSV files
- Processing script available in outputs directory
- All calculations are transparent and reproducible

### Technical Support
- Dashboard is standalone HTML/JavaScript
- No server or database required
- Can be hosted on any web server or used locally

## Version History

**Version 1.0** - October 2025
- Initial release with BUFB 2025 data
- Individual athlete analysis
- Position cohort analysis
- Interactive visualizations
- 5,827 tests from 112 athletes

---

**Note:** This dashboard uses actual force plate data from your BUFB team. All athlete data should be handled in accordance with institutional privacy policies and FERPA regulations.
