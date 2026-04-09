function StatBar({ label, valueA, valueB, maxValue, nameA, nameB }) {
  const pctA = Math.min((valueA / maxValue) * 100, 100);
  const pctB = Math.min((valueB / maxValue) * 100, 100);
  const winnerA = valueA >= valueB;

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
        <span style={{ fontWeight: winnerA ? "700" : "400", color: winnerA ? "#c0392b" : "#6b6375", fontSize: "0.9rem" }}>
          {valueA}
        </span>
        <span style={{ fontSize: "0.8rem", color: "#9ca3af", fontWeight: "500" }}>{label}</span>
        <span style={{ fontWeight: !winnerA ? "700" : "400", color: !winnerA ? "#c0392b" : "#6b6375", fontSize: "0.9rem" }}>
          {valueB}
        </span>
      </div>
      <div style={{ display: "flex", height: "6px", borderRadius: "3px", overflow: "hidden", gap: "2px" }}>
        <div style={{ flex: 1, backgroundColor: "#f0eeeb", borderRadius: "3px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${pctA}%`,
              backgroundColor: winnerA ? "#c0392b" : "#d4cfd9",
              borderRadius: "3px",
              marginLeft: "auto",
              transition: "width 0.6s ease",
            }}
          />
        </div>
        <div style={{ flex: 1, backgroundColor: "#f0eeeb", borderRadius: "3px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${pctB}%`,
              backgroundColor: !winnerA ? "#c0392b" : "#d4cfd9",
              borderRadius: "3px",
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.2rem" }}>
        <span style={{ fontSize: "0.72rem", color: "#b0aab8" }}>{nameA}</span>
        <span style={{ fontSize: "0.72rem", color: "#b0aab8" }}>{nameB}</span>
      </div>
    </div>
  );
}

export default StatBar;
