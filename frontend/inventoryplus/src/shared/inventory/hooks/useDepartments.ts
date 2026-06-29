import { useState, useEffect } from 'react';

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
const API_BASE_URL = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;

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

export function useDepartments() {
  const [cards, setCards] = useState<any[]>([]);

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/departments/`);
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

  const handleAddCardSubmit = async (newDeptName: string) => {
    if (!newDeptName.trim()) return false;
    try {
      const res = await fetch(`${API_BASE_URL}/api/departments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newDeptName.trim() }),
      });
      if (res.ok) {
        await fetchDepartments();
        return true;
      }
    } catch (err) {
      console.error("Error adding department:", err);
    }
    return false;
  };

  return {
    cards,
    fetchDepartments,
    handleAddCardSubmit,
  };
}
