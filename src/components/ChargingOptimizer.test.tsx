import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ChargingOptimizer } from './ChargingOptimizer';
import { fetchOptimization } from '../api/energyApi';
import type { OptimizationResult } from '../types/energy';

// Mock the API module
vi.mock('../api/energyApi', () => ({
  fetchOptimization: vi.fn(),
}));

describe('ChargingOptimizer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial UI elements correctly', () => {
    render(
      <MemoryRouter>
        <ChargingOptimizer />
      </MemoryRouter>,
    );

    expect(screen.getByText('Charging Optimizer')).toBeInTheDocument();
    expect(screen.getByText('Set Duration')).toBeInTheDocument();
    expect(screen.getByText('3 hours')).toBeInTheDocument(); // Default value
    expect(screen.getByRole('button', { name: 'Optimize Charging' })).toBeInTheDocument();
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  it('updates slider value when range input is changed', () => {
    render(
      <MemoryRouter>
        <ChargingOptimizer />
      </MemoryRouter>,
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('3');

    fireEvent.change(slider, { target: { value: '5' } });
    expect(screen.getByText('5 hours')).toBeInTheDocument();
    expect(slider).toHaveValue('5');
  });

  it('shows loading state and displays results after calculation', async () => {
    let resolvePromise: (value: OptimizationResult) => void = () => {};
    const promise = new Promise<OptimizationResult>((resolve) => {
      resolvePromise = resolve;
    });
    vi.mocked(fetchOptimization).mockReturnValue(promise);

    render(
      <MemoryRouter>
        <ChargingOptimizer />
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: 'Optimize Charging' });
    const slider = screen.getByRole('slider');

    // Change value to 4 hours
    fireEvent.change(slider, { target: { value: '4' } });

    // Click calculate
    fireEvent.click(button);

    // Expect loading state
    expect(screen.getByText('Optimizing...')).toBeInTheDocument();
    expect(button).toBeDisabled();

    // Resolve the API call
    const mockResult = {
      start: '2026-06-22T09:30:00Z',
      end: '2026-06-22T13:30:00Z',
      averageCleanPercentage: 37.0,
    };
    resolvePromise(mockResult);

    // Expect button to be back to normal and result panel to be rendered
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Optimize Charging' })).toBeEnabled();
    });

    expect(screen.getByText('Start Time')).toBeInTheDocument();
    expect(screen.getByText('End Time')).toBeInTheDocument();
    expect(screen.getByText('Avg Clean Energy')).toBeInTheDocument();

    // Verify average clean percentage formatted and displayed
    expect(screen.getByText('37.0%')).toBeInTheDocument();
  });
});
