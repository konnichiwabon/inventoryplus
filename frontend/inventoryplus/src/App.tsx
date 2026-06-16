import { useState } from 'react'
import ProfileCard from './components/profileCard'
import AnimatedCardGrid from './components/AnimatedCardGrid'
import { SidebarNavigationSlimDemo } from './components/sidebar'
import './App.css'

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
  const [cards, setCards] = useState([
    { id: 1, ...cardProps },
    { id: 2, ...cardProps },
    { id: 3, ...cardProps },
    { id: 4, ...cardProps },
    { id: 5, ...cardProps },
  ])

  const handleAddCard = () => {
    setCards([...cards, { id: Date.now(), ...cardProps }])
  }

  return (
    <div className="app-layout">
      <SidebarNavigationSlimDemo />
      <main className="app-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px' }}>
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
            <ProfileCard key={card.id} {...card} />
          ))}
        </AnimatedCardGrid>
      </main>
    </div>
  )
}

export default App

