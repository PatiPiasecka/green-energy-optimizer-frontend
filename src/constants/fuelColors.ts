export const FUEL_COLORS: Record<string, string> = {
  wind: 'rgb(102, 113, 234)',
  solar: '#f5df86',
  hydro: '#447291',
  biomass: '#459b6a',
  nuclear: '#bd81d4',
  imports: '#95a5a6',
  gas: 'rgb(244, 173, 111)',
  coal: '#27313c',
  other: '#bdc3c7',
};

export const getFuelColor = (fuel: string): string => FUEL_COLORS[fuel] ?? FUEL_COLORS.other;
