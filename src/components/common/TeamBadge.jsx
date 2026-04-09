function TeamBadge({ seed, name, conference, record, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        borderRadius: "8px",
        border: selected ? "2px solid #c0392b" : "2px solid #e8e6e1",
        backgroundColor: selected ? "#fdf0ef" : "#ffffff",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.15s ease",
      }}
    >
      <span
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          backgroundColor: selected ? "#c0392b" : "#e8e6e1",
          color: selected ? "#ffffff" : "#6b6375",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          fontWeight: "700",
          flexShrink: 0,
        }}
      >
        {seed}
      </span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: "600", fontSize: "0.95rem", color: "#08060d", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {name}
        </div>
        <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>
          {conference} · {record}
        </div>
      </div>
    </div>
  );
}

export default TeamBadge;
