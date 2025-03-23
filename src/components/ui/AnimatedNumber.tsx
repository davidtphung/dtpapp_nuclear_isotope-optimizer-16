
import { useState, useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatFn?: (value: number) => string;
  className?: string;
}

const AnimatedNumber = ({
  value,
  duration = 1000,
  formatFn = (val) => val.toFixed(2),
  className
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const startValue = displayValue;
    
    const animateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smoother animation
      const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);
      const easedPercentage = easeOutCubic(percentage);
      
      const currentValue = startValue + (value - startValue) * easedPercentage;
      setDisplayValue(currentValue);
      
      if (percentage < 1) {
        requestAnimationFrame(animateValue);
      }
    };
    
    requestAnimationFrame(animateValue);
  }, [value, duration]);
  
  return (
    <span className={className}>
      {formatFn(displayValue)}
    </span>
  );
};

export default AnimatedNumber;
