import { useState } from 'react';
import { SidebarNavigationSlimDemo } from './components/sidebar';
import Inventory from './components/Inventory';
import './App.css';

function App() {
  const [activeIndex, setActiveIndex] = useState(0); // 0 = Home, 1 = Inventory
  const [activeSub, setActiveSub] = useState("Overview");
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleItemSelect = (index: number) => {
    setActiveIndex(index);
    if (index === 1) { // Inventory rail tab
      setShowRightSidebar(false);
      setResetKey(prev => prev + 1);
    }
  };

  const handleSubSelect = (label: string) => {
    setActiveSub(label);
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
