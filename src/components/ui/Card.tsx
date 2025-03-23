
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  glassEffect?: boolean;
  glow?: boolean;
  hover?: boolean;
  animation?: 'fade' | 'slide' | 'float' | 'none';
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Card = ({
  children,
  className,
  glassEffect = false,
  glow = false,
  hover = true,
  animation = 'none',
  style,
  onClick
}: CardProps) => {
  const getAnimationClass = () => {
    switch (animation) {
      case 'fade':
        return 'animate-fade-in';
      case 'slide':
        return 'animate-slide-up';
      case 'float':
        return 'animate-float';
      default:
        return '';
    }
  };
  
  return (
    <div 
      className={cn(
        "rounded-xl p-6 border border-gray-200 dark:border-gray-800",
        "bg-white dark:bg-gray-900",
        glassEffect && "backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-white/20 dark:border-gray-700/30",
        glow && "nuclear-glow",
        hover && "transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]",
        getAnimationClass(),
        className
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
