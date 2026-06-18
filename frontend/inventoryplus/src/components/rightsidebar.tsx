import { motion, AnimatePresence } from "framer-motion";
import { Users01 } from "@untitledui/icons";

interface RightSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Person {
    name: string;
    avatarUrl: string;
}

const PEOPLE_DATA: Person[] = [
    {
        name: "Emma Johnson",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Liam Smith",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Olivia Brown",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Noah Williams",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Ava Davis",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "James Wilson",
        avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Sophia Martinez",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Mason Taylor",
        avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
    },
];

export default function RightSidebar({ isOpen, onClose }: RightSidebarProps) {
    return (
        <>
            <style>{`
                .rs-sidebar-container {
                    position: fixed;
                    top: 12px;
                    right: 12px;
                    bottom: 12px;
                    width: 320px;
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

                @media (prefers-color-scheme: dark) {
                    .rs-sidebar-container {
                        background: #0C111D;
                        border-color: #1F242F;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    }
                }

                /* ── Header ── */
                .rs-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 24px;
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

                @media (prefers-color-scheme: dark) {
                    .rs-title-icon {
                        color: var(--text-h);
                    }
                }

                .rs-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--text-h);
                    margin: 0;
                    letter-spacing: -0.5px;
                    font-family: system-ui, -apple-system, sans-serif;
                }

                @media (prefers-color-scheme: dark) {
                    .rs-title {
                        color: var(--text-h);
                    }
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

                @media (prefers-color-scheme: dark) {
                    .rs-close-btn {
                        background: rgba(255, 255, 255, 0.08);
                        color: var(--text);
                    }
                    .rs-close-btn:hover {
                        background: rgba(255, 255, 255, 0.15);
                    }
                }

                /* ── List of People ── */
                .rs-people-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    overflow-y: auto;
                    flex: 1;
                    padding-right: 4px;
                }

                /* Custom scrollbar */
                .rs-people-list::-webkit-scrollbar {
                    width: 4px;
                }
                .rs-people-list::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 2px;
                }
                .rs-people-list::-webkit-scrollbar-track {
                    background: transparent;
                }

                @media (prefers-color-scheme: dark) {
                    .rs-people-list::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.1);
                    }
                }

                /* ── Person Card ── */
                .rs-person-card {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    background: #f9fafb;
                    padding: 12px 16px;
                    border-radius: 14px;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid rgba(0, 0, 0, 0.04);
                }

                .rs-person-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
                    border-color: rgba(0, 0, 0, 0.08);
                    background: #ffffff;
                }

                @media (prefers-color-scheme: dark) {
                    .rs-person-card {
                        background: #16171d;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                        border-color: rgba(255, 255, 255, 0.03);
                    }
                    .rs-person-card:hover {
                        background: #1f2028;
                        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
                        border-color: rgba(255, 255, 255, 0.08);
                    }
                }

                .rs-avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 1.5px solid rgba(0, 0, 0, 0.05);
                }

                @media (prefers-color-scheme: dark) {
                    .rs-avatar {
                        border-color: rgba(255, 255, 255, 0.08);
                    }
                }

                .rs-name {
                    font-size: 15px;
                    font-weight: 600;
                    color: var(--text-h);
                    font-family: system-ui, -apple-system, sans-serif;
                }

                @media (prefers-color-scheme: dark) {
                    .rs-name {
                        color: var(--text-h);
                    }
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
                        aria-label="People list"
                    >
                        {/* Sidebar Header */}
                        <div className="rs-header">
                            <div className="rs-title-wrap">
                                <Users01 className="rs-title-icon" />
                                <h2 className="rs-title">People</h2>
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

                        {/* Sidebar People List */}
                        <ul className="rs-people-list">
                            {PEOPLE_DATA.map((person) => (
                                <li key={person.name} style={{ width: "100%" }}>
                                    <div className="rs-person-card">
                                        <img
                                            className="rs-avatar"
                                            src={person.avatarUrl}
                                            alt={`${person.name}'s avatar`}
                                            loading="lazy"
                                        />
                                        <span className="rs-name">{person.name}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
