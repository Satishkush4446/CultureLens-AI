import React from 'react';
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
          <Navbar />
          <main className="flex-grow">
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
