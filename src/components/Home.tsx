import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  return (
    <div className="home-theme flex flex-col items-center justify-center min-h-screen p-6">
      <div className="flex items-center justify-center">
        {/* Left bracket */}
        <span className="bracket text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[15rem]">
          [
        </span>

        {/* Unfolding text container — this is what expands and pushes the brackets apart */}
        <div className="unfold-text-container">
          <h1
            className="font-bold tracking-tight whitespace-nowrap px-2 md:px-4 text-[2.2rem] sm:text-[3.5rem] md:text-[6rem] lg:text-[9rem]"
            style={{ color: 'var(--text-main)' }}
          >
            Green Energy Optimizer
          </h1>
        </div>

        {/* Right bracket */}
        <span className="bracket text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[15rem]">
          ]
        </span>
      </div>

      <nav className="unfold-buttons mt-8 md:mt-12 flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <Link to="/mix" className="home-btn home-btn--primary">
          Energy Mix
        </Link>
        <Link to="/optimizer" className="home-btn home-btn--secondary">
          Charging Calculator
        </Link>
      </nav>
    </div>
  );
};
