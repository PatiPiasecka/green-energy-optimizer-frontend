import type { DailyEnergyMix, OptimizationResult } from '../types/energy.ts';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Function to fetch energy mix (first endpoint)
export const fetchEnergyMix = async (): Promise<DailyEnergyMix[]> => {
  const response = await fetch(`${API_BASE_URL}/energy-mix`);
  if (!response.ok) {
    throw new Error('Failed to fetch energy mix data');
  }
  return response.json();
};

// Function to fetch optimization results (second endpoint)
export const fetchOptimization = async (hours: number): Promise<OptimizationResult> => {
  const response = await fetch(`${API_BASE_URL}/optimize-charging?hours=${hours}`);
  if (!response.ok) {
    throw new Error('Failed to fetch optimization data');
  }
  return response.json();
};
