import React, { useEffect, useRef, useState } from 'react';

const MarqueeComponent = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState(100);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      let width = 0;
      if (containerRef.current != null && elementRef.current != null) {
        width =
          (elementRef.current.clientWidth * 100) /
          containerRef.current.clientWidth;
      }
      setPosition((prev) => (prev <= -width ? 100 : prev - 0.2));
    }, 100);

    return () => clearInterval(timeoutId);
  }, []);

  const marqStyle: Record<string, string> = {
    display: 'inline-block',
    position: 'relative',
    color: '#0096FF',
    left: `${position}%`,
    height: '50px',
    padding: '20px',
  };

  return (
    <div ref={containerRef}>
      <div ref={elementRef} style={marqStyle}>
        Hello there I am a Marquee
      </div>
    </div>
  );
};

export default MarqueeComponent;
