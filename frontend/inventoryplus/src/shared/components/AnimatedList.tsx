import React, { useRef, useState, useEffect, useCallback, type ReactNode, type MouseEventHandler, type UIEvent } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedItemProps {
    children: ReactNode;
    delay?: number;
    index: number;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export const AnimatedItem: React.FC<AnimatedItemProps> = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: 0.5, once: false });
    return (
        <motion.div
            ref={ref}
            data-index={index}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2, delay }}
            style={{ cursor: 'pointer' }}
        >
            {children}
        </motion.div>
    );
};

interface AnimatedListProps {
    items?: string[];
    onItemSelect?: (item: string, index: number) => void;
    showGradients?: boolean;
    enableArrowNavigation?: boolean;
    className?: string;
    itemClassName?: string;
    displayScrollbar?: boolean;
    initialSelectedIndex?: number;
    orientation?: 'horizontal' | 'vertical' | 'grid';
}

const AnimatedList: React.FC<AnimatedListProps> = ({
    items = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
        'Item 7',
        'Item 8',
        'Item 9',
        'Item 10',
        'Item 11',
        'Item 12',
        'Item 13',
        'Item 14',
        'Item 15'
    ],
    onItemSelect,
    showGradients = true,
    enableArrowNavigation = true,
    className = '',
    itemClassName = '',
    displayScrollbar = true,
    initialSelectedIndex = -1,
    orientation = 'vertical'
}) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex);
    const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
    const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
    const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);

    // Sync state with prop updates
    useEffect(() => {
        setSelectedIndex(initialSelectedIndex);
    }, [initialSelectedIndex]);

    const handleItemMouseEnter = useCallback((_index: number) => {
        // No-op to retain click selection
    }, []);

    const handleItemClick = useCallback(
        (item: string, index: number) => {
            setSelectedIndex(index);
            if (onItemSelect) {
                onItemSelect(item, index);
            }
        },
        [onItemSelect]
    );

    const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        if (orientation === 'horizontal') {
            const { scrollLeft, scrollWidth, clientWidth } = target;
            setTopGradientOpacity(Math.min(scrollLeft / 50, 1));
            const rightDistance = scrollWidth - (scrollLeft + clientWidth);
            setBottomGradientOpacity(scrollWidth <= clientWidth ? 0 : Math.min(rightDistance / 50, 1));
        } else {
            const { scrollTop, scrollHeight, clientHeight } = target;
            setTopGradientOpacity(Math.min(scrollTop / 50, 1));
            const bottomDistance = scrollHeight - (scrollTop + clientHeight);
            setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
        }
    }, [orientation]);

    useEffect(() => {
        if (!enableArrowNavigation) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (orientation === 'horizontal') {
                if (e.key === 'ArrowRight' || (e.key === 'Tab' && !e.shiftKey)) {
                    e.preventDefault();
                    setKeyboardNav(true);
                    setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
                } else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
                    e.preventDefault();
                    setKeyboardNav(true);
                    setSelectedIndex(prev => Math.max(prev - 1, 0));
                }
            } else if (orientation === 'grid') {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setKeyboardNav(true);
                    setSelectedIndex(prev => Math.min(prev + 3, items.length - 1));
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setKeyboardNav(true);
                    setSelectedIndex(prev => Math.max(prev - 3, 0));
                } else if (e.key === 'ArrowRight' || (e.key === 'Tab' && !e.shiftKey)) {
                    e.preventDefault();
                    setKeyboardNav(true);
                    setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
                } else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
                    e.preventDefault();
                    setKeyboardNav(true);
                    setSelectedIndex(prev => Math.max(prev - 1, 0));
                }
            } else {
                if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
                    e.preventDefault();
                    setKeyboardNav(true);
                    setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
                } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
                    e.preventDefault();
                    setKeyboardNav(true);
                    setSelectedIndex(prev => Math.max(prev - 1, 0));
                }
            }
            if (e.key === 'Enter') {
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    e.preventDefault();
                    if (onItemSelect) {
                        onItemSelect(items[selectedIndex], selectedIndex);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [items, selectedIndex, onItemSelect, enableArrowNavigation, orientation]);

    useEffect(() => {
        if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
        const container = listRef.current;
        const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null;
        if (selectedItem) {
            const extraMargin = 50;
            if (orientation === 'horizontal') {
                const containerScrollLeft = container.scrollLeft;
                const containerWidth = container.clientWidth;
                const itemLeft = selectedItem.offsetLeft;
                const itemRight = itemLeft + selectedItem.offsetWidth;
                if (itemLeft < containerScrollLeft + extraMargin) {
                    container.scrollTo({ left: itemLeft - extraMargin, behavior: 'smooth' });
                } else if (itemRight > containerScrollLeft + containerWidth - extraMargin) {
                    container.scrollTo({
                        left: itemRight - containerWidth + extraMargin,
                        behavior: 'smooth'
                    });
                }
            } else {
                const containerScrollTop = container.scrollTop;
                const containerHeight = container.clientHeight;
                const itemTop = selectedItem.offsetTop;
                const itemBottom = itemTop + selectedItem.offsetHeight;
                if (itemTop < containerScrollTop + extraMargin) {
                    container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
                } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
                    container.scrollTo({
                        top: itemBottom - containerHeight + extraMargin,
                        behavior: 'smooth'
                    });
                }
            }
        }
        setKeyboardNav(false);
    }, [selectedIndex, keyboardNav, orientation]);

    return (
        <>
            <style>{`
                .scroll-list-container {
                  position: relative;
                  width: 100%;
                  margin: 0;
                  border-radius: 12px;
                }

                .scroll-list-container.vertical {
                  max-width: 600px;
                }

                .scroll-list-container.horizontal,
                .scroll-list-container.grid {
                  max-width: 100%;
                }

                .scroll-list {
                  display: flex;
                  gap: 12px;
                  padding: 8px 4px;
                }

                .scroll-list.vertical {
                  flex-direction: column;
                  max-height: 400px;
                  overflow-y: auto;
                  overflow-x: hidden;
                }

                .scroll-list.horizontal {
                  flex-direction: row;
                  max-height: 120px;
                  overflow-x: auto;
                  overflow-y: hidden;
                  padding-bottom: 12px;
                }

                .scroll-list.grid {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 12px;
                  max-height: 400px;
                  overflow-y: auto;
                  overflow-x: hidden;
                }

                /* Custom Scrollbar for premium look */
                .scroll-list::-webkit-scrollbar {
                  width: 6px;
                  height: 6px;
                }

                .scroll-list::-webkit-scrollbar-track {
                  background: transparent;
                }

                .scroll-list::-webkit-scrollbar-thumb {
                  background: var(--border, #e5e4e7);
                  border-radius: 3px;
                }

                .dark .scroll-list::-webkit-scrollbar-thumb {
                  background: var(--border, #2e303a);
                }

                .scroll-list.no-scrollbar::-webkit-scrollbar {
                  display: none;
                }

                .item {
                  display: flex;
                  align-items: center;
                  padding: 14px 20px;
                  background: var(--bg);
                  border: 1px solid var(--border);
                  border-radius: 10px;
                  cursor: pointer;
                  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
                }

                .scroll-list.horizontal .item {
                  flex-shrink: 0;
                  white-space: nowrap;
                }

                .scroll-list.grid .item {
                  width: 100%;
                  box-sizing: border-box;
                }

                .dark .item {
                  background: rgba(255, 255, 255, 0.02);
                  border-color: rgba(255, 255, 255, 0.05);
                }

                .item:hover {
                  transform: translateY(-2px);
                  border-color: var(--accent);
                  background: var(--accent-bg);
                  box-shadow: 0 4px 12px rgba(170, 59, 255, 0.08);
                }

                .dark .item:hover {
                  box-shadow: 0 4px 12px rgba(192, 132, 252, 0.12);
                }

                .item.selected {
                  border-color: var(--accent);
                  background: var(--accent-bg);
                  box-shadow: 0 0 0 1px var(--accent);
                }

                .item-text {
                  font-size: 16px;
                  font-weight: 500;
                  color: var(--text-h);
                  margin: 0;
                  transition: color 0.2s ease;
                }

                .item.selected .item-text {
                  color: var(--accent);
                }

                /* Gradients for scroll indications */
                .top-gradient,
                .bottom-gradient {
                  position: absolute;
                  pointer-events: none;
                  transition: opacity 0.3s ease;
                  z-index: 10;
                }

                .vertical .top-gradient,
                .grid .top-gradient {
                  top: 0;
                  left: 0;
                  right: 0;
                  height: 40px;
                  background: linear-gradient(to bottom, var(--bg) 0%, transparent 100%);
                }

                .dark .vertical .top-gradient,
                .dark .grid .top-gradient {
                  background: linear-gradient(to bottom, #0C111D 0%, transparent 100%);
                }

                .vertical .bottom-gradient,
                .grid .bottom-gradient {
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 40px;
                  background: linear-gradient(to top, var(--bg) 0%, transparent 100%);
                }

                .dark .vertical .bottom-gradient,
                .dark .grid .bottom-gradient {
                  background: linear-gradient(to top, #0C111D 0%, transparent 100%);
                }

                .horizontal .top-gradient {
                  top: 0;
                  bottom: 0;
                  left: 0;
                  width: 40px;
                  background: linear-gradient(to right, var(--bg) 0%, transparent 100%);
                }

                .dark .horizontal .top-gradient {
                  background: linear-gradient(to right, #0C111D 0%, transparent 100%);
                }

                .horizontal .bottom-gradient {
                  top: 0;
                  bottom: 0;
                  right: 0;
                  width: 40px;
                  background: linear-gradient(to left, var(--bg) 0%, transparent 100%);
                }

                .dark .horizontal .bottom-gradient {
                  background: linear-gradient(to left, #0C111D 0%, transparent 100%);
                }
            `}</style>
            <div className={`scroll-list-container ${orientation} ${className}`}>
                <div ref={listRef} className={`scroll-list ${orientation} ${!displayScrollbar ? 'no-scrollbar' : ''}`} onScroll={handleScroll}>
                    {items.map((item, index) => (
                        <AnimatedItem
                            key={index}
                            delay={0.1}
                            index={index}
                            onMouseEnter={() => handleItemMouseEnter(index)}
                            onClick={() => handleItemClick(item, index)}
                        >
                            <div className={`item ${selectedIndex === index ? 'selected' : ''} ${itemClassName}`}>
                                <p className="item-text">{item}</p>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
                {showGradients && (
                    <>
                        <div className="top-gradient" style={{ opacity: topGradientOpacity }}></div>
                        <div className="bottom-gradient" style={{ opacity: bottomGradientOpacity }}></div>
                    </>
                )}
            </div>
        </>
    );
};

export default AnimatedList;

