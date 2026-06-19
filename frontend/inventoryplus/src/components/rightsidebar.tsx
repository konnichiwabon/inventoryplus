import { motion, AnimatePresence } from "framer-motion";
import { Users01 } from "@untitledui/icons";
import AnimatedList from "./AnimatedList";

interface RightSidebarProps {
    isOpen: boolean;
    title: string;
    items: string[];
    onClose: () => void;
    onItemSelect?: (item: string, index: number) => void;
    initialSelectedIndex?: number;
}

export default function RightSidebar({ isOpen, title, items, onClose, onItemSelect, initialSelectedIndex }: RightSidebarProps) {

    return (
        <>
            <style>{`
                .rs-sidebar-container {
                    position: fixed;
                    top: 12px;
                    right: 12px;
                    bottom: 12px;
                    width: 360px;
                    background: #ffffff;
                    border-radius: 20px;
                    box-sizing: border-box;
                    padding: 24px 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid #EAECF0;
                }

                .dark .rs-sidebar-container {
                    background: #0C111D;
                    border-color: #1F242F;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }

                /* ── Header ── */
                .rs-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 16px;
                    padding-bottom: 8px;
                }

                .rs-title-wrap {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .rs-title-icon {
                    width: 24px;
                    height: 24px;
                    color: var(--text-h);
                }

                .rs-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--text-h);
                    margin: 0;
                    letter-spacing: -0.5px;
                    font-family: system-ui, -apple-system, sans-serif;
                }

                /* ── Close Button ── */
                .rs-close-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(0, 0, 0, 0.05);
                    color: var(--text);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .rs-close-btn:hover {
                    background: rgba(0, 0, 0, 0.1);
                    transform: scale(1.08);
                }

                .dark .rs-close-btn {
                    background: rgba(255, 255, 255, 0.08);
                    color: var(--text);
                }
                .dark .rs-close-btn:hover {
                    background: rgba(255, 255, 255, 0.15);
                }

                /* ── List Wrapper ── */
                .rs-list-wrapper {
                    flex: 1;
                    width: 100%;
                    overflow-y: auto;
                    margin-top: 10px;
                }

                /* Override AnimatedList max-height for sidebar integration */
                .rs-animated-list.scroll-list-container.vertical {
                    max-width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .rs-animated-list .scroll-list.vertical {
                    max-height: none;
                    flex: 1;
                }

                /* ── Responsiveness ── */
                @media (max-width: 480px) {
                    .rs-sidebar-container {
                        width: calc(100% - 24px);
                        right: 12px;
                        left: 12px;
                    }
                }
            `}</style>

            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        className="rs-sidebar-container"
                        initial={{ x: "110%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "110%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                        aria-label="Department People List"
                    >
                        {/* Sidebar Header */}
                        <div className="rs-header">
                            <div className="rs-title-wrap">
                                <Users01 className="rs-title-icon" />
                                <h2 className="rs-title">{title}</h2>
                            </div>
                            <button
                                className="rs-close-btn"
                                onClick={onClose}
                                aria-label="Close sidebar"
                                type="button"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Animated List of Department Members */}
                        <div className="rs-list-wrapper">
                            <AnimatedList
                                className="rs-animated-list"
                                items={items}
                                onItemSelect={onItemSelect}
                                orientation="vertical"
                                initialSelectedIndex={initialSelectedIndex}
                            />
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
