import { useState, useEffect } from 'react';

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
const API_BASE_URL = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;

export function useMembers(
  selectedDepartment: string | null,
  selectedMemberIndex: number,
  setSelectedMemberIndex: (idx: number) => void
) {
  const [members, setMembers] = useState<any[]>([]);
  const [isSubmittingMember, setIsSubmittingMember] = useState(false);

  const fetchMembers = async (deptName: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/departments/${encodeURIComponent(deptName)}/users/`);
      if (res.ok) {
        const data = await res.json();
        setMembers(data);

        // Restore selectedMemberIndex based on the saved username
        const savedUsername = localStorage.getItem("inventoryplus_selected_member_username");
        if (savedUsername) {
          const idx = data.findIndex((m: any) => m.username === savedUsername);
          if (idx !== -1) {
            setSelectedMemberIndex(idx);
          }
        }
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

  const handleAddMemberSubmit = async (newMemberName: string, newMemberEmail: string) => {
    if (!newMemberName.trim() || !selectedDepartment || isSubmittingMember) return false;

    setIsSubmittingMember(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/departments/${encodeURIComponent(selectedDepartment)}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newMemberName.trim(),
          email: newMemberEmail.trim() || null,
        }),
      });
      if (res.ok) {
        await fetchMembers(selectedDepartment);
        return true;
      }
    } catch (err) {
      console.error("Error adding team member:", err);
    } finally {
      setIsSubmittingMember(false);
    }
    return false;
  };

  return {
    members,
    isSubmittingMember,
    fetchMembers,
    handleAddMemberSubmit,
  };
}
