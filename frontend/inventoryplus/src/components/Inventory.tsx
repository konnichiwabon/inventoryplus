import { useState, useEffect } from 'react';
import ProfileCard from './profileCard';
import AnimatedCardGrid from './AnimatedCardGrid';
import DepartmentPeopleList from './departmentPeopleList';
import RightSidebar from './rightsidebar';
import InfoCard from './card';

// Custom Clean SVG Icons
const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const KeyboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
    <line x1="6" y1="8" x2="6" y2="8" />
    <line x1="10" y1="8" x2="10" y2="8" />
    <line x1="14" y1="8" x2="14" y2="8" />
    <line x1="18" y1="8" x2="18" y2="8" />
    <line x1="6" y1="12" x2="6" y2="12" />
    <line x1="10" y1="12" x2="10" y2="12" />
    <line x1="14" y1="12" x2="14" y2="12" />
    <line x1="18" y1="12" x2="18" y2="12" />
    <line x1="7" y1="16" x2="17" y2="16" />
  </svg>
);

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 1 9.3a7 7 0 0 1-13.9 1.9" />
    <path d="M19 2c-2.26 6.19-7.74 8.81-12 12" />
  </svg>
);

const cardProps = {
  name: "EDDT",

  handle: "javicodes",
  status: "Online",
  contactText: "Contact Me",
  avatarUrl: "/path/to/avatar.jpg",
  showUserInfo: false,
  enableTilt: true,
  enableMobileTilt: false,
  onContactClick: () => console.log('Contact clicked'),
  behindGlowColor: "rgba(125, 190, 255, 0.67)",
  iconUrl: "/assets/demo/iconpattern.png",
  behindGlowEnabled: true,
  innerGradient: "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)",
};

interface InventoryProps {
  showRightSidebar: boolean;
  setShowRightSidebar: (show: boolean) => void;
  onBackToOverview?: () => void;
}

export default function Inventory({
  showRightSidebar,
  setShowRightSidebar,
  onBackToOverview,
}: InventoryProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number>(-1);

  const [cards, setCards] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");

  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/departments/");
      if (res.ok) {
        const data = await res.json();
        const loadedCards = data.map((dept: any) => ({
          id: dept.id,
          ...cardProps,
          name: dept.name,
        }));
        setCards(loadedCards);
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddCard = () => {
    setShowAddModal(true);
  };

  const handleAddCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/departments/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newDeptName.trim() }),
      });
      if (res.ok) {
        setNewDeptName("");
        setShowAddModal(false);
        fetchDepartments();
      }
    } catch (err) {
      console.error("Error adding department:", err);
    }
  };

  const [members, setMembers] = useState<any[]>([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const fetchMembers = async (deptName: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/departments/${encodeURIComponent(deptName)}/users/`);
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (err) {
      console.error("Error fetching department users:", err);
    }
  };

  useEffect(() => {
    if (selectedDepartment) {
      fetchMembers(selectedDepartment);
    } else {
      setMembers([]);
    }
  }, [selectedDepartment]);

  const handleAddMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !selectedDepartment) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/departments/${encodeURIComponent(selectedDepartment)}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newMemberName.trim(),
          email: newMemberEmail.trim() || null,
        }),
      });
      if (res.ok) {
        setNewMemberName("");
        setNewMemberEmail("");
        setShowAddMemberModal(false);
        fetchMembers(selectedDepartment);
      }
    } catch (err) {
      console.error("Error adding team member:", err);
    }
  };

  const memberList = selectedDepartment ? members.map(m => {
    return `${m.username}${m.email ? ` (${m.email})` : ""}`;
  }) : [];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {selectedDepartment ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '16px' }}>
            <button
              onClick={() => {
                setSelectedDepartment(null);
                setShowRightSidebar(false);
                setSelectedMemberIndex(-1);
                if (onBackToOverview) onBackToOverview();
              }}
              style={{
                padding: '10px 18px',
                backgroundColor: 'var(--code-bg)',
                color: 'var(--text-h)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--border)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--code-bg)';
              }}
            >
              ← Back to Departments
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {selectedMemberIndex === -1 && (
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: '#7F56D9',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(16, 24, 40, 0.05)',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6941C6')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#7F56D9')}
                >
                  + Add Member
                </button>
              )}
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: 'var(--text-h)' }}>
                {selectedDepartment} Diagnostics
              </h2>
            </div>
          </div>

          {/* Diagnostic Grid - Only shown when a member is selected */}
          {selectedMemberIndex !== -1 && memberList[selectedMemberIndex] && (() => {
            const selectedMemberName = memberList[selectedMemberIndex];
            const name = selectedMemberName.split(' (')[0];

            const getMemberWorkstationSpecs = (mName: string, dept: string) => {
              if (mName.includes("Sarah Connor")) {
                return {
                  system: [
                    { label: "Hostname", value: `${dept.toUpperCase()}-WKSTN` },
                    { label: "OS", value: "Ubuntu 24.04 LTS (Noble Numbat)" },
                    { label: "Kernel", value: "6.8.0-35-generic" },
                    { label: "Shell", value: "bash 5.2.21" },
                    { label: "Uptime", value: "4h 32m" }
                  ],
                  hardware: [
                    { label: "CPU", value: "Intel Core i7-12700K (20) @ 4.90GHz" },
                    { label: "RAM", value: "32.0 GB (16.2 GB used)" },
                    { label: "Storage", value: "1.0 TB NVMe SSD (42% free)" },
                    { label: "Architecture", value: "x86_64" },
                    { label: "Temperature", value: "42°C" }
                  ],
                  graphics: [
                    { label: "GPU", value: "NVIDIA GeForce RTX 3070 (8GB)" },
                    { label: "Driver", value: "NVIDIA 550.67" },
                    { label: "Display", value: "2560x1440 @ 144Hz (DP)" },
                    { label: "OpenGL", value: "4.6.0 NVIDIA" }
                  ],
                  network: [
                    { label: "IP Address", value: "192.168.1.142" },
                    { label: "Gateway", value: "192.168.1.1" },
                    { label: "Connection", value: "Ethernet (1000 Mbps)" },
                    { label: "DNS", value: "8.8.8.8, 1.1.1.1" },
                    { label: "MAC Address", value: "e0:d5:5e:a1:b2:c3" }
                  ],
                  peripherals: [
                    { label: "Keyboard", value: "Keychron K2 (Bluetooth)" },
                    { label: "Mouse", value: "Logitech MX Master 3S" },
                    { label: "IDE", value: "VS Code 1.90.1" },
                    { label: "Node version", value: "v20.14.0" }
                  ],
                  eco: [
                    { label: "Power State", value: "AC Connected (100%)" },
                    { label: "Power Plan", value: "Power Saver (Auto)" },
                    { label: "Screen Timeout", value: "5 minutes" },
                    { label: "Eco Score", value: <span className="eco-badge">87 / 100</span> }
                  ]
                };
              }

              return {
                system: [
                  { label: "Hostname", value: `${mName.toUpperCase().replace(/\s+/g, '-')}-PC` },
                  { label: "OS", value: "Windows 11 Pro" },
                  { label: "Kernel", value: "10.0.22631" },
                  { label: "Shell", value: "PowerShell 7.4" },
                  { label: "Uptime", value: "2h 15m" }
                ],
                hardware: [
                  { label: "CPU", value: "AMD Ryzen 5 5600X @ 3.70GHz" },
                  { label: "RAM", value: "16.0 GB (8.4 GB used)" },
                  { label: "Storage", value: "512 GB NVMe SSD (50% free)" },
                  { label: "Architecture", value: "x86_64" },
                  { label: "Temperature", value: "38°C" }
                ],
                graphics: [
                  { label: "GPU", value: "AMD Radeon RX 6600 (8GB)" },
                  { label: "Driver", value: "Adrenalin 24.3.1" },
                  { label: "Display", value: "1920x1080 @ 144Hz (HDMI)" },
                  { label: "OpenGL", value: "4.6.0" }
                ],
                network: [
                  { label: "IP Address", value: "192.168.1.105" },
                  { label: "Gateway", value: "192.168.1.1" },
                  { label: "Connection", value: "Wi-Fi (866 Mbps)" },
                  { label: "DNS", value: "8.8.8.8" },
                  { label: "MAC Address", value: "00:11:22:33:44:55" }
                ],
                peripherals: [
                  { label: "Keyboard", value: "Standard Membrane" },
                  { label: "Mouse", value: "Standard Optical" },
                  { label: "IDE", value: "VS Code 1.90.1" },
                  { label: "Node version", value: "v20.14.0" }
                ],
                eco: [
                  { label: "Power State", value: "AC Connected (90%)" },
                  { label: "Power Plan", value: "Balanced" },
                  { label: "Screen Timeout", value: "10 minutes" },
                  { label: "Eco Score", value: <span className="eco-badge">92 / 100</span> }
                ]
              };
            };

            const specs = getMemberWorkstationSpecs(name, selectedDepartment);

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-h)', margin: 0 }}>
                  {name}'s Workstation Diagnostics
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '24px',
                  width: '100%',
                }}>
                  <InfoCard
                    title="System & Identification"
                    icon={<MonitorIcon />}
                    variant="green"
                    items={specs.system}
                  />

                  <InfoCard
                    title="Internal Hardware"
                    icon={<CpuIcon />}
                    variant="orange"
                    items={specs.hardware}
                  />

                  <InfoCard
                    title="Graphics & Display"
                    icon={<MonitorIcon />}
                    variant="blue"
                    items={specs.graphics}
                  />

                  <InfoCard
                    title="Network"
                    icon={<GlobeIcon />}
                    variant="beige"
                    items={specs.network}
                  />

                  <InfoCard
                    title="Peripherals & Software"
                    icon={<KeyboardIcon />}
                    variant="blue"
                    items={specs.peripherals}
                  />

                  <InfoCard
                    title="Integrated Eco-Features"
                    icon={<LeafIcon />}
                    variant="green"
                    items={specs.eco}
                  />
                </div>
              </div>
            );
          })()}

          {selectedMemberIndex === -1 && (
            <div style={{ marginTop: '32px', width: '100%' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-h)', marginBottom: '16px' }}>
                Department Team Members
              </h3>
              <DepartmentPeopleList
                items={memberList}
                onItemSelect={(name, index) => {
                  console.log('Selected team member:', name, 'at index:', index);
                  setSelectedMemberIndex(index);
                  setShowRightSidebar(true);
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <>
          <button
            onClick={handleAddCard}
            style={{
              padding: '10px 16px',
              backgroundColor: '#7F56D9',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(16, 24, 40, 0.05)',
              transition: 'background-color 0.2s',
              width: 'fit-content'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6941C6')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#7F56D9')}
          >
            + Add Card
          </button>

          <AnimatedCardGrid gap={32} cardWidth={316} cardHeight={440}>
            {cards.map((card) => (
              <ProfileCard
                key={card.id}
                {...card}
                onCardClick={() => {
                  setSelectedDepartment(card.name || null);
                  setShowRightSidebar(false);
                  setSelectedMemberIndex(-1);
                }}
              />
            ))}
          </AnimatedCardGrid>
        </>
      )}
      <RightSidebar
        isOpen={showRightSidebar}
        title={`${selectedDepartment || ''} Team`}
        items={memberList}
        onClose={() => {
          setShowRightSidebar(false);
          setSelectedMemberIndex(-1);
        }}
        initialSelectedIndex={selectedMemberIndex}
        onItemSelect={(_name, index) => {
          setSelectedMemberIndex(index);
        }}
      />

      {/* Add Department Modal */}
      {showAddModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              backgroundColor: "var(--bg, #fff)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
              width: "100%",
              maxWidth: "400px",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
              margin: "0 16px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: 700, color: "var(--text-h)" }}>
              Add Department Card
            </h3>
            <form onSubmit={handleAddCardSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-h)" }}>
                  Department Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Engineering, Marketing, Finance"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "transparent",
                    color: "var(--text-h)",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewDeptName("");
                  }}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "var(--code-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--text-h)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "#7F56D9",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6941C6')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#7F56D9')}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowAddMemberModal(false)}
        >
          <div
            style={{
              backgroundColor: "var(--bg, #fff)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
              width: "100%",
              maxWidth: "400px",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
              margin: "0 16px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: 700, color: "var(--text-h)" }}>
              Add Team Member
            </h3>
            <form onSubmit={handleAddMemberSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-h)" }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  autoFocus
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "transparent",
                    color: "var(--text-h)",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-h)" }}>
                  Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "transparent",
                    color: "var(--text-h)",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddMemberModal(false);
                    setNewMemberName("");
                    setNewMemberEmail("");
                  }}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "var(--code-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--text-h)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "#7F56D9",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6941C6')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#7F56D9')}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
