/**
 * @module App
 * @description Root app shell with routing, bottom nav, and persistent medical disclaimer.
 */
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { MedicalDisclaimer } from './components/shared/MedicalDisclaimer';
import { Home } from './pages/Home';
import './styles/global.css';

const Diagnose = lazy(() => import('./pages/Diagnose').then(m => ({ default: m.Diagnose })));
const Treatment = lazy(() => import('./pages/Treatment').then(m => ({ default: m.Treatment })));
const History = lazy(() => import('./pages/History').then(m => ({ default: m.History })));

function AppContent() {
  const location = useLocation();

  return (
    <>
      <main className="app-main">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/diagnose" element={<Diagnose />} />
                <Route path="/treatment/:planId" element={<Treatment />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Medical Disclaimer — always visible */}
      <MedicalDisclaimer />

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <NavLink to="/" className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`} end>
          <span className="bottom-nav__icon">🏠</span>
          <span className="bottom-nav__label">Home</span>
        </NavLink>
        <NavLink to="/diagnose" className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}>
          <span className="bottom-nav__icon">🔍</span>
          <span className="bottom-nav__label">Diagnose</span>
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}>
          <span className="bottom-nav__icon">🕒</span>
          <span className="bottom-nav__label">History</span>
        </NavLink>
      </nav>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
