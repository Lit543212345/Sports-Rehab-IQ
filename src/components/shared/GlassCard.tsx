/**
 * @module components/shared/GlassCard
 * @description Glassmorphism card container with blur backdrop.
 */
import { type ReactNode, type CSSProperties } from 'react';
import './GlassCard.css';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
  accent?: string;
}

export function GlassCard({ children, className = '', style, onClick, hoverable = false, accent }: GlassCardProps) {
  const classes = ['glass-card', hoverable ? 'glass-card--hoverable' : '', className].filter(Boolean).join(' ');
  const cardStyle: CSSProperties = {
    ...style,
    ...(accent ? { '--card-accent': accent } as CSSProperties : {}),
  };

  return (
    <div className={classes} style={cardStyle} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {accent && <div className="glass-card__accent-bar" />}
      {children}
    </div>
  );
}
