import React, { useState, useRef } from 'react';

const InteractiveDots = ({
  cols,
  rows,
  className = '',
  dotClassName = 'bg-white'
}) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  const dotSize = 6; // px, roughly w-1.5
  const gapSize = 16; // px, roughly gap-4
  const maxDistance = 80; // px radius for interaction

  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Calculate dot center position
      const dotX = c * (dotSize + gapSize) + dotSize / 2;
      const dotY = r * (dotSize + gapSize) + dotSize / 2;

      const dx = mousePos.x - dotX;
      const dy = mousePos.y - dotY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      let scale = 1;
      let opacity = 0.15;

      if (distance < maxDistance) {
        const factor = 1 - distance / maxDistance; // 0 to 1, 1 is center
        scale = 1 + factor * 2; // scales up to 3x
        opacity = 0.15 + factor * 0.85; // opacity up to 1.0
      }

      dots.push(
        <div
          key={`${r}-${c}`}
          className={`w-[6px] h-[6px] rounded-full transition-all duration-150 ease-out ${dotClassName}`}
          style={{
            transform: `scale(${scale})`,
            opacity: opacity
          }}
        />
      );
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: `${gapSize}px`
      }}
    >
      {dots}
    </div>
  );
};

export default InteractiveDots;
