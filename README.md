# CMJ Performance Dashboard - Baylor University Football

A professional React application for tracking and visualizing Countermovement Jump (CMJ) performance metrics from force plate testing.

## 🏈 Overview

This dashboard helps Baylor University Football coaching staff analyze athlete performance through:
- **5,827 CMJ tests** across **112 athletes**
- Position-based performance analysis
- Individual athlete tracking and trends
- Performance ratings and comparisons

## 🚀 Quick Start

```bash
cd cmj-dashboard-react/cmj-dashboard-react
npm install
npm run dev
```

Visit `http://localhost:5173` to view the dashboard.

## 📦 Production Build

```bash
npm run build
npm run preview
```

The `dist/` folder is ready for deployment to Netlify, Vercel, or any static hosting service.

## 🏗️ Architecture

### Component Structure

```
src/
├── CMJDashboard.jsx          # Main container component
├── main.jsx                  # React entry point
├── components/
│   ├── OverviewView.jsx      # Position selection & top performers
│   ├── CohortView.jsx        # Position roster & statistics
│   ├── AthleteProfileView.jsx # Individual athlete details
│   ├── PerformanceCard.jsx   # Reusable metric cards
│   ├── MetricCard.jsx        # Detailed metric display
│   ├── StatCard.jsx          # Summary statistics
│   ├── TopPerformersList.jsx # Leaderboard component
│   ├── ErrorBoundary.jsx     # Error handling wrapper
│   └── LoadingSpinner.jsx    # Loading state component
└── data/
    └── sampleData.js         # CMJ test data
```

### Key Features

- **Modular Architecture**: Components extracted from 645-line monolith to 10 focused modules
- **Error Handling**: ErrorBoundary prevents crashes and shows user-friendly messages
- **Accessibility**: ARIA labels and semantic HTML for screen readers
- **Performance**: Memoized computations and efficient re-renders
- **Responsive Design**: Mobile-friendly layouts using Tailwind CSS

## 🛠️ Tech Stack

- **React 18.3** - UI framework
- **Vite 5.2** - Build tool (ultra-fast builds)
- **Tailwind CSS 3.4** - Utility-first styling
- **Recharts 2.10** - Interactive charts
- **date-fns 4.1** - Date handling

## 📊 Views

### 1. Overview Dashboard
- Position group selection grid
- Top 5 performers (Jump Height, Peak Power, RSI)
- Position summary comparison table

### 2. Position Cohort Analysis
- Position statistics cards
- Sortable athlete roster
- Performance ratings (Excellent, Good, Average, Monitor, Needs Work)

### 3. Individual Athlete Profile
- Performance metric cards
- Trend charts (if multiple tests)
- Detailed biomechanics (takeoff velocity, contraction time, etc.)
- Complete test history table

## 🎯 Metrics Tracked

- **Jump Height** (cm)
- **Peak Power** (W)
- **Peak Force** (N)
- **RSI-Modified** (reactive strength index)
- **Takeoff Velocity** (m/s)
- **Contraction Time** (ms)
- **Countermovement Depth** (cm)
- **Body Weight** (kg)

## 📝 Recent Improvements

### Code Quality (January 2025)
- ✅ Extracted 10 modular components from monolithic file
- ✅ Added ErrorBoundary for graceful error handling
- ✅ Improved accessibility with ARIA labels
- ✅ Optimized build configuration (esbuild minifier)
- ✅ Repository cleanup (removed 240K lines of duplicates)
- ✅ Separated data layer from presentation

### Performance
- Build time: ~4 seconds
- Bundle size: 553 KB (158 KB gzipped)
- First load: < 1 second

## 🔐 Deployment

### Netlify (Recommended)

```bash
npm run build
# Drag dist/ folder to https://app.netlify.com/drop
```

### GitHub + Netlify Auto-Deploy

1. Push to GitHub
2. Connect repository to Netlify
3. Auto-deploy on every push

See `cmj-dashboard-react/cmj-dashboard-react/NETLIFY_DEPLOY.md` for detailed instructions.

## 📖 Documentation

- `REVIEW_SUMMARY.md` - Code review and quality assessment
- `cmj-dashboard-react/cmj-dashboard-react/START_HERE.md` - Quick deployment guide
- `cmj-dashboard-react/cmj-dashboard-react/DEPLOYMENT_COMPLETE.md` - Comprehensive deployment docs
- `cmj-dashboard-react/cmj-dashboard-react/NETLIFY_DEPLOY.md` - Netlify-specific instructions

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally

### Code Style

- ES6+ JavaScript with modern React patterns
- Functional components with hooks
- Component-level documentation with JSDoc
- Tailwind utility classes for styling

## 📊 Data Format

Sample athlete data structure:

```javascript
{
  name: "Athlete Name",
  position: "S",
  number: "3",
  date: "10/02/2025",
  bw_kg: 78.71,
  rsi_modified: 1.04,
  jump_height_cm: 70.1,
  peak_power: 6782,
  peak_force: 2731,
  takeoff_velocity: 3.71,
  contraction_time: 645,
  countermovement_depth: 39.1,
  tests: 24
}
```

## 🤝 Contributing

This is an internal Baylor University Football tool. For questions or improvements, contact the sports science team.

## 📜 License

Proprietary - Baylor University Football

---

**Built with ❤️ for Baylor University Football**
*Sic 'em Bears!* 🐻
