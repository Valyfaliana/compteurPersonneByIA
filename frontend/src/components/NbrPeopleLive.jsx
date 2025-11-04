import React from 'react';

const sizeMap = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-16 h-16 text-lg',
  lg: 'w-24 h-24 text-2xl'
};

const NbrPeopleLive = ({ count = 0, size = 'md', className = '' }) => {
  const sizeClasses = sizeMap[size] ?? sizeMap.md;

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 text-white font-semibold shadow-md ${sizeClasses} ${className}`}
      role="status"
      aria-live="polite"
      aria-label={`${count} personnes en ligne`}
    >
      <span aria-hidden="true" className="leading-none">{count}</span>
      <span className="sr-only">{count} personnes en ligne</span>
    </div>
  );
};

export default NbrPeopleLive;