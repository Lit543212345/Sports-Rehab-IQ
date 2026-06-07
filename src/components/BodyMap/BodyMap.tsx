/**
 * @module components/BodyMap
 * @description Interactive body map for selecting injury regions.
 */
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Model from 'react-body-highlighter';
import type { IMuscleStats, Muscle } from 'react-body-highlighter';
import type { BodyRegion } from '../../data/knowledgebase/types';
import { getBodyRegions } from '../../data/knowledgebase';
import { GlassCard } from '../shared/GlassCard';
import './BodyMap.css';

interface BodyMapProps {
  onRegionSelect: (region: BodyRegion) => void;
}

const MUSCLE_TO_REGION: Record<string, BodyRegion> = {
  head: 'head-neck',
  neck: 'head-neck',
  'front-deltoids': 'shoulder',
  'back-deltoids': 'shoulder',
  chest: 'spine',
  'upper-back': 'spine',
  'lower-back': 'spine',
  trapezius: 'spine',
  biceps: 'elbow-wrist-hand',
  triceps: 'elbow-wrist-hand',
  forearm: 'elbow-wrist-hand',
  abs: 'hip-pelvis-groin',
  obliques: 'hip-pelvis-groin',
  gluteal: 'hip-pelvis-groin',
  adductor: 'hip-pelvis-groin',
  abductors: 'hip-pelvis-groin',
  quadriceps: 'knee-thigh',
  hamstring: 'knee-thigh',
  knees: 'knee-thigh',
  calves: 'lower-leg-ankle-foot',
  'left-soleus': 'lower-leg-ankle-foot',
  'right-soleus': 'lower-leg-ankle-foot'
};

export const REGION_TO_MUSCLES: Record<string, string[]> = {
  'head-neck': ['head', 'neck'],
  'shoulder': ['front-deltoids', 'back-deltoids'],
  'spine': ['chest', 'upper-back', 'lower-back', 'trapezius'],
  'elbow-wrist-hand': ['biceps', 'triceps', 'forearm'],
  'hip-pelvis-groin': ['abs', 'obliques', 'gluteal', 'adductor', 'abductors'],
  'knee-thigh': ['quadriceps', 'hamstring', 'knees'],
  'lower-leg-ankle-foot': ['calves', 'left-soleus', 'right-soleus']
};

export function BodyMap({ onRegionSelect }: BodyMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<BodyRegion | null>(null);
  const [modelType, setModelType] = useState<'anterior' | 'posterior'>('anterior');
  const regions = getBodyRegions();

  const handleMuscleClick = useCallback((stats: IMuscleStats) => {
    const regionId = MUSCLE_TO_REGION[stats.muscle as string];
    if (regionId) {
      onRegionSelect(regionId);
    }
  }, [onRegionSelect]);

  const handleMouseOver = useCallback((e: React.MouseEvent) => {
    const target = e.target as Element;
    const className = target.getAttribute('class') || '';
    for (const muscle of Object.keys(MUSCLE_TO_REGION)) {
      if (className.includes(muscle)) {
        setHoveredRegion(MUSCLE_TO_REGION[muscle]);
        return;
      }
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    setHoveredRegion(null);
  }, []);

  const hoveredRegionInfo = hoveredRegion ? regions.find((r) => r.id === hoveredRegion) : null;
  
  const highlightData = hoveredRegion ? [
    { 
      name: hoveredRegion, 
      muscles: REGION_TO_MUSCLES[hoveredRegion] as Muscle[] 
    }
  ] : [];

  return (
    <div className="body-map">
      <div className="body-map__figure">
        <div className="body-map__toggle">
          <button 
            className={`body-map__toggle-btn ${modelType === 'anterior' ? 'body-map__toggle-btn--active' : ''}`}
            onClick={() => setModelType('anterior')}
          >
            Front
          </button>
          <button 
            className={`body-map__toggle-btn ${modelType === 'posterior' ? 'body-map__toggle-btn--active' : ''}`}
            onClick={() => setModelType('posterior')}
          >
            Back
          </button>
        </div>
        
        <div 
          className="body-map__model-wrapper"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <Model 
            type={modelType} 
            data={highlightData}
            bodyColor="var(--color-bg-tertiary)"
            highlightedColors={[hoveredRegionInfo?.color || 'var(--color-accent)']}
            onClick={handleMuscleClick}
            style={{ width: '100%', height: '100%' }}
            svgStyle={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.3))' }}
          />
        </div>
      </div>

      <div className="body-map__regions">
        <h3 className="body-map__title">Select affected area</h3>
        <div className="body-map__grid">
          {regions.map((region, i) => (
            <motion.div 
              key={region.id} 
              initial={{ opacity: 0, y: 16 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.05, duration: 0.3 }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              <GlassCard 
                hoverable 
                accent={region.color} 
                onClick={() => onRegionSelect(region.id)} 
                className={`body-map__region-card ${hoveredRegion === region.id ? 'body-map__region-card--active' : ''}`}
              >
                <span className="body-map__region-icon">{region.icon}</span>
                <div className="body-map__region-info">
                  <span className="body-map__region-label">{region.label}</span>
                  <span className="body-map__region-count">{region.injuryCount} conditions</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
