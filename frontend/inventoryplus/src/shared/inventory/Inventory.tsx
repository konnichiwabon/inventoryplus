import { useState, useEffect } from 'react';
import ProfileCard from '../../features/department/ProfileCard';
import AnimatedCardGrid from './AnimatedCardGrid';
import DepartmentPeopleList from '../../features/department/DepartmentPeopleList';
import RightSidebar from '../../features/navigation/RightSidebar';
import AddDepartmentModal from './components/AddDepartmentModal';
import AddMemberModal from './components/AddMemberModal';
import EditSpecsModal from './components/EditSpecsModal';
import DiagnosticsGrid from './components/DiagnosticsGrid';
import { useInventoryApi } from './hooks/useInventoryApi';
import { getDefaultWorkstationSpecs } from './hooks/useWorkstationSpecs';





const CARD_TEMPLATES: Record<string, any> = {
  "Asset Details": [
    { label: "Asset Tag", value: "" },
    { label: "Username", value: "" },
    { label: "Date Recorded", value: "" }
  ],
  "Operating System": [
    [
      { label: "OS Name", value: "" },
      { label: "OS Version", value: "" },
      { label: "OS Architecture", value: "" },
      { label: "Partition", value: "" }
    ]
  ],
  "Motherboard": [
    { label: "MB Manufacturer", value: "" },
    { label: "MB Model", value: "" },
    { label: "MB Serial Number", value: "" },
    { label: "BIOS Serial Number", value: "" },
    { label: "Case", value: "" }
  ],
  "CPU": [
    { label: "CPU Manufacturer", value: "" },
    { label: "CPU Model", value: "" },
    { label: "CPU Cores", value: "" },
    { label: "CPU Threads", value: "" }
  ],
  "RAM": [
    [
      { label: "RAM Capacity", value: "" },
      { label: "RAM Speed", value: "" },
      { label: "RAM Model", value: "" },
      { label: "RAM Slot Number", value: "" },
      { label: "RAM Serial Number", value: "" }
    ]
  ],
  "Storage": [
    [
      { label: "Storage Capacity", value: "" },
      { label: "Storage Type", value: "" },
      { label: "Storage Interface", value: "" },
      { label: "Storage Serial Number", value: "" }
    ]
  ],
  "GPU": [
    { label: "GPU Manufacturer", value: "" },
    { label: "GPU Model", value: "" },
    { label: "GPU VRAM", value: "" },
    { label: "Driver Version", value: "" },
    { label: "GPU Serial Number", value: "" }
  ],
  "Monitor": [
    [
      { label: "Monitor Brand", value: "" },
      { label: "Monitor Model", value: "" },
      { label: "Monitor Resolution", value: "" },
      { label: "Monitor Serial Number", value: "" }
    ]
  ],
  "Network": [
    { label: "Current IP", value: "" },
    { label: "MAC Address", value: "" },
    { label: "DHCP Enabled", value: "" },
    { label: "Port Number", value: "" },
    { label: "VLAN ID", value: "" },
    { label: "Omada Username", value: "" }
  ],
  "Peripherals": [
    [
      { label: "Peripheral Type", value: "" },
      { label: "Peripheral Brand", value: "" },
      { label: "Peripheral Model", value: "" },
      { label: "Peripheral Serial Number", value: "" }
    ]
  ]
};

const mergeWithTemplate = (cardTitle: string, currentItems: any[]): any[] => {
  const template = CARD_TEMPLATES[cardTitle];
  if (!template) return currentItems;

  const isMulti = ["os", "ram", "storage", "monitor", "peripherals"].includes(
    cardTitle === "Operating System" ? "os" :
      cardTitle === "RAM" ? "ram" :
        cardTitle === "Storage" ? "storage" :
          cardTitle === "GPU" ? "gpu" :
            cardTitle === "Monitor" ? "monitor" :
              cardTitle === "Peripherals" ? "peripherals" : ""
  );

  if (isMulti) {
    if (!Array.isArray(currentItems) || currentItems.length === 0) {
      return [template[0] || template];
    }
    return currentItems.map((instance: any) => {
      const flatInstance = Array.isArray(instance) ? instance : [instance];
      const templateFlat = Array.isArray(template[0]) ? template[0] : template;
      return templateFlat.map((tempItem: any) => {
        const found = flatInstance.find((item: any) => item && item.label === tempItem.label);
        return {
          label: tempItem.label,
          value: found ? String(found.value || "") : ""
        };
      });
    });
  } else {
    const flatItems = Array.isArray(currentItems) ? currentItems : [];
    return template.map((tempItem: any) => {
      const found = flatItems.find((item: any) => item && item.label === tempItem.label);
      return {
        label: tempItem.label,
        value: found ? String(found.value || "") : ""
      };
    });
  }
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
  const {
    selectedDepartment,
    setSelectedDepartment,
    selectedMemberIndex,
    setSelectedMemberIndex,
    cards,
    members,
    workstationSpecs,
    isSubmittingMember,
    memberList,
    selectedMemberName,
    selectedMemberCleanName,
    currentMemberKey,
    selectedMemberObj,
    setWorkstationSpecs,
    handleAddCardSubmit,
    handleAddMemberSubmit,
    handleSaveCardEdits,
    handleDeleteCard,
  } = useInventoryApi();

  const [editingCardTitle, setEditingCardTitle] = useState<string | null>(null);
  const [editingCardItems, setEditingCardItems] = useState<any[]>([]);
  const [addCardDropdownOpen, setAddCardDropdownOpen] = useState(false);

  useEffect(() => {
    setAddCardDropdownOpen(false);
  }, [selectedMemberIndex, selectedDepartment]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");

  const handleAddCard = () => {
    setShowAddModal(true);
  };

  const onAddCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;
    const success = await handleAddCardSubmit(newDeptName);
    if (success) {
      setNewDeptName("");
      setShowAddModal(false);
    }
  };

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const onAddMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !selectedDepartment) return;
    const success = await handleAddMemberSubmit(newMemberName, newMemberEmail);
    if (success) {
      setNewMemberName("");
      setNewMemberEmail("");
      setShowAddMemberModal(false);
    }
  };

  const onSaveCardEdits = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCardTitle) return;
    handleSaveCardEdits(editingCardTitle, editingCardItems);
    setEditingCardTitle(null);
  };

  const handleAddSpecCard = (cardTitle: string, currentSpecs: any) => {
    let categoryKey = "";
    if (cardTitle === "Asset Details") categoryKey = "assets";
    else if (cardTitle === "Operating System") categoryKey = "os";
    else if (cardTitle === "Motherboard") categoryKey = "motherboard";
    else if (cardTitle === "CPU") categoryKey = "cpu";
    else if (cardTitle === "RAM") categoryKey = "ram";
    else if (cardTitle === "Storage") categoryKey = "storage";
    else if (cardTitle === "GPU") categoryKey = "gpu";
    else if (cardTitle === "Network") categoryKey = "network";
    else if (cardTitle === "Peripherals") categoryKey = "peripherals";
    else if (cardTitle === "Monitor") categoryKey = "monitor";

    if (!categoryKey) return;

    let template = CARD_TEMPLATES[cardTitle] || [];

    // For "assets", preserve existing UUID and Omada Username if there is one
    if (categoryKey === "assets" && currentSpecs.assets) {
      const existingUuid = currentSpecs.assets.find((item: any) => item.label === "Asset UUID");
      const existingOmada = currentSpecs.assets.find((item: any) => item.label === "Omada Username");
      const extra = [];
      if (existingUuid) extra.push(existingUuid);
      if (existingOmada) extra.push(existingOmada);
      template = [...extra, ...template.filter((item: any) => item.label !== "Asset UUID" && item.label !== "Omada Username")];
    }

    // Auto-populate Date Recorded if empty
    if (cardTitle === "Asset Details") {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const formattedNow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      template = template.map((item: any) => {
        if (item.label === "Date Recorded" && !item.value) {
          return { ...item, value: formattedNow };
        }
        return item;
      });
    }

    setEditingCardTitle(cardTitle);
    const formItems = template.filter((item: any) => item.label !== "Asset UUID");
    setEditingCardItems(JSON.parse(JSON.stringify(formItems)));
  };

  const onDeleteCard = (cardTitle: string) => {
    handleDeleteCard(cardTitle);
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
            const name = memberList[selectedMemberIndex].split(' (')[0];
            const specs = workstationSpecs[currentMemberKey] || getDefaultWorkstationSpecs(name, selectedDepartment || "");

            const handleCardClick = (cardTitle: string, currentItems: any[]) => {
              setEditingCardTitle(cardTitle);
              const merged = mergeWithTemplate(cardTitle, currentItems);
              setEditingCardItems(merged.map(item => {
                if (Array.isArray(item)) {
                  return item.map(subItem => ({
                    label: subItem.label,
                    value: String(subItem.value || "")
                  }));
                }

                let val = String(item.value || "");
                if (cardTitle === "Asset Details" && item.label === "Date Recorded" && !val) {
                  const now = new Date();
                  const year = now.getFullYear();
                  const month = String(now.getMonth() + 1).padStart(2, '0');
                  const day = String(now.getDate()).padStart(2, '0');
                  const hours = String(now.getHours()).padStart(2, '0');
                  const minutes = String(now.getMinutes()).padStart(2, '0');
                  const seconds = String(now.getSeconds()).padStart(2, '0');
                  val = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                }

                return {
                  label: item.label,
                  value: val
                };
              }));
            };

            return (
              <DiagnosticsGrid
                specs={specs}
                memberName={name}
                onCardEdit={handleCardClick}
                onAddSpecCard={handleAddSpecCard}
                addCardDropdownOpen={addCardDropdownOpen}
                setAddCardDropdownOpen={setAddCardDropdownOpen}
              />
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
      <AddDepartmentModal
        isOpen={showAddModal}
        newDeptName={newDeptName}
        setNewDeptName={setNewDeptName}
        onClose={() => {
          setShowAddModal(false);
          setNewDeptName("");
        }}
        onSubmit={onAddCardSubmit}
      />

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={showAddMemberModal}
        onClose={() => {
          setShowAddMemberModal(false);
          setNewMemberName("");
          setNewMemberEmail("");
        }}
        onSubmit={onAddMemberSubmit}
        newMemberName={newMemberName}
        setNewMemberName={setNewMemberName}
        newMemberEmail={newMemberEmail}
        setNewMemberEmail={setNewMemberEmail}
        isSubmittingMember={isSubmittingMember}
      />

      {/* Edit Specs Modal */}
      <EditSpecsModal
        editingCardTitle={editingCardTitle}
        setEditingCardTitle={setEditingCardTitle}
        editingCardItems={editingCardItems}
        setEditingCardItems={setEditingCardItems}
        handleSaveCardEdits={onSaveCardEdits}
        handleDeleteCard={onDeleteCard}
      />
    </div>
  );
}
