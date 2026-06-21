# Green Energy Optimizer - Frontend

React-based web application designed to visualize energy generation data and provide smart charging recommendations. The frontend fetches data from the Green Energy Optimizer API and presents users with eco-friendly energy consumption insights using an intuitive, responsive interface.

## Features

* **Energy Mix Dashboard:** Visualizes real-time energy generation composition for multiple days with clean energy percentages.
* **Smart Charging Recommendations:** Displays optimal charging windows based on AI-driven analysis of 48-hour forecasts.
* **Interactive Charts & Data Visualization:** Presents energy mix breakdowns and clean energy trends with visual clarity.
* **Responsive Design:** Fully responsive UI optimized for desktop, tablet, and mobile devices.
* **Real-time API Integration:** Seamlessly fetches and displays data from the Green Energy Optimizer backend.

## Tech Stack

* **Framework:** React 18+
* **Language:** TypeScript
* **Styling:** CSS (60% of codebase)
* **State Management:** React Context / Hooks
* **HTTP Client:** Fetch API / Axios
* **Testing:** Jest, React Testing Library
* **Code Quality:** ESLint, Prettier

## Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm
* Running instance of [green-energy-optimizer-backend](https://github.com/PatiPiasecka/green-energy-optimizer-backend)

### Installation

```bash
git clone https://github.com/PatiPiasecka/green-energy-optimizer-frontend.git
cd green-energy-optimizer-frontend
npm install
```

### Configuration

Create a `.env` file in the project root:

```env
REACT_APP_API_URL=http://localhost:3001
```

Adjust the API URL based on your backend deployment environment.

### Running the Application

```bash
# Development (with hot-reload)
npm start

# Production build
npm run build

# Run tests
npm test

# Run tests with coverage report
npm run test:coverage
```

The application starts on `http://localhost:3000` by default.

## Key Pages & Components

### Energy Mix Dashboard

Displays energy generation composition for the next three days:
- Daily clean energy percentage
- Breakdown by fuel type (biomass, coal, imports, gas, nuclear, hydro, solar, wind)
- Visual indicators highlighting renewable vs. non-renewable sources

### Charging Optimizer

Interactive tool to find the optimal charging window:
- Input: Duration slider (1–6 hours)
- Output: Recommended charging window with highest clean energy percentage
- Display: Visual timeline of energy mix across the next 48 hours

### Responsive Layout

* Mobile-first design
* Adaptive grid layouts
* Touch-friendly controls

## API Integration

The frontend communicates with two main API endpoints:

### GET `/api/energy-mix`

Fetches energy generation mix for three days with clean energy percentages.

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

## Project Structure

```
green-energy-optimizer-frontend/
├── src/
│   ├── components/
│   │   ├── EnergyMixDashboard/
│   │   │   ├── EnergyMixDashboard.tsx
│   │   │   ├── EnergyMixDashboard.css
│   │   │   └── EnergyMixDashboard.test.tsx
│   │   ├── ChargingOptimizer/
│   │   │   ├── ChargingOptimizer.tsx
│   │   │   ├── ChargingOptimizer.css
│   │   │   └── ChargingOptimizer.test.tsx
│   │   ├── EnergyChart/
│   │   │   ├── EnergyChart.tsx
│   │   │   └── EnergyChart.css
│   │   └── Header/
│   │       ├── Header.tsx
│   │       └── Header.css
│   ├── services/
│   │   ├── apiService.ts          # API client for backend communication
│   │   └── apiService.test.ts     # API service tests
│   ├── hooks/
│   │   ├── useEnergyData.ts        # Custom hook for energy data fetching
│   │   └── useOptimization.ts      # Custom hook for charging optimization
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── .env.example
```

## Clean Energy Definition

The following sources are classified as **clean energy**: `biomass`, `nuclear`, `hydro`, `solar`, `wind`.

Clean energy percentage = sum of these sources' shares in the total energy mix.

## Development Workflow

1. **Branch:** Create a feature branch from `main`
2. **Code:** Develop features following TypeScript best practices
3. **Test:** Write unit and integration tests
4. **Style:** Run ESLint and Prettier for code formatting
5. **Commit:** Push changes and create a pull request

### Code Quality Commands

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type check
npm run type-check
```

## Styling

The project uses pure CSS for styling with:
- Responsive grid and flexbox layouts
- CSS variables for theme consistency
- Mobile-first approach
- Support for light/dark modes (if implemented)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Related Projects

- [Green Energy Optimizer Backend](https://github.com/PatiPiasecka/green-energy-optimizer-backend) - Node.js REST API

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please follow the development workflow and ensure all tests pass before submitting a pull request.
