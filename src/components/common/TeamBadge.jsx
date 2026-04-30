function TeamBadge({ seed, name, conference, record, selected, onClick }) {
  const commonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: selected ? "2px solid #a92f24" : "2px solid #d9d4dc",
    backgroundColor: selected ? "#f8d7d4" : "#ffffff",
    cursor: onClick ? "pointer" : "default",
    transition: "all 0.15s ease",
    width: "100%",
    textAlign: "left",
  };

  const content = (
    <>
      <span
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          backgroundColor: selected ? "#a92f24" : "#e8e6e1",
          color: selected ? "#ffffff" : "#4f4759",
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
      <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", fontWeight: "700", fontSize: "0.95rem", color: "#08060d", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {name}
        </span>
        <span style={{ display: "block", fontSize: "0.78rem", color: "#5c5566" }}>
          {conference} · {record}
        </span>
      </span>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-pressed={selected} style={commonStyle}>
        {content}
      </button>
    );
  }

  return <div style={commonStyle}>{content}</div>;
}

export default TeamBadge;
