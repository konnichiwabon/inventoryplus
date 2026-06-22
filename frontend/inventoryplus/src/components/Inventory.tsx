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

const getDefaultWorkstationSpecs = (mName: string, dept: string) => {
  if (mName.includes("Sarah Connor")) {
    return {
      assets: [
        { label: "Asset UUID", value: "8f12b3c4-e567-8901-abcd-ef1234567890" },
        { label: "Asset Tag", value: "AST-9821" },
        { label: "Hostname", value: `${dept.toUpperCase()}-WKSTN` },
        { label: "Omada Username", value: "omada_admin" },
        { label: "OS Version", value: "Ubuntu 24.04 LTS" },
        { label: "Date Recorded", value: "2026-06-22" }
      ],
      motherboard: [
        { label: "MB Manufacturer", value: "ASUSTeK COMPUTER INC." },
        { label: "MB Model", value: "ROG STRIX B550-F GAMING" },
        { label: "MB Serial Number", value: "L8M0KC061920" },
        { label: "BIOS Serial Number", value: "MB-1234567890" }
      ],
      cpu: [
        { label: "CPU Manufacturer", value: "AMD" },
        { label: "CPU Model", value: "AMD Ryzen 5 5600X @ 3.70GHz" },
        { label: "CPU Cores", value: "6" },
        { label: "CPU Threads", value: "12" }
      ],
      ram: [
        { label: "RAM Capacity", value: "16 GB" },
        { label: "RAM Speed", value: "3200 MHz" },
        { label: "RAM Model", value: "Corsair Vengeance LPX" },
        { label: "RAM Slot Number", value: "DIMM_A2" },
        { label: "RAM Serial Number", value: "CMK16GX4M2B3200C16" }
      ],
      storage: [
        { label: "Storage Type", value: "SSD (NVMe)" },
        { label: "Storage Capacity", value: "512 GB" },
        { label: "Storage Interface", value: "PCIe Gen 4.0" },
        { label: "Storage Serial Number", value: "S67ENX0R203920" }
      ],
      gpu: [
        { label: "GPU Manufacturer", value: "AMD" },
        { label: "GPU Model", value: "AMD Radeon RX 6600" },
        { label: "GPU VRAM", value: "8 GB GDDR6" },
        { label: "Driver Version", value: "Adrenalin 24.3.1" },
        { label: "GPU Serial Number", value: "SN-GPU-987654321" }
      ],
      network: [
        { label: "Current IP", value: "192.168.1.105" },
        { label: "MAC Address", value: "00:11:22:33:44:55" },
        { label: "DHCP Enabled", value: "true" },
        { label: "Port Number", value: "22" },
        { label: "VLAN ID", value: "10" },
        { label: "Omada Username", value: "net_admin" }
      ],
      peripherals: [
        { label: "Peripheral Type", value: "Keyboard" },
        { label: "Peripheral Brand", value: "Keychron" },
        { label: "Peripheral Model", value: "K2 (Bluetooth)" },
        { label: "Peripheral Serial Number", value: "SN-PER-4819" }
      ],
      software: [
        { label: "Software Name", value: "VS Code" },
        { label: "Software Version", value: "1.90.1" },
        { label: "License Type", value: "Open Source" },
        { label: "License Key", value: "N/A" },
        { label: "Install Date", value: "2026-06-15" },
        { label: "Installed By", value: "admin" },
        { label: "Status", value: "Active" }
      ]
    };
  }

  return {
    assets: [
      { label: "Asset UUID", value: "6c23a4b5-d789-0123-bcde-fa3456789012" },
      { label: "Asset Tag", value: "AST-4412" },
      { label: "Hostname", value: `${mName.toUpperCase().replace(/\s+/g, '-')}-PC` },
      { label: "Omada Username", value: "omada_admin" },
      { label: "OS Version", value: "Windows 11 Pro" },
      { label: "Date Recorded", value: "2026-06-22" }
    ],
    motherboard: [
      { label: "MB Manufacturer", value: "Micro-Star International Co., Ltd." },
      { label: "MB Model", value: "PRO Z690-A WIFI" },
      { label: "MB Serial Number", value: "L9M1KC071821" },
      { label: "BIOS Serial Number", value: "MS-7D25" }
    ],
    cpu: [
      { label: "CPU Manufacturer", value: "Intel" },
      { label: "CPU Model", value: "Intel Core i7-12700K @ 4.90GHz" },
      { label: "CPU Cores", value: "12" },
      { label: "CPU Threads", value: "20" }
    ],
    ram: [
      { label: "RAM Capacity", value: "32 GB" },
      { label: "RAM Speed", value: "5200 MHz" },
      { label: "RAM Model", value: "G.Skill Trident Z5" },
      { label: "RAM Slot Number", value: "DIMM_B2" },
      { label: "RAM Serial Number", value: "F5-5200J4040A16GX2" }
    ],
    storage: [
      { label: "Storage Type", value: "SSD (NVMe)" },
      { label: "Storage Capacity", value: "1 TB" },
      { label: "Storage Interface", value: "PCIe Gen 4.0 x4" },
      { label: "Storage Serial Number", value: "S67ENX0R203920" }
    ],
    gpu: [
      { label: "GPU Manufacturer", value: "NVIDIA" },
      { label: "GPU Model", value: "NVIDIA GeForce RTX 3070" },
      { label: "GPU VRAM", value: "8 GB" },
      { label: "Driver Version", value: "NVIDIA 550.67" },
      { label: "GPU Serial Number", value: "SN-GPU-987654321" }
    ],
    network: [
      { label: "Current IP", value: "192.168.1.142" },
      { label: "MAC Address", value: "e0:d5:5e:a1:b2:c3" },
      { label: "DHCP Enabled", value: "true" },
      { label: "Port Number", value: "80" },
      { label: "VLAN ID", value: "20" },
      { label: "Omada Username", value: "net_admin" }
    ],
    peripherals: [
      { label: "Peripheral Type", value: "Mouse" },
      { label: "Peripheral Brand", value: "Logitech" },
      { label: "Peripheral Model", value: "MX Master 3S" },
      { label: "Peripheral Serial Number", value: "SN-PER-12345" }
    ],
    software: [
      { label: "Software Name", value: "VS Code" },
      { label: "Software Version", value: "1.90.1" },
      { label: "License Type", value: "Open Source" },
      { label: "License Key", value: "N/A" },
      { label: "Install Date", value: "2026-06-15" },
      { label: "Installed By", value: "admin" },
      { label: "Status", value: "Active" }
    ]
  };
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
  const [workstationSpecs, setWorkstationSpecs] = useState<{ [key: string]: any }>({});
  const [editingCardTitle, setEditingCardTitle] = useState<string | null>(null);
  const [editingCardItems, setEditingCardItems] = useState<{ label: string, value: string }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("inventoryplus_workstation_specs");
    if (saved) {
      try {
        setWorkstationSpecs(JSON.parse(saved));
      } catch (err) {
        console.error("Error parsing saved workstation specs:", err);
      }
    }
  }, []);

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

  const selectedMemberName = selectedDepartment && selectedMemberIndex !== -1 && memberList[selectedMemberIndex]
    ? memberList[selectedMemberIndex]
    : "";
  const selectedMemberCleanName = selectedMemberName ? selectedMemberName.split(' (')[0] : "";
  const currentMemberKey = selectedDepartment && selectedMemberCleanName
    ? `${selectedDepartment}-${selectedMemberCleanName}`
    : "";

  const handleSaveCardEdits = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMemberKey || !editingCardTitle) return;

    let categoryKey = "";
    if (editingCardTitle === "Asset & OS") categoryKey = "assets";
    else if (editingCardTitle === "Motherboard") categoryKey = "motherboard";
    else if (editingCardTitle === "CPU") categoryKey = "cpu";
    else if (editingCardTitle === "RAM") categoryKey = "ram";
    else if (editingCardTitle === "Storage") categoryKey = "storage";
    else if (editingCardTitle === "GPU") categoryKey = "gpu";
    else if (editingCardTitle === "Network") categoryKey = "network";
    else if (editingCardTitle === "Peripherals") categoryKey = "peripherals";
    else if (editingCardTitle === "Software") categoryKey = "software";

    if (!categoryKey) return;

    const saved = localStorage.getItem("inventoryplus_workstation_specs");
    let currentSpecsDict: any = {};
    if (saved) {
      try {
        currentSpecsDict = JSON.parse(saved);
      } catch (err) {
        console.error(err);
      }
    }

    const currentMemberSpecs = currentSpecsDict[currentMemberKey] || getDefaultWorkstationSpecs(selectedMemberCleanName, selectedDepartment || "");

    const updatedSpecs = {
      ...currentMemberSpecs,
      [categoryKey]: editingCardItems.map(item => ({
        label: item.label,
        value: item.value
      }))
    };

    const newWorkstationSpecs = {
      ...workstationSpecs,
      [currentMemberKey]: updatedSpecs
    };

    setWorkstationSpecs(newWorkstationSpecs);
    localStorage.setItem("inventoryplus_workstation_specs", JSON.stringify(newWorkstationSpecs));
    setEditingCardTitle(null);
  };

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
          </div>          {/* Diagnostic Grid - Only shown when a member is selected */}
          {selectedMemberIndex !== -1 && memberList[selectedMemberIndex] && (() => {
            const selectedMemberName = memberList[selectedMemberIndex];
            const name = selectedMemberName.split(' (')[0];

            const specs = workstationSpecs[currentMemberKey] || getDefaultWorkstationSpecs(name, selectedDepartment || "");

            const handleCardClick = (cardTitle: string, currentItems: any[]) => {
              setEditingCardTitle(cardTitle);
              setEditingCardItems(currentItems.map(item => ({
                label: item.label,
                value: String(item.value || "")
              })));
            };

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
                    title="Asset & OS"
                    icon={<MonitorIcon />}
                    variant="green"
                    items={specs.assets || []}
                    onEdit={() => handleCardClick("Asset & OS", specs.assets || [])}
                  />

                  <InfoCard
                    title="Motherboard"
                    icon={<CpuIcon />}
                    variant="orange"
                    items={specs.motherboard || []}
                    onEdit={() => handleCardClick("Motherboard", specs.motherboard || [])}
                  />

                  <InfoCard
                    title="CPU"
                    icon={<CpuIcon />}
                    variant="orange"
                    items={specs.cpu || []}
                    onEdit={() => handleCardClick("CPU", specs.cpu || [])}
                  />

                  <InfoCard
                    title="RAM"
                    icon={<MonitorIcon />}
                    variant="blue"
                    items={specs.ram || []}
                    onEdit={() => handleCardClick("RAM", specs.ram || [])}
                  />

                  <InfoCard
                    title="Storage"
                    icon={<MonitorIcon />}
                    variant="blue"
                    items={specs.storage || []}
                    onEdit={() => handleCardClick("Storage", specs.storage || [])}
                  />

                  <InfoCard
                    title="GPU"
                    icon={<MonitorIcon />}
                    variant="blue"
                    items={specs.gpu || []}
                    onEdit={() => handleCardClick("GPU", specs.gpu || [])}
                  />

                  <InfoCard
                    title="Network"
                    icon={<GlobeIcon />}
                    variant="beige"
                    items={specs.network || []}
                    onEdit={() => handleCardClick("Network", specs.network || [])}
                  />

                  <InfoCard
                    title="Peripherals"
                    icon={<KeyboardIcon />}
                    variant="green"
                    items={specs.peripherals || []}
                    onEdit={() => handleCardClick("Peripherals", specs.peripherals || [])}
                  />

                  <InfoCard
                    title="Software"
                    icon={<KeyboardIcon />}
                    variant="green"
                    items={specs.software || []}
                    onEdit={() => handleCardClick("Software", specs.software || [])}
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

      {/* Edit Specs Modal */}
      {editingCardTitle !== null && (
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
          onClick={() => setEditingCardTitle(null)}
        >
          <div
            style={{
              backgroundColor: "var(--bg, #fff)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
              width: "100%",
              maxWidth: "450px",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
              margin: "0 16px",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: 700, color: "var(--text-h)" }}>
              Edit {editingCardTitle} Specs
            </h3>
            <form onSubmit={handleSaveCardEdits} style={{ display: "flex", flexDirection: "column", gap: "16px", overflowY: "auto", paddingRight: "4px", flex: 1 }}>
              {editingCardItems.map((item, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
                    {item.label}
                  </label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => {
                      const updatedItems = [...editingCardItems];
                      updatedItems[idx].value = e.target.value;
                      setEditingCardItems(updatedItems);
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
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
              ))}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px", paddingBottom: "4px" }}>
                <button
                  type="button"
                  onClick={() => setEditingCardTitle(null)}
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
