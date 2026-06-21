import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import type { ReactNode } from 'react';
import { EnergyMixWidget } from './EnergyMixWidget';
import { fetchEnergyMix } from '../api/energyApi';
import type { DailyEnergyMix } from '../types/energy';

// Mock Recharts to avoid issues with JSDOM layout engine
vi.mock('recharts', async () => {
  const original = await vi.importActual<Record<string, unknown>>('recharts');
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

// Mock the API module
vi.mock('../api/energyApi', () => ({
  fetchEnergyMix: vi.fn(),
}));

const mockEnergyData: DailyEnergyMix[] = [
  {
    date: '2026-06-21',
    cleanEnergyPercentage: 35.5,
    mix: [
      { fuel: 'coal', perc: 45.0 },
      { fuel: 'gas', perc: 19.5 },
      { fuel: 'wind', perc: 20.0 },
      { fuel: 'solar', perc: 15.5 },
    ],
  },
  {
    date: '2026-06-22',
    cleanEnergyPercentage: 58.7,
    mix: [
      { fuel: 'wind', perc: 40.0 },
      { fuel: 'solar', perc: 18.7 },
      { fuel: 'gas', perc: 30.0 },
      { fuel: 'coal', perc: 11.3 },
    ],
  },
  {
    date: '2026-06-23',
    cleanEnergyPercentage: 25.0,
    mix: [
      { fuel: 'coal', perc: 60.0 },
      { fuel: 'gas', perc: 15.0 },
      { fuel: 'solar', perc: 10.0 },
      { fuel: 'wind', perc: 15.0 },
    ],
  },
];

describe('EnergyMixWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    // Return a promise that doesn't resolve immediately
    vi.mocked(fetchEnergyMix).mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter>
        <EnergyMixWidget />
      </MemoryRouter>,
    );

    // Expect loading spinner/link to be present
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
    expect(document.querySelector('.spinner')).toBeInTheDocument();
  });

  it('renders error state on API failure', async () => {
    vi.mocked(fetchEnergyMix).mockRejectedValue(new Error('API Error'));

    render(
      <MemoryRouter>
        <EnergyMixWidget />
      </MemoryRouter>,
    );

    // Wait for the error block to be rendered
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch energy mix data.')).toBeInTheDocument();
    });
  });

  it('renders data and updates active card on click', async () => {
    vi.mocked(fetchEnergyMix).mockResolvedValue(mockEnergyData);

    render(
      <MemoryRouter>
        <EnergyMixWidget />
      </MemoryRouter>,
    );

    // Wait for loading to finish and content to render
    await waitFor(() => {
      expect(screen.getByText('Energy Mix Forecast')).toBeInTheDocument();
    });

    // Check that Day labels are rendered
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Tomorrow')).toBeInTheDocument();
    expect(screen.getByText('Day After Tomorrow')).toBeInTheDocument();

    // Check clean percentage badges
    expect(screen.getByText('35.5% clean')).toBeInTheDocument();
    expect(screen.getByText('58.7% clean')).toBeInTheDocument();
    expect(screen.getByText('25.0% clean')).toBeInTheDocument();

    // Find the cards
    const cards = document.querySelectorAll('.day-card');
    expect(cards).toHaveLength(3);

    // Check default active card (Tomorrow at index 1)
    expect(cards[0]).toHaveClass('day-card--collapsed');
    expect(cards[1]).toHaveClass('day-card--active');
    expect(cards[2]).toHaveClass('day-card--collapsed');

    // Inside the active card (Tomorrow), the legend should be sorted from highest to lowest percentage:
    // wind (40.0%), gas (30.0%), solar (18.7%), coal (11.3%)
    // Let's verify sorting in the legend panel of Tomorrow.
    const activeLegendRows = cards[1].querySelectorAll('.legend-row');
    expect(activeLegendRows).toHaveLength(4);
    expect(activeLegendRows[0]).toHaveTextContent('wind');
    expect(activeLegendRows[0]).toHaveTextContent('40.0%');
    expect(activeLegendRows[1]).toHaveTextContent('gas');
    expect(activeLegendRows[1]).toHaveTextContent('30.0%');
    expect(activeLegendRows[2]).toHaveTextContent('solar');
    expect(activeLegendRows[2]).toHaveTextContent('18.7%');
    expect(activeLegendRows[3]).toHaveTextContent('coal');
    expect(activeLegendRows[3]).toHaveTextContent('11.3%');

    // Click on "Today" card (index 0)
    fireEvent.click(cards[0]);

    // "Today" should now be active, "Tomorrow" collapsed
    expect(cards[0]).toHaveClass('day-card--active');
    expect(cards[1]).toHaveClass('day-card--collapsed');
    expect(cards[2]).toHaveClass('day-card--collapsed');
  });
});
