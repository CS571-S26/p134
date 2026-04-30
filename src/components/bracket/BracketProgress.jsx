function BracketProgress({ totalPicks, totalMatchups, champion }) {
  const pct = totalMatchups ? Math.round((totalPicks / totalMatchups) * 100) : 0;

  return (
    <section aria-labelledby="bracket-progress-heading" style={{ marginTop: "1.5rem", backgroundColor: "#ffffff", borderRadius: "10px", border: "1px solid #d9d4dc", padding: "1rem 1.25rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", gap: "1rem", flexWrap: "wrap" }}>
        <h2 id="bracket-progress-heading" style={{ fontSize: "0.95rem", fontWeight: "700", color: "#08060d", margin: 0 }}>Overall Progress</h2>
        <span style={{ fontSize: "0.9rem", color: "#4f4759" }}>{totalPicks}/{totalMatchups} games picked, {pct}%</span>
      </div>
      <div style={{ backgroundColor: "#e5e0e8", borderRadius: "4px", height: "8px", overflow: "hidden" }} aria-hidden="true">
        <div style={{ height: "100%", width: `${pct}%`, backgroundColor: pct === 100 ? "#176c3a" : "#a92f24", borderRadius: "4px", transition: "width 0.4s ease" }} />
      </div>
      <div style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#4f4759" }}>
        {champion ? <strong>Champion: {champion}</strong> : "No champion picked yet."}
      </div>
    </section>
  );
}

export default BracketProgress;
