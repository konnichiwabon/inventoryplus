import { useState, useEffect } from 'react';

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
const API_BASE_URL = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;

export const getDefaultWorkstationSpecs = (mName: string, dept: string) => {
  if (mName.includes("Sarah Connor")) {
    return {
      assets: [
        { label: "Asset Tag", value: "AST-9821" },
        { label: "Hostname", value: `${dept.toUpperCase()}-WKSTN` },
        { label: "Date Recorded", value: "2026-06-22" }
      ],
      os: [
        [
          { label: "OS Name", value: "Ubuntu" },
          { label: "OS Version", value: "24.04 LTS" },
          { label: "OS Architecture", value: "64-bit" }
        ]
      ],
      motherboard: [
        { label: "MB Manufacturer", value: "ASUSTeK COMPUTER INC." },
        { label: "MB Model", value: "ROG STRIX B550-F GAMING" },
        { label: "MB Serial Number", value: "L8M0KC061920" },
        { label: "BIOS Serial Number", value: "MB-1234567890" }
      ],
      cpu: [
        { label: "CPU Manufacturer", value: "AMD" },
        { label: "CPU Model", value: "AMD Ryzen 5 5600X @ 3.70GHz" },
        { label: "CPU Cores", value: "6" },
        { label: "CPU Threads", value: "12" }
      ],
      ram: [
        [
          { label: "RAM Capacity", value: "16 GB" },
          { label: "RAM Speed", value: "3200 MHz" },
          { label: "RAM Model", value: "Corsair Vengeance LPX" },
          { label: "RAM Slot Number", value: "DIMM_A2" },
          { label: "RAM Serial Number", value: "CMK16GX4M2B3200C16" }
        ]
      ],
      storage: [
        [
          { label: "Storage Type", value: "SSD (NVMe)" },
          { label: "Storage Capacity", value: "512 GB" },
          { label: "Storage Interface", value: "PCIe Gen 4.0" },
          { label: "Storage Serial Number", value: "S67ENX0R203920" }
        ]
      ],
      gpu: [
        { label: "GPU Manufacturer", value: "AMD" },
        { label: "GPU Model", value: "AMD Radeon RX 6600" },
        { label: "GPU VRAM", value: "8 GB GDDR6" },
        { label: "Driver Version", value: "Adrenalin 24.3.1" },
        { label: "GPU Serial Number", value: "SN-GPU-987654321" }
      ],
      network: [
        { label: "Current IP", value: "192.168.1.105" },
        { label: "MAC Address", value: "00:11:22:33:44:55" },
        { label: "DHCP Enabled", value: "Yes" },
        { label: "Port Number", value: "22" },
        { label: "VLAN ID", value: "10" },
        { label: "Omada Username", value: "net_admin" }
      ],
      peripherals: [
        [
          { label: "Peripheral Type", value: "Keyboard" },
          { label: "Peripheral Brand", value: "Keychron" },
          { label: "Peripheral Model", value: "K2 (Bluetooth)" },
          { label: "Peripheral Serial Number", value: "SN-PER-4819" }
        ],
        [
          { label: "Peripheral Type", value: "Mouse" },
          { label: "Peripheral Brand", value: "Razer" },
          { label: "Peripheral Model", value: "DeathAdder V2" },
          { label: "Peripheral Serial Number", value: "SN-MS-7712" }
        ]
      ],
      monitor: [
        [
          { label: "Monitor Brand", value: "ASUS" },
          { label: "Monitor Model", value: "TUF Gaming VG27AQ" },
          { label: "Monitor Resolution", value: "2560x1440" },
          { label: "Monitor Serial Number", value: "SN-MON-98124" }
        ]
      ]
    };
  }

  return {
    assets: [
      { label: "Asset Tag", value: "AST-4412" },
      { label: "Username", value: `${mName.toUpperCase().replace(/\s+/g, '-')}-PC` },
      { label: "Date Recorded", value: "2026-06-22 10:00:00" }
    ],
    os: [
      [
        { label: "OS Name", value: "Windows" },
        { label: "OS Version", value: "11 Pro" },
        { label: "OS Architecture", value: "64-bit" }
      ],
      [
        { label: "OS Name", value: "Ubuntu" },
        { label: "OS Version", value: "22.04 LTS" },
        { label: "OS Architecture", value: "64-bit" }
      ]
    ],
    motherboard: [
      { label: "MB Manufacturer", value: "Micro-Star International Co., Ltd." },
      { label: "MB Model", value: "PRO Z690-A WIFI" },
      { label: "MB Serial Number", value: "L9M1KC071821" },
      { label: "BIOS Serial Number", value: "MS-7D25" },
      { label: "Case", value: "NZXT H5 Flow" }
    ],
    cpu: [
      { label: "CPU Manufacturer", value: "Intel" },
      { label: "CPU Model", value: "Intel Core i7-12700K @ 4.90GHz" },
      { label: "CPU Cores", value: "12" },
      { label: "CPU Threads", value: "20" }
    ],
    ram: [
      [
        { label: "RAM Capacity", value: "16 GB" },
        { label: "RAM Speed", value: "5200 MHz" },
        { label: "RAM Model", value: "G.Skill Trident Z5" },
        { label: "RAM Slot Number", value: "DIMM_A2" },
        { label: "RAM Serial Number", value: "F5-5200J4040A16GX2-1" }
      ],
      [
        { label: "RAM Capacity", value: "16 GB" },
        { label: "RAM Speed", value: "5200 MHz" },
        { label: "RAM Model", value: "G.Skill Trident Z5" },
        { label: "RAM Slot Number", value: "DIMM_B2" },
        { label: "RAM Serial Number", value: "F5-5200J4040A16GX2-2" }
      ]
    ],
    storage: [
      [
        { label: "Storage Type", value: "SSD (NVMe)" },
        { label: "Storage Capacity", value: "1 TB" },
        { label: "Storage Interface", value: "PCIe Gen 4.0 x4" },
        { label: "Storage Serial Number", value: "S67ENX0R203920" }
      ]
    ],
    gpu: [
      { label: "GPU Manufacturer", value: "NVIDIA" },
      { label: "GPU Model", value: "NVIDIA GeForce RTX 3070" },
      { label: "GPU VRAM", value: "8 GB" },
      { label: "Driver Version", value: "NVIDIA 550.67" },
      { label: "GPU Serial Number", value: "SN-GPU-987654321" }
    ],
    network: [
      { label: "Current IP", value: "192.168.1.142" },
      { label: "MAC Address", value: "e0:d5:5e:a1:b2:c3" },
      { label: "DHCP Enabled", value: "Yes" },
      { label: "Port Number", value: "80" },
      { label: "VLAN ID", value: "20" },
      { label: "Omada Username", value: "net_admin" }
    ],
    peripherals: [
      [
        { label: "Peripheral Type", value: "Keyboard" },
        { label: "Peripheral Brand", value: "Keychron" },
        { label: "Peripheral Model", value: "K8 (Wireless)" },
        { label: "Peripheral Serial Number", value: "SN-KB-9921" }
      ],
      [
        { label: "Peripheral Type", value: "Mouse" },
        { label: "Peripheral Brand", value: "Logitech" },
        { label: "Peripheral Model", value: "MX Master 3S" },
        { label: "Peripheral Serial Number", value: "SN-MS-12345" }
      ]
    ],
    monitor: [
      [
        { label: "Monitor Brand", value: "Dell" },
        { label: "Monitor Model", value: "UltraSharp U2723QE" },
        { label: "Monitor Resolution", value: "3840x2160" },
        { label: "Monitor Serial Number", value: "SN-MON-44129" }
      ],
      [
        { label: "Monitor Brand", value: "Dell" },
        { label: "Monitor Model", value: "UltraSharp U2723QE" },
        { label: "Monitor Resolution", value: "3840x2160" },
        { label: "Monitor Serial Number", value: "SN-MON-44130" }
      ]
    ]
  };
};

export function useWorkstationSpecs(
  selectedMemberObj: any,
  selectedDepartment: string | null,
  selectedMemberCleanName: string,
  currentMemberKey: string
) {
  const [workstationSpecs, setWorkstationSpecs] = useState<Record<string, any>>({});

  // Initial load from localStorage cache
  useEffect(() => {
    const saved = localStorage.getItem("inventoryplus_workstation_specs");
    if (saved) {
      try {
        setWorkstationSpecs(JSON.parse(saved));
      } catch (err) {
        console.error("Error parsing saved workstation specs from localStorage cache:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedMemberObj && selectedMemberObj.id) {
      const fetchSpecs = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/api/users/${selectedMemberObj.id}/specs/`);
          if (res.ok) {
            const data = await res.json();
            let specsObj = {};
            if (Object.keys(data).length === 0) {
              if (selectedMemberObj.username === "Jack Sparrow" || selectedMemberObj.username === "Sarah Connor") {
                specsObj = getDefaultWorkstationSpecs(selectedMemberObj.username, selectedDepartment || "");
              } else {
                specsObj = {
                  assets: [],
                  os: [],
                  motherboard: [],
                  cpu: [],
                  ram: [],
                  storage: [],
                  gpu: [],
                  monitor: [],
                  network: [],
                  peripherals: []
                };
              }
            } else {
              specsObj = data;
            }
            setWorkstationSpecs(prev => {
              const updated = {
                ...prev,
                [currentMemberKey]: specsObj
              };
              localStorage.setItem("inventoryplus_workstation_specs", JSON.stringify(updated));
              return updated;
            });
          }
        } catch (err) {
          console.error("Error fetching workstation specs:", err);
        }
      };
      fetchSpecs();
    }
  }, [selectedMemberObj, currentMemberKey, selectedDepartment]);

  const saveSpecsToDb = async (updatedSpecs: any) => {
    if (!selectedMemberObj || !selectedMemberObj.id) return;
    try {
      await fetch(`${API_BASE_URL}/api/users/${selectedMemberObj.id}/specs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedSpecs)
      });
    } catch (err) {
      console.error("Error saving workstation specs:", err);
    }
  };

  const handleSaveCardEdits = (editingCardTitle: string, editingCardItems: any[]) => {
    if (!currentMemberKey || !editingCardTitle) return;

    let categoryKey = "";
    if (editingCardTitle === "Asset Details") categoryKey = "assets";
    else if (editingCardTitle === "Operating System") categoryKey = "os";
    else if (editingCardTitle === "Motherboard") categoryKey = "motherboard";
    else if (editingCardTitle === "CPU") categoryKey = "cpu";
    else if (editingCardTitle === "RAM") categoryKey = "ram";
    else if (editingCardTitle === "Storage") categoryKey = "storage";
    else if (editingCardTitle === "GPU") categoryKey = "gpu";
    else if (editingCardTitle === "Network") categoryKey = "network";
    else if (editingCardTitle === "Peripherals") categoryKey = "peripherals";
    else if (editingCardTitle === "Monitor") categoryKey = "monitor";

    if (!categoryKey) return;

    const saved = localStorage.getItem("inventoryplus_workstation_specs");
    let currentSpecsDict: any = {};
    if (saved) {
      try {
        currentSpecsDict = JSON.parse(saved);
      } catch (err) {
        console.error(err);
      }
    }

    const currentMemberSpecs = workstationSpecs[currentMemberKey] || currentSpecsDict[currentMemberKey] || getDefaultWorkstationSpecs(selectedMemberCleanName, selectedDepartment || "");

    const MULTI_INSTANCE_CATEGORIES = ["os", "ram", "storage", "monitor", "peripherals"];
    const isMulti = editingCardItems.length > 0 && Array.isArray(editingCardItems[0]);

    let formattedItems: any;
    if (isMulti) {
      // Already nested array format [[{label, value}, ...], ...]
      formattedItems = (editingCardItems as any[][]).map(moduleItems =>
        moduleItems.map(item => ({
          label: item.label,
          value: item.value
        }))
      );
    } else {
      // Flat array format [{label, value}, ...]
      const flatItems = (editingCardItems as any[]).map(item => ({
        label: item.label,
        value: item.value
      }));
      // Wrap in nested array if this category expects multi-instance format
      if (MULTI_INSTANCE_CATEGORIES.includes(categoryKey)) {
        formattedItems = [flatItems];
      } else {
        formattedItems = flatItems;
      }
    }

    let finalFormattedItems = formattedItems;
    if (categoryKey === "assets" && Array.isArray(formattedItems)) {
      const existingUuid = (currentMemberSpecs.assets || []).find((item: any) => item.label === "Asset UUID");
      const existingOmada = (currentMemberSpecs.assets || []).find((item: any) => item.label === "Omada Username");
      const extra = [];
      if (existingUuid) extra.push(existingUuid);
      if (existingOmada) extra.push(existingOmada);
      finalFormattedItems = [...extra, ...formattedItems.filter((item: any) => item.label !== "Asset UUID" && item.label !== "Omada Username")];
    }

    const updatedSpecs = {
      ...currentMemberSpecs,
      [categoryKey]: finalFormattedItems
    };

    const newWorkstationSpecs = {
      ...workstationSpecs,
      [currentMemberKey]: updatedSpecs
    };

    setWorkstationSpecs(newWorkstationSpecs);
    localStorage.setItem("inventoryplus_workstation_specs", JSON.stringify(newWorkstationSpecs));
    saveSpecsToDb(updatedSpecs);
  };

  const handleDeleteCard = (cardTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete all specs for ${cardTitle}?`)) {
      return;
    }

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

    const saved = localStorage.getItem("inventoryplus_workstation_specs");
    let currentSpecsDict: Record<string, any> = {};
    if (saved) {
      try {
        currentSpecsDict = JSON.parse(saved);
      } catch (err) {
        console.error(err);
      }
    }

    const currentMemberSpecs = workstationSpecs[currentMemberKey] || currentSpecsDict[currentMemberKey] || getDefaultWorkstationSpecs(selectedMemberCleanName, selectedDepartment || "");

    const updatedSpecs = {
      ...currentMemberSpecs,
      [categoryKey]: []
    };

    const newWorkstationSpecs = {
      ...workstationSpecs,
      [currentMemberKey]: updatedSpecs
    };

    setWorkstationSpecs(newWorkstationSpecs);
    localStorage.setItem("inventoryplus_workstation_specs", JSON.stringify(newWorkstationSpecs));
    saveSpecsToDb(updatedSpecs);
  };

  return {
    workstationSpecs,
    setWorkstationSpecs,
    handleSaveCardEdits,
    handleDeleteCard,
  };
}
