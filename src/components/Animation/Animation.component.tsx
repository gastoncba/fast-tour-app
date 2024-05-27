import { motion } from 'framer-motion';

export type animationType = 'BOOM' | 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';

interface AnimationProps {
  children: React.ReactNode;
  type: animationType;
  duration?: number;
  delay?: number;
}

export const Animation: React.FC<AnimationProps> = ({
  children,
  type,
  duration,
  delay,
}) => {
  let initial;
  let animate;

  switch (type) {
    case 'BOOM':
      initial = { scale: 0 };
      animate = { scale: 1 };
      break;
    case 'LEFT':
      initial = { opacity: 0, x: -20 };
      animate = { opacity: 1, x: 0 };
      break;
    case 'RIGHT':
      initial = { opacity: 0, x: 20 };
      animate = { opacity: 1, x: 0 };
      break;
    case 'UP':
      initial = { opacity: 0, y: -20 };
      animate = { opacity: 1, y: 0 };
      break;
    case 'DOWN':
      initial = { opacity: 0, y: 20 };
      animate = { opacity: 1, y: 0 };
      break;
    default:
      return <>{children}</>;
  }

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: duration || 0.5, delay: delay || 0 }}
    >
      {children}
    </motion.div>
  );
};
