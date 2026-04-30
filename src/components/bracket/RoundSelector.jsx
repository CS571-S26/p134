function RoundSelector({ rounds, activeRound, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }} aria-label="Bracket round selector">
      {rounds.map((round) => (
        <button
          key={round.key}
          type="button"
          onClick={() => onSelect(round.key)}
          className="pill-button"
          style={{
            padding: "0.45rem 1rem",
            borderRadius: "20px",
            border: activeRound === round.key ? "2px solid #08060d" : "2px solid #d9d4dc",
            backgroundColor: activeRound === round.key ? "#08060d" : "#ffffff",
            color: activeRound === round.key ? "#ffffff" : "#4f4759",
            fontSize: "0.82rem",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          {round.shortLabel || round.label}
        </button>
      ))}
    </div>
  );
}

export default RoundSelector;
