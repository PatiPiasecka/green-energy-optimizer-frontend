# Green Energy Optimizer - Frontend

React-based web application designed to visualize energy generation data and provide smart charging recommendations. The frontend fetches data from the Green Energy Optimizer API and presents users with intuitive dashboards and recommendations.

## Features

- **Energy Mix Dashboard:** Visualizes real-time energy generation composition for multiple days with clean energy percentages.
- **Smart Charging Recommendations:** Displays optimal charging windows based on a sliding-window analysis of 48-hour forecasts.
- **Interactive Charts & Data Visualization:** Presents energy mix breakdowns and clean energy trends using Recharts.
- **Responsive Design:** Fully responsive UI optimized for desktop, tablet, and mobile devices (mobile-first layout).
- **Real-time API Integration:** Fetches and displays data from the Green Energy Optimizer backend.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** CSS & Tailwind CSS v4
- **Testing:** Vitest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Running instance of [green-energy-optimizer-backend](https://github.com/PatiPiasecka/green-energy-optimizer-backend) (usually on `http://localhost:3001`)

### Installation

```bash
git clone https://github.com/PatiPiasecka/green-energy-optimizer-frontend.git
cd green-energy-optimizer-frontend
npm install
```

### Running the Application

```bash
# Development (with hot-reload)
npm run dev

# Production build
npm run build

# Run tests
npm run test
```

The application starts on `http://localhost:5173` by default.

## Key Pages & Components

### Energy Mix Dashboard

Displays energy generation composition for the next three days (Today, Tomorrow, and Day After Tomorrow) in a responsive accordion layout:

- Daily clean energy percentage badge.
- Interactive Recharts Pie chart when active.
- Detailed fuel type breakdown list sorted from highest to lowest share.

### Charging Optimizer

Interactive tool to find the optimal charging window:

- Duration slider (1–6 hours) to set charging parameters.
- Fetch and display the recommended optimal charging start/end times and average clean energy.

### Responsive Layout

- Mobile-first design.
- Adaptive grid layout matching viewport size.
- Touch-friendly range selector controls.

## API Integration

The frontend communicates with two main API endpoints (via `http://localhost:3001/api`):

### GET `/api/energy-mix`

Fetches UK energy generation mix for three days with clean energy percentages.

**Response:**

```json
[
  {
    "date": "2026-06-20",
    "cleanEnergyPercentage": 49.25,
    "mix": [
      { "fuel": "biomass", "perc": 4.12 },
      { "fuel": "coal", "perc": 1.85 },
      { "fuel": "gas", "perc": 36.82 },
      { "fuel": "nuclear", "perc": 15.48 },
      { "fuel": "hydro", "perc": 1.92 },
      { "fuel": "solar", "perc": 12.35 },
      { "fuel": "wind", "perc": 15.38 }
    ]
  }
]
```

### GET `/api/optimize-charging?hours={1-6}`

Returns the optimal charging window with the highest clean energy percentage.

**Response:**

```json
{
  "start": "2026-06-21T02:00Z",
  "end": "2026-06-21T05:00Z",
  "averageCleanPercentage": 62.45
}
```

## Demo Video

<video src=https://github.com/user-attachments/assets/7757bc1e-cf45-4b90-a4fe-b2342c26c221 width="800" controls autoplay loop muted></video>

## Project Structure

```
green-energy-optimizer-frontend/
├── src/
│   ├── api/
│   │   └── energyApi.ts             # API client for backend communication
│   ├── components/
│   │   ├── Home.tsx                 # Landing / Home view
│   │   ├── Home.css                 # Home layout styles
│   │   ├── Home.test.tsx            # Unit tests for Home view
│   │   ├── EnergyMixWidget.tsx      # Accordion and Pie Chart forecast widget
│   │   ├── EnergyMix.css            # Forecast theme and accordion styles
│   │   ├── EnergyMixWidget.test.tsx # Unit tests for mix forecast widget
│   │   ├── ChargingOptimizer.tsx    # EV smart charging page
│   │   ├── ChargingOptimizer.css    # Smart charging styles
│   │   └── ChargingOptimizer.test.tsx # Unit tests for optimizer page
│   ├── constants/
│   │   ├── dayLabels.ts             # Display labels for days
│   │   └── fuelColors.ts            # Palette mappings for Recharts cells
│   ├── types/
│   │   └── energy.ts                # TypeScript type definitions
│   ├── App.tsx                      # App component with routes
│   ├── index.css                    # Tailwind CSS import
│   ├── main.tsx                     # React application entrypoint
│   └── setupTests.ts                # Test environment setup
├── public/
│   └── favicon.ico                  # Favicon asset
├── eslint.config.js                 # ESLint Flat configuration
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json
└── README.md
```

## Clean Energy Definition

The following sources are classified as **clean energy**: `biomass`, `nuclear`, `hydro`, `solar`, `wind`.

Clean energy percentage = sum of these sources' shares in the total energy mix.

## Styling

The project uses a mix of Tailwind CSS and pure CSS for styling:

- Responsive grid and flexbox layouts.
- CSS variables for theme consistency.
- Mobile-first approach.

## Related Projects

- [Green Energy Optimizer Backend](https://github.com/PatiPiasecka/green-energy-optimizer-backend) - Node.js REST API
