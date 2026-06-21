import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Home } from './Home';

describe('Home', () => {
  it('renders the header and navigation links', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    // Expect brackets and title
    expect(screen.getByText('[')).toBeInTheDocument();
    expect(screen.getByText('Green Energy Optimizer')).toBeInTheDocument();
    expect(screen.getByText(']')).toBeInTheDocument();

    // Expect navigation links
    const energyMixLink = screen.getByRole('link', { name: /energy mix/i });
    const chargingCalculatorLink = screen.getByRole('link', { name: /charging calculator/i });

    expect(energyMixLink).toBeInTheDocument();
    expect(energyMixLink).toHaveAttribute('href', '/mix');

    expect(chargingCalculatorLink).toBeInTheDocument();
    expect(chargingCalculatorLink).toHaveAttribute('href', '/optimizer');
  });
});
