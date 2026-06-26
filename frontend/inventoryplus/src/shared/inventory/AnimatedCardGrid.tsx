import { useRef, useState, useEffect, useCallback, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardGridProps {
  children: ReactNode[];
  gap?: number;
  cardWidth?: number;
  cardHeight?: number;
}

export default function AnimatedCardGrid({
  children,
  gap = 32,
  cardWidth = 316,
  cardHeight = 440,
}: AnimatedCardGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);

  const recalc = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    setContainerWidth(w);
    const c = Math.max(1, Math.floor((w + gap) / (cardWidth + gap)));
    setCols(c);
  }, [gap, cardWidth]);

  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [recalc]);

  const items = Array.isArray(children) ? children : [children];
  const rows = Math.ceil(items.length / cols);

  // Calculate the total width of cards in one row and center them
  const totalRowWidth = cols * cardWidth + (cols - 1) * gap;
  const offsetX = Math.max(0, (containerWidth - totalRowWidth) / 2);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: rows * cardHeight + (rows - 1) * gap,
        transition: 'height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {items.map((child, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = offsetX + col * (cardWidth + gap);
        const y = row * (cardHeight + gap);

        return (
          <motion.div
            key={i}
            layout
            initial={false}
            animate={{ x, y, opacity: 1 }}
            transition={{
              x: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
              y: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
              opacity: { duration: 0.3 },
            }}
            style={{
              position: 'absolute',
              width: cardWidth,
              height: cardHeight,
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}
