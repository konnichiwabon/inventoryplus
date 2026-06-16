import ProfileCard from './components/profileCard'
import { SidebarNavigationSlimDemo } from './components/sidebar'
import './App.css'

function App() {
  return (
    <div className="app-layout">
      <SidebarNavigationSlimDemo />
      <main className="app-main">
        <ProfileCard
          name="EDDT"
          title="EHANCE ARMAMENT"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/path/to/avatar.jpg"
          showUserInfo={false}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log('Contact clicked')}
          behindGlowColor="rgba(125, 190, 255, 0.67)"
          iconUrl="/assets/demo/iconpattern.png"
          behindGlowEnabled
          innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
        />
        <ProfileCard
          name="EDDT"
          title="EHANCE ARMAMENT"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/path/to/avatar.jpg"
          showUserInfo={false}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log('Contact clicked')}
          behindGlowColor="rgba(125, 190, 255, 0.67)"
          iconUrl="/assets/demo/iconpattern.png"
          behindGlowEnabled
          innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
        />


      </main>
    </div>
  )
}

export default App
