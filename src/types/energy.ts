export interface FuelMix {
  fuel: string;
  perc: number;
}

export interface DailyEnergyMix {
  date: string;
  cleanEnergyPercentage: number;
  mix: FuelMix[];
}

export interface OptimizationResult {
  start: string;
  end: string;
  averageCleanPercentage: number;
}

export interface TooltipPayload {
  name: string;
  value: number;
}
