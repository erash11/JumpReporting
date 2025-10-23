/**
 * Baylor University Branding Configuration
 *
 * Official Baylor Colors:
 * - Baylor Green: #003015 (primary)
 * - Baylor Gold: #FECB00 (secondary)
 * - White: #FFFFFF
 */

export const BAYLOR_COLORS = {
  green: {
    primary: '#003015',
    dark: '#002010',
    light: '#004020',
    50: '#e6f0eb',
    100: '#cce1d7',
    200: '#99c3af',
    300: '#66a587',
    400: '#33875f',
    500: '#003015',
    600: '#002713',
    700: '#001e0f',
    800: '#00140b',
    900: '#000a05'
  },
  gold: {
    primary: '#FECB00',
    dark: '#E5B700',
    light: '#FFD633',
    50: '#fffaeb',
    100: '#fff5d6',
    200: '#ffebad',
    300: '#fee185',
    400: '#fed75c',
    500: '#FECB00',
    600: '#e5b700',
    700: '#cca300',
    800: '#b38f00',
    900: '#997b00'
  }
};

/**
 * Position Group Categories
 */
export const POSITION_GROUPS = {
  // By Offense/Defense
  byUnit: {
    offense: {
      name: 'Offense',
      positions: ['QB', 'RB', 'WR', 'TE', 'OL'],
      color: BAYLOR_COLORS.gold.primary
    },
    defense: {
      name: 'Defense',
      positions: ['DL', 'LB', 'OLB', 'CB', 'S'],
      color: BAYLOR_COLORS.green.primary
    }
  },

  // By Body Type/Role
  byType: {
    skill: {
      name: 'Skill Positions',
      positions: ['QB', 'RB', 'WR', 'CB', 'S'],
      color: BAYLOR_COLORS.gold.primary,
      description: 'Speed and agility focused'
    },
    mid: {
      name: 'Mid-Size',
      positions: ['TE', 'LB', 'OLB'],
      color: BAYLOR_COLORS.gold[700],
      description: 'Hybrid size and athleticism'
    },
    big: {
      name: 'Big Bodies',
      positions: ['OL', 'DL'],
      color: BAYLOR_COLORS.green.primary,
      description: 'Size and power focused'
    }
  }
};

/**
 * Metric Categories
 */
export const METRIC_CATEGORIES = {
  output: {
    name: 'Output Metrics',
    description: 'Raw performance and power output',
    metrics: ['jump_height_cm', 'peak_power', 'peak_force'],
    color: BAYLOR_COLORS.gold.primary,
    icon: 'chart-bar'
  },
  strategy: {
    name: 'Strategy Metrics',
    description: 'Movement efficiency and technique',
    metrics: ['rsi_modified', 'countermovement_depth'],
    color: BAYLOR_COLORS.green.primary,
    icon: 'brain'
  },
  driver: {
    name: 'Performance Drivers',
    description: 'Underlying biomechanical factors',
    metrics: ['takeoff_velocity', 'contraction_time'],
    color: BAYLOR_COLORS.gold[700],
    icon: 'engine'
  },
  asymmetry: {
    name: 'Asymmetry & Balance',
    description: 'Left/right balance metrics',
    metrics: [], // To be added if data available
    color: BAYLOR_COLORS.green[600],
    icon: 'balance'
  }
};

/**
 * Performance Rating Thresholds
 * Based on percentage difference from position average
 */
export const PERFORMANCE_RATINGS = {
  excellent: {
    threshold: 15, // >15% above average
    label: 'Excellent',
    color: 'bg-baylor-gold text-baylor-green-dark',
    description: 'Significantly above position average'
  },
  good: {
    threshold: 5, // 5-15% above average
    label: 'Good',
    color: 'bg-baylor-green-light text-white',
    description: 'Above position average'
  },
  average: {
    threshold: -5, // Within ±5% of average
    label: 'Average',
    color: 'bg-gray-100 text-gray-800',
    description: 'At position average'
  },
  monitor: {
    threshold: -15, // 5-15% below average
    label: 'Monitor',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Below position average - monitor progress'
  },
  needsWork: {
    threshold: -Infinity, // >15% below average
    label: 'Needs Work',
    color: 'bg-red-100 text-red-800',
    description: 'Significantly below position average - needs attention'
  }
};

/**
 * Font Configuration
 */
export const FONTS = {
  primary: "'Agency FB', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fallback: "'Helvetica Neue', Helvetica, Arial, sans-serif"
};

/**
 * Get position group by position code
 */
export function getPositionGroup(positionCode, groupType = 'byType') {
  const groups = POSITION_GROUPS[groupType];
  for (const [key, group] of Object.entries(groups)) {
    if (group.positions.includes(positionCode)) {
      return { ...group, key };
    }
  }
  return null;
}

/**
 * Get metric category for a given metric key
 */
export function getMetricCategory(metricKey) {
  for (const [key, category] of Object.entries(METRIC_CATEGORIES)) {
    if (category.metrics.includes(metricKey)) {
      return { ...category, key };
    }
  }
  return null;
}

/**
 * Calculate performance rating
 */
export function calculateRating(value, average) {
  const percentDiff = ((value - average) / average) * 100;

  if (percentDiff > PERFORMANCE_RATINGS.excellent.threshold) {
    return PERFORMANCE_RATINGS.excellent;
  }
  if (percentDiff > PERFORMANCE_RATINGS.good.threshold) {
    return PERFORMANCE_RATINGS.good;
  }
  if (percentDiff > PERFORMANCE_RATINGS.average.threshold) {
    return PERFORMANCE_RATINGS.average;
  }
  if (percentDiff > PERFORMANCE_RATINGS.monitor.threshold) {
    return PERFORMANCE_RATINGS.monitor;
  }
  return PERFORMANCE_RATINGS.needsWork;
}
