import { useState } from 'react'
import ProfileCard from './components/profileCard'
import AnimatedCardGrid from './components/AnimatedCardGrid'
import { SidebarNavigationSlimDemo } from './components/sidebar'
import './App.css'
import DepartmentPeopleList from './components/departmentPeopleList'
const cardProps = {
  name: "EDDT",
  title: "EHANCE ARMAMENT",
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
}

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const [cards, setCards] = useState([
    { id: 1, ...cardProps, name: "Engineering" },
    { id: 2, ...cardProps, name: "Marketing" },
    { id: 3, ...cardProps, name: "Finance" },
    { id: 4, ...cardProps, name: "Sales" },
    { id: 5, ...cardProps, name: "Sheesh" },
  ])

  const handleAddCard = () => {
    setCards([...cards, { id: Date.now(), ...cardProps, name: `Department ${cards.length + 1}` }])
  }

  return (
    <div className="app-layout">
      <SidebarNavigationSlimDemo />
      <main className="app-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', width: '100%' }}>
        {selectedDepartment ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
            <button
              onClick={() => setSelectedDepartment(null)}
              style={{
                padding: '10px 18px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                alignSelf: 'flex-start',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              ← Back to Departments
            </button>
            
            <div style={{ color: '#fff' }}>
              <h2 style={{ fontSize: '2rem', margin: '0 0 8px 0', fontWeight: 700 }}>
                {selectedDepartment} Team
              </h2>
            </div>

            <DepartmentPeopleList 
              items={[
                `Sarah Connor (${selectedDepartment} Lead)`,
                `John Doe (Senior Developer)`,
                `Jane Smith (UX Designer)`,
                `Alex Rivera (Product Manager)`
              ]}
              onItemSelect={(name) => console.log('Selected team member:', name)}
            />
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
                  onCardClick={() => setSelectedDepartment(card.name)} 
                />
              ))}
            </AnimatedCardGrid>
          </>
        )}
      </main>
    </div>
  )
}

export default App
