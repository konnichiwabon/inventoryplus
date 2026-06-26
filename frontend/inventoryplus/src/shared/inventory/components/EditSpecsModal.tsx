import React from "react";

interface EditSpecsModalProps {
  editingCardTitle: string | null;
  setEditingCardTitle: (title: string | null) => void;
  editingCardItems: any[];
  setEditingCardItems: (items: any[]) => void;
  handleSaveCardEdits: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteCard: (title: string) => void;
}

export default function EditSpecsModal({
  editingCardTitle,
  setEditingCardTitle,
  editingCardItems,
  setEditingCardItems,
  handleSaveCardEdits,
  handleDeleteCard,
}: EditSpecsModalProps) {
  if (!editingCardTitle) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(4px)",
      }}
      onClick={() => setEditingCardTitle(null)}
    >
      <div
        style={{
          backgroundColor: "var(--bg, #fff)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "24px",
          width: "100%",
          maxWidth: "450px",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
          margin: "0 16px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: 700, color: "var(--text-h)" }}>
          Edit {editingCardTitle} Specs
        </h3>
        <form onSubmit={handleSaveCardEdits} style={{ display: "flex", flexDirection: "column", gap: "16px", overflowY: "auto", paddingRight: "4px", flex: 1 }}>
          {(() => {
            const isMulti = editingCardItems.length > 0 && Array.isArray(editingCardItems[0]);
            if (isMulti) {
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {(editingCardItems as any[][]).map((moduleItems, moduleIdx) => {
                    const slotItem = moduleItems.find(item =>
                      item.label.toLowerCase().includes('slot') ||
                      item.label.toLowerCase().includes('type')
                    );
                    const moduleLabel = slotItem && slotItem.value
                      ? `${editingCardTitle} (${slotItem.value})`
                      : `${editingCardTitle} #${moduleIdx + 1}`;

                    return (
                      <div
                        key={moduleIdx}
                        style={{
                          border: "1px solid var(--border)",
                          borderRadius: "12px",
                          padding: "16px",
                          backgroundColor: "rgba(0, 0, 0, 0.02)",
                          position: "relative"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                          <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "var(--text-h)" }}>
                            {moduleLabel}
                          </h4>
                          {(editingCardItems as any[][]).length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = (editingCardItems as any[][]).filter((_, i) => i !== moduleIdx);
                                setEditingCardItems(updated);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#F43F5E",
                                fontSize: "12px",
                                fontWeight: 600,
                                cursor: "pointer",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                transition: "background-color 0.2s"
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(244, 63, 94, 0.1)")}
                              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          {moduleItems.map((item, idx) => (
                            <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                              <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
                                {item.label}
                              </label>
                              <input
                                type="text"
                                value={item.value}
                                onChange={(e) => {
                                  const updatedItems = [...editingCardItems] as any[][];
                                  updatedItems[moduleIdx][idx].value = e.target.value;
                                  setEditingCardItems(updatedItems);
                                }}
                                style={{
                                  width: "100%",
                                  padding: "8px 12px",
                                  border: "1px solid var(--border)",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  backgroundColor: "transparent",
                                  color: "var(--text-h)",
                                  outline: "none",
                                  boxSizing: "border-box",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      const prototypeModule = (editingCardItems as any[][])[0];
                      const newModule = prototypeModule.map(item => ({
                        label: item.label,
                        value: ""
                      }));
                      setEditingCardItems([...editingCardItems, newModule]);
                    }}
                    style={{
                      padding: "10px",
                      backgroundColor: "transparent",
                      border: "1px dashed var(--border)",
                      borderRadius: "8px",
                      color: "var(--text-h)",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--code-bg)";
                      e.currentTarget.style.borderColor = "var(--text-h)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  >
                    + Add {editingCardTitle} Stick/Drive
                  </button>
                </div>
              );
            }

            return editingCardItems.map((item, idx) => {
              const isDhcp = item.label === "DHCP Enabled";
              return (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
                    {item.label}
                  </label>
                  {isDhcp ? (
                    <select
                      value={item.value ? (String(item.value).toLowerCase() === "true" || String(item.value).toLowerCase() === "yes" ? "Yes" : "No") : ""}
                      onChange={(e) => {
                        const updatedItems = [...editingCardItems];
                        updatedItems[idx].value = e.target.value;
                        setEditingCardItems(updatedItems);
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        fontSize: "14px",
                        backgroundColor: "var(--bg)",
                        color: "var(--text-h)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="" disabled style={{ color: 'gray' }}>Select Option</option>
                      <option value="Yes" style={{ backgroundColor: "var(--bg)", color: "var(--text-h)" }}>Yes</option>
                      <option value="No" style={{ backgroundColor: "var(--bg)", color: "var(--text-h)" }}>No</option>
                    </select>
                  ) : (
                    <input
                      type={item.label === "Date Recorded" ? "datetime-local" : "text"}
                      value={(() => {
                        if (item.label === "Date Recorded" && item.value) {
                          const clean = item.value.replace(" ", "T");
                          if (clean.includes("T")) {
                            const parts = clean.split(":");
                            if (parts.length >= 2) {
                              return `${parts[0]}:${parts[1]}`;
                            }
                          }
                          return clean;
                        }
                        return item.value;
                      })()}
                      onChange={(e) => {
                        const updatedItems = [...editingCardItems];
                        let val = e.target.value;
                        if (item.label === "Date Recorded" && val) {
                          val = val.replace("T", " ");
                          if (val.split(":").length === 2) {
                            val += ":00";
                          }
                        }
                        updatedItems[idx].value = val;
                        setEditingCardItems(updatedItems);
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        fontSize: "14px",
                        backgroundColor: "transparent",
                        color: "var(--text-h)",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  )}
                </div>
              );
            });
          })()}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingBottom: "4px" }}>
            {editingCardTitle ? (
              <button
                type="button"
                onClick={() => handleDeleteCard(editingCardTitle!)}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "transparent",
                  border: "1px solid #FDA29B",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#F04438",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#FEF3F2";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Delete Card
              </button>
            ) : <div />}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="button"
                onClick={() => setEditingCardTitle(null)}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "var(--code-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text-h)",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#7F56D9",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6941C6')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#7F56D9')}
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
