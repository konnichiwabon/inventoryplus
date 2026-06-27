import { useState } from 'react';
import { SidebarNavigationSlimDemo } from './features/navigation/Sidebar';
import Inventory from './shared/inventory/Inventory';
import { useLocalStorage } from './shared/hooks/useLocalStorage';
import './App.css';

function App() {
  const [activeIndex, setActiveIndex] = useLocalStorage("inventoryplus_active_index", 0);
  const [activeSub, setActiveSub] = useLocalStorage("inventoryplus_active_sub", "Overview");
  const [showRightSidebar, setShowRightSidebar] = useLocalStorage("inventoryplus_show_right_sidebar", false);
  const [resetKey, setResetKey] = useState(0);

  const handleItemSelect = (index: number) => {
    setActiveIndex(index);
    // Clear selection if explicitly clicking sidebar tab
    localStorage.removeItem("inventoryplus_selected_department");
    localStorage.removeItem("inventoryplus_selected_member_index");
    localStorage.removeItem("inventoryplus_selected_member_username");
    localStorage.removeItem("inventoryplus_show_right_sidebar");
    setShowRightSidebar(false);
    setResetKey(prev => prev + 1);
  };

  const handleSubSelect = (label: string) => {
    setActiveSub(label);
    // Clear selection if explicitly clicking sidebar sub-select
    localStorage.removeItem("inventoryplus_selected_department");
    localStorage.removeItem("inventoryplus_selected_member_index");
    localStorage.removeItem("inventoryplus_selected_member_username");
    localStorage.removeItem("inventoryplus_show_right_sidebar");
    if (label === "Overview" || label === "Products" || label === "Inventory") {
      setShowRightSidebar(false);
      setResetKey(prev => prev + 1);
    }
  };

  const isInventoryView = activeIndex === 1 || (activeIndex === 0 && (activeSub === "Overview" || activeSub === "Products" || activeSub === "Inventory"));

  return (
    <div className="app-layout">
      <SidebarNavigationSlimDemo
        activeIndex={activeIndex}
        onItemSelect={handleItemSelect}
        activeSub={activeSub}
        onSubSelect={handleSubSelect}
      />
      <main className={`app-main ${showRightSidebar ? 'sidebar-open' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', width: '100%' }}>
        {isInventoryView ? (
          <Inventory
            key={resetKey}
            showRightSidebar={showRightSidebar}
            setShowRightSidebar={setShowRightSidebar}
          />
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', width: '100%', color: 'var(--text)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-h)' }}>
              {activeIndex === 0 ? activeSub : "Section"} View
            </h2>
            <p style={{ marginTop: '10px', opacity: 0.7 }}>
              This section is currently under development. Click on <b>Overview</b> or the <b>Inventory</b> icon in the sidebar to see the Profile Cards.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
