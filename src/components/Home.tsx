import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  return (
    <div className="home-theme flex flex-col items-center justify-center min-h-screen p-6">
      <div className="flex items-center justify-center">
        {/* Left bracket */}
        <span className="bracket text-[7vw] sm:text-[6vw] md:text-[4.5rem] lg:text-[6rem] xl:text-[8rem] 2xl:text-[9rem]">
          [
        </span>

        {/* Unfolding text container — this is what expands and pushes the brackets apart */}
        <div className="unfold-text-container">
          <h1
            className="font-bold tracking-tight whitespace-nowrap px-2 md:px-4 text-[4.5vw] sm:text-[4vw] md:text-[3rem] lg:text-[4rem] xl:text-[5.5rem] 2xl:text-[6.5rem]"
            style={{ color: 'var(--text-main)' }}
          >
            Green Energy Optimizer
          </h1>
        </div>

        {/* Right bracket */}
        <span className="bracket text-[7vw] sm:text-[6vw] md:text-[4.5rem] lg:text-[6rem] xl:text-[8rem] 2xl:text-[9rem]">
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
