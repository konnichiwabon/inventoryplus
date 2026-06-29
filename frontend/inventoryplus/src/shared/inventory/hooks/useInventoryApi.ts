import { useState, useEffect } from 'react';
import { useDepartments } from './useDepartments';
import { useMembers } from './useMembers';
import { useWorkstationSpecs } from './useWorkstationSpecs';

export function useInventoryApi() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(() => {
    return localStorage.getItem("inventoryplus_selected_department");
  });
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number>(() => {
    const saved = localStorage.getItem("inventoryplus_selected_member_index");
    return saved !== null ? Number(saved) : -1;
  });

  const { cards, fetchDepartments, handleAddCardSubmit } = useDepartments();

  const {
    members,
    isSubmittingMember,
    fetchMembers,
    handleAddMemberSubmit,
  } = useMembers(selectedDepartment, selectedMemberIndex, setSelectedMemberIndex);

  // Sync selection to localStorage
  useEffect(() => {
    if (selectedDepartment) {
      localStorage.setItem("inventoryplus_selected_department", selectedDepartment);
    } else {
      localStorage.removeItem("inventoryplus_selected_department");
    }
  }, [selectedDepartment]);

  useEffect(() => {
    localStorage.setItem("inventoryplus_selected_member_index", String(selectedMemberIndex));
    if (selectedMemberIndex !== -1 && members && members[selectedMemberIndex]) {
      localStorage.setItem("inventoryplus_selected_member_username", members[selectedMemberIndex].username);
    } else if (selectedMemberIndex === -1) {
      localStorage.removeItem("inventoryplus_selected_member_username");
    }
  }, [selectedMemberIndex, members]);

  // Derived properties
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

  const selectedMemberObj = selectedDepartment && selectedMemberIndex !== -1 && members[selectedMemberIndex]
    ? members[selectedMemberIndex]
    : null;

  const {
    workstationSpecs,
    setWorkstationSpecs,
    handleSaveCardEdits,
    handleDeleteCard,
  } = useWorkstationSpecs(selectedMemberObj, selectedDepartment, selectedMemberCleanName, currentMemberKey);

  return {
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
    fetchDepartments,
    handleAddCardSubmit,
    fetchMembers,
    handleAddMemberSubmit,
    handleSaveCardEdits,
    handleDeleteCard,
  };
}
