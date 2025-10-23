# Baylor Branding Updates - Implementation Summary

## ✅ COMPLETED (Committed)

### 1. Color Scheme
- **Baylor Green:** #003015 (primary)
- **Baylor Gold:** #FECB00 (secondary)
- Added to Tailwind config as `baylor-green` and `baylor-gold`

### 2. Typography
- **Primary Font:** Agency FB
- **Fallback:** Helvetica Neue, Helvetica, Arial
- Applied via `font-agency` class

### 3. Emojis Removed
- ✅ Removed from OverviewView ("Top Performers" section)
- ✅ Removed from TopPerformersList (icon parameter)
- Still needed: CohortView, AthleteProfileView, Main Dashboard header

### 4. Position Grouping
- ✅ **Skill/Mid/Big** categorization implemented
  - Skill: QB, RB, WR, CB, S
  - Mid: TE, LB, OLB
  - Big: OL, DL
- ✅ **Offense/Defense** categorization implemented
  - Toggle button added to OverviewView
  - Color-coded by group

### 5. Date Slicer
- ✅ Component created (`DateSlicer.jsx`)
- ✅ Three modes: All Dates, Single Date, Date Range
- Needs integration into main dashboard

### 6. Jersey Numbers
- ✅ Removed from TopPerformers list
- Still needed: Remove from CohortView roster table

### 7. Metric Categorization
- ✅ Defined in `branding.js`:
  - **Output:** jump_height_cm, peak_power, peak_force
  - **Strategy:** rsi_modified, countermovement_depth
  - **Driver:** takeoff_velocity, contraction_time
  - **Asymmetry:** (placeholder for future)
- Needs: Implementation in AthleteProfileView

### 8. Performance Rating System
- ✅ Documented in `branding.js`
- **Rating Logic:**
  - Excellent: >15% above position average
  - Good: 5-15% above average
  - Average: ±5% of average
  - Monitor: 5-15% below average
  - Needs Work: >15% below average

---

## 🔧 REMAINING WORK

### CohortView.jsx Updates Needed:
```javascript
// Remove jersey number from table (line ~446)
// Change from:
<td className="text-center py-4 px-4 text-gray-700 font-medium">#{athlete.number}</td>

// To: Remove this column entirely

// Update colors to Baylor theme:
- Header: bg-baylor-green-50, text-baylor-green
- Hover: hover:bg-baylor-green-50
- Buttons: bg-baylor-gold text-baylor-green-dark
- Stat cards: Use baylor-gold and baylor-green gradients
```

### AthleteProfileView.jsx Updates Needed:
```javascript
// Group metrics by category in UI
// Create sections:
// 1. Output Metrics (Jump, Power, Force)
// 2. Strategy Metrics (RSI, CM Depth)
// 3. Performance Drivers (Velocity, Time)

// Update colors:
- Cards: baylor-gold and baylor-green gradients
- Headers: font-agency, text-baylor-green
- Remove any remaining emojis
```

### CMJDashboard.jsx (Main) Updates Needed:
```javascript
// 1. Update header colors
- Header gradient: from-baylor-green to-baylor-green-dark
- Badges: bg-baylor-gold text-baylor-green

// 2. Integrate DateSlicer component
import DateSlicer from './components/DateSlicer';

// 3. Add date filtering logic
const [dateFilter, setDateFilter] = useState({ mode: 'all' });

// 4. Filter data based on date selection
const filteredByDate = useMemo(() => {
  // Filter logic here
}, [dateFilter, cmjDataFull]);

// 5. Update fonts to font-agency for headers
```

### Logo Integration:
```javascript
// Option 1: Add logo URL to branding.js
export const BAYLOR_LOGO = {
  bear: '/assets/baylor-bear.svg',
  athletics: '/assets/baylor-athletics.png'
};

// Option 2: In header component
<div className="flex items-center gap-4">
  <img src="/assets/baylor-bear.svg" alt="Baylor Bears" className="h-16" />
  <h1 className="text-4xl font-bold font-agency">CMJ Performance Tracker</h1>
</div>
```

---

## 📋 Quick Checklist

- [x] Baylor colors in Tailwind config
- [x] Agency FB font added
- [x] Position grouping (Skill/Mid/Big, Off/Def)
- [x] Date slicer component created
- [x] Emojis removed from OverviewView
- [x] Jersey # removed from TopPerformers
- [x] Metric categories defined
- [x] Performance ratings documented

**Still TODO:**
- [ ] Remove jersey # from CohortView roster
- [ ] Update CohortView colors to Baylor
- [ ] Update AthleteProfileView metric grouping
- [ ] Update main dashboard header
- [ ] Integrate date slicer into dashboard
- [ ] Add Baylor logo to header
- [ ] Remove remaining emojis
- [ ] Test all components
- [ ] Build and verify

---

## 🎨 Color Usage Guide

### Primary Uses:
- **Baylor Green** (#003015):
  - Headers and titles
  - Primary buttons (with gold text)
  - Table headers
  - Border accents

- **Baylor Gold** (#FECB00):
  - Action buttons (with green text)
  - Accent highlights
  - Secondary metrics
  - Hover states

### Example Classes:
```css
/* Headers */
text-baylor-green font-agency font-bold

/* Buttons */
bg-baylor-gold text-baylor-green-dark hover:bg-baylor-gold-dark

/* Borders */
border-baylor-green border-2

/* Backgrounds */
bg-baylor-green-50  /* Light green background */
bg-gradient-to-r from-baylor-green to-baylor-green-dark

/* Text colors */
text-baylor-gold-700  /* Darker gold for readability */
