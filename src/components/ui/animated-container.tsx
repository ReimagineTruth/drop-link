
import React from 'react';
import { motion, MotionProps } from 'framer-motion';

export interface AnimatedContainerProps extends Omit<MotionProps, 'animate' | 'initial' | 'exit' | 'transition'> {
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  motionProps?: Omit<MotionProps, 'children' | 'className'>;
}

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  },
  none: {
    initial: {},
    animate: {},
    exit: {}
  }
};

export function AnimatedContainer({
  children,
  animation = 'fade',
  delay = 0,
  duration = 0.4,
  className = '',
  motionProps,
  ...props
}: AnimatedContainerProps) {
  const animationProps = animations[animation];
  
  return (
    <motion.div
      initial={animationProps.initial}
      animate={animationProps.animate}
      exit={animationProps.exit}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] // Smooth cubic bezier curve
      }}
      className={className}
      {...(motionProps || {})}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const AnimatedList = ({ 
  children,
  staggerDelay = 0.1,
  ...props
}: {
  children: React.ReactNode[];
  staggerDelay?: number;
} & Omit<AnimatedContainerProps, 'children'>) => {
  return (
    <>
      {React.Children.map(children, (child, i) => (
        <AnimatedContainer
          key={i}
          delay={i * staggerDelay}
          {...props}
        >
          {child}
        </AnimatedContainer>
      ))}
    </>
  );
};
