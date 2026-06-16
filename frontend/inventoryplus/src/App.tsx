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

const cards = [
  { id: 1, ...cardProps },
  { id: 2, ...cardProps },
  { id: 3, ...cardProps },
  { id: 4, ...cardProps },
  { id: 5, ...cardProps },
]

function App() {
  return (
    <div className="app-layout">
      <SidebarNavigationSlimDemo />
      <main className="app-main">
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

