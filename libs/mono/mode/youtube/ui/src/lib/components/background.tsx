import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrackInfoProps {
  imageUrl?: string;
}

export const Backgroud: React.FC<TrackInfoProps> = ({ imageUrl }) => (
  <AnimatePresence>
    <motion.div
      key={imageUrl}
      className="absolute left-0 top-0 h-full w-full bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${imageUrl})`,
        filter: 'blur(24px) brightness(0.1)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  </AnimatePresence>
);
