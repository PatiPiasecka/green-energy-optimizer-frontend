import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import { fetchEnergyMix } from '../api/energyApi';
import { getFuelColor } from '../constants/fuelColors';
import { DAY_LABELS } from '../constants/dayLabels';
import type { DailyEnergyMix, TooltipPayload } from '../types/energy';
import './EnergyMix.css';

/* Pick badge class based on clean % */
const getCleanBadgeClass = (pct: number): string => {
  if (pct >= 50) return 'clean-badge clean-badge--high';
  if (pct >= 25) return 'clean-badge clean-badge--mid';
  return 'clean-badge clean-badge--low';
};

/* Custom tooltip for the pie chart */
const ChartTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) => {
  if (!active || !payload?.length) return null;

  const { name, value } = payload[0];
  return (
    <div className="chart-tooltip">
      {name}: {value.toFixed(1)}%
    </div>
  );
};

export const EnergyMixWidget = () => {
  const [data, setData] = useState<DailyEnergyMix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(1); // Middle card active by default
  const [mounted, setMounted] = useState(false); // Prevents transition flash on first render

  useEffect(() => {
    const loadData = async () => {
      try {
        const mixData = await fetchEnergyMix();
        setData(mixData);
      } catch {
        setError('Failed to fetch energy mix data.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Enable transitions only after first paint
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, [data]);

  // Loading state
  if (loading) {
    return (
      <div className="mix-theme flex flex-col items-center justify-center gap-6">
        <div className="spinner" />
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mix-theme flex flex-col items-center justify-center gap-4">
        <div className="error-box">{error}</div>
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </div>
    );
  }

  // Take only first 3 days
  const days = data.slice(0, 3);

  return (
    <div className={`mix-theme p-6 md:p-10 ${mounted ? '' : 'no-transition'}`}>
      {/* Header */}
      <header className="flex flex-col items-center mb-8 gap-2">
        <h1 className="mix-title mt-2 text-center">Energy Mix Forecast</h1>
      </header>

      {/* Accordion cards row */}
      <div className="cards-row">
        {days.map((day, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={day.date}
              className={`day-card ${isActive ? 'day-card--active' : 'day-card--collapsed'}`}
              onClick={() => setActiveIndex(index)}
            >
              {/* Day label */}
              <h2 className="card-label">{DAY_LABELS[index] || day.date}</h2>

              {/* Divider line under title */}
              <div className="card-divider" />

              {/* Clean energy badge */}
              <div className="flex justify-center mt-2">
                <span className={getCleanBadgeClass(day.cleanEnergyPercentage)}>
                  {day.cleanEnergyPercentage.toFixed(1)}% clean
                </span>
              </div>

              {/* Pie chart — larger when active */}
              <div
                className={`chart-container chart-container--enter chart-container--enter-${index} ${isActive ? 'chart-container--active' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={day.mix}
                      dataKey="perc"
                      nameKey="fuel"
                      cx="50%"
                      cy="50%"
                      innerRadius={isActive ? 40 : 25}
                      outerRadius={isActive ? 90 : 55}
                      strokeWidth={1}
                      stroke="var(--card-bg)"
                      isAnimationActive={false}
                    >
                      {day.mix.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={getFuelColor(entry.fuel)} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend — only visible when active, animated */}
              <div className={`legend-panel ${isActive ? 'legend-panel--visible' : ''}`}>
                {[...day.mix]
                  .sort((a, b) => b.perc - a.perc)
                  .map((entry) => (
                    <div key={entry.fuel} className="legend-row">
                      <div className="flex items-center gap-2">
                        <span
                          className="fuel-dot"
                          style={{ backgroundColor: getFuelColor(entry.fuel) }}
                        />
                        <span className="legend-fuel-name capitalize">{entry.fuel}</span>
                      </div>
                      <span className="legend-fuel-pct">{entry.perc.toFixed(1)}%</span>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>

      <Link to="/" className="back-link-right">
        Back to Home
      </Link>
    </div>
  );
};
