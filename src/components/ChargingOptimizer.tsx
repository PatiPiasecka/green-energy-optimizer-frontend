import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchOptimization } from '../api/energyApi';
import type { OptimizationResult } from '../types/energy';
import './ChargingOptimizer.css';

const getCleanBadgeClass = (pct: number): string => {
  if (pct >= 50)
    return 'clean-optimizer-badge clean-optimizer-badge--high text-[var(--clean-high)]';
  if (pct >= 25) return 'clean-optimizer-badge clean-optimizer-badge--mid text-[var(--clean-mid)]';
  return 'clean-optimizer-badge clean-optimizer-badge--low text-[var(--clean-low)]';
};

export const ChargingOptimizer = () => {
  const [hours, setHours] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const data = await fetchOptimization(hours);
      setResult(data);
    } catch (error) {
      console.error('Błąd obliczeń', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calc-theme min-h-screen w-full flex flex-col p-4 sm:p-5 md:p-6">
      {/* Header */}
      <header className="flex flex-col items-center mb-4 md:mb-6 gap-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[var(--text-main)]">
          Charging Optimizer
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[1000px] min-h-[400px] rounded-2xl p-6 md:p-12 flex flex-col justify-center border border-[var(--card-border-active)] bg-[var(--card-bg-active)] shadow-2xl transition-all duration-500 ease-in-out">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-[var(--card-text)]">
            Set Duration
          </h2>
          <div className="w-full h-px bg-[#254a6e] my-4 md:my-6" />

          {/* Slider */}
          <div className="flex flex-col gap-6 my-6 md:my-8 px-2 md:px-8">
            <div className="flex justify-between items-center text-sm md:text-lg">
              <span className="text-[var(--text-muted)] font-medium">1h</span>
              <span className="clean-optimizer-badge clean-optimizer-badge--high">
                {hours} hours
              </span>
              <span className="text-[var(--text-muted)] font-medium">6h</span>
            </div>

            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="px-2 md:px-8">
            <button
              className="w-full py-4 bg-[var(--accent-color)] text-[#133658] rounded-xl font-bold text-lg md:text-xl transition-transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed shadow-lg"
              onClick={handleCalculate}
              disabled={loading}
            >
              {loading ? 'Optimizing...' : 'Optimize Charging'}
            </button>
          </div>

          {/* Results Panel */}
          <div className={`results-panel ${result ? 'results-panel--visible mt-6' : ''}`}>
            <div className="px-2 md:px-8">
              <div className="w-full h-px bg-[#254a6e] mb-6" />

              {result && (
                <div className="flex flex-col gap-4 text-base md:text-lg">
                  <div className="flex justify-between items-center py-1">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-[var(--accent-color)] shrink-0" />
                      <span className="text-[var(--card-text)] font-medium">Start Time</span>
                    </div>
                    <span className="text-[var(--card-text)] font-bold">
                      {new Date(result.start).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-[#f1c40f] shrink-0" />
                      <span className="text-[var(--card-text)] font-medium">End Time</span>
                    </div>
                    <span className="text-[var(--card-text)] font-bold">
                      {new Date(result.end).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-[#3498db] shrink-0" />
                      <span className="text-[var(--card-text)] font-medium">Avg Clean Energy</span>
                    </div>
                    <span
                      className={`${getCleanBadgeClass(result.averageCleanPercentage)} text-lg px-4 py-1`}
                    >
                      {result.averageCleanPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="back-btn-container">
        <Link to="/" className="back-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};
