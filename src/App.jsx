import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Hero from './components/landing/Hero';
import Dashboard from './components/results/Dashboard';

function App() {
  return (
    <TripProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#0A0F1E] text-slate-200">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-sky-600 focus:text-white focus:px-4 focus:py-2.5 focus:z-50 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 font-semibold text-xs"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TripProvider>
  );
}

export default App;
