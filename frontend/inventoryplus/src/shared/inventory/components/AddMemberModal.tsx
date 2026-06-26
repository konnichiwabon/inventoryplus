import React from 'react';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newMemberName: string;
  setNewMemberName: (name: string) => void;
  newMemberEmail: string;
  setNewMemberEmail: (email: string) => void;
  isSubmittingMember: boolean;
}

export default function AddMemberModal({
  isOpen,
  onClose,
  onSubmit,
  newMemberName,
  setNewMemberName,
  newMemberEmail,
  setNewMemberEmail,
  isSubmittingMember,
}: AddMemberModalProps) {
  if (!isOpen) return null;

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
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--bg, #fff)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "24px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
          margin: "0 16px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: 700, color: "var(--text-h)" }}>
          Add Team Member
        </h3>
        <form onSubmit={onSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
            <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-h)" }}>
              Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              autoFocus
              required
              style={{
                width: "100%",
                padding: "10px 12px",
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
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
            <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-h)" }}>
              Email (Optional)
            </label>
            <input
              type="email"
              placeholder="e.g. john@example.com"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
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
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button
              type="button"
              onClick={onClose}
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
              disabled={isSubmittingMember}
              style={{
                padding: "10px 16px",
                backgroundColor: isSubmittingMember ? "#bfa8e6" : "#7F56D9",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#fff",
                cursor: isSubmittingMember ? "not-allowed" : "pointer",
                boxShadow: "0 1px 2px rgba(16, 24, 40, 0.05)",
              }}
              onMouseOver={(e) => {
                if (!isSubmittingMember) e.currentTarget.style.backgroundColor = '#6941C6';
              }}
              onMouseOut={(e) => {
                if (!isSubmittingMember) e.currentTarget.style.backgroundColor = '#7F56D9';
              }}
            >
              {isSubmittingMember ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
