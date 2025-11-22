import React from 'react';

/**
 * Composant LED réaliste vue de dessus
 * @param {number} value - Valeur entre 0 et 1 (0 = éteint, 1 = allumé à 100%)
 * @param {string} color - Couleur de la LED (par défaut: rouge)
 * @param {number} size - Taille en pixels (par défaut: 60)
 * @param {boolean} glow - Affiche l'effet de lueur (par défaut: true)
 */
const MyLed = ({ value = 0, color = 'green', size = 60, glow = true, className = '', legend = '' }) => {
  // Normaliser la valeur entre 0 et 1
  const normalizedValue = Math.min(Math.max(value, 0), 1);
  
  // Mapping des couleurs
  const colorMap = {
    red: { light: '#ff4444', dark: '#aa0000' },
    green: { light: '#44ff44', dark: '#00aa00' },
    blue: { light: '#4444ff', dark: '#0000aa' },
    yellow: { light: '#ffff44', dark: '#aaaa00' },
    orange: { light: '#ff9944', dark: '#aa6600' },
    purple: { light: '#ff44ff', dark: '#aa00aa' },
  };
  
  const { light, dark } = colorMap[color] || colorMap.red;
  
  // Calculate opacity and brightness based on value
  const opacity = 0.3 + normalizedValue * 0.7; // Between 0.3 and 1
  const glowOpacity = normalizedValue * 0.6;
  const glowSize = size * (0.8 + normalizedValue * 1.2);
  
  return (
    <div className={`flex flex-col items-center ${className}`} style={{ width: size }}>
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      {/* Outer glow effect (optional) */}
      {glow && normalizedValue > 0.1 && (
        <div
          style={{
            position: 'absolute',
            width: glowSize,
            height: glowSize,
            borderRadius: '50%',
            backgroundColor: light,
            opacity: glowOpacity * 0.3,
            filter: 'blur(12px)',
            zIndex: 0,
            transition: 'all 0.3s ease',
          }}
        />
      )}

      {/* LED housing (black case) */}
      <div
        style={{
          position: 'absolute',
          width: size * 0.95,
          height: size * 0.95,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, #333333, #000000)`,
          boxShadow: `
            inset 0 2px 4px rgba(255, 255, 255, 0.1),
            0 4px 8px rgba(0, 0, 0, 0.5)
          `,
          zIndex: 1,
        }}
      />
      
      {/* Main light emitter */}
      <div
        style={{
          position: 'absolute',
          width: size * 0.7,
          height: size * 0.7,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${light}, ${dark})`,
          opacity: opacity,
          boxShadow: `
            inset -2px -2px 4px rgba(0, 0, 0, 0.4),
            inset 2px 2px 4px rgba(255, 255, 255, 0.3),
            0 0 ${size * 0.3 * normalizedValue}px ${light}
          `,
          zIndex: 2,
          transition: 'all 0.2s ease',
          filter: normalizedValue > 0.5 ? 'brightness(1.2)' : 'brightness(1)',
        }}
      />
      
        {/* Shiny reflection */}
        {normalizedValue > 0.2 && (
          <div
            style={{
              position: 'absolute',
              width: size * 0.3,
              height: size * 0.3,
              borderRadius: '50%',
              background: `radial-gradient(circle at 40% 40%, rgba(255, 255, 255, ${0.4 * normalizedValue}), transparent)`,
              top: `${size * 0.15}px`,
              left: `${size * 0.15}px`,
              zIndex: 3,
              transition: 'all 0.2s ease',
            }}
          />
        )}
      </div>

      {/* Legend below the LED */}
      {legend && (
        <div className="mt-2 text-center" style={{ maxWidth: size * 1.6 }}>
          <span className="text-xs font-medium text-white/85 tracking-tight">
            {legend}
          </span>
        </div>
      )}
    </div>
  );
};

export default MyLed;
