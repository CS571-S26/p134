import { Button } from "react-bootstrap";

function BracketMatchup({ game, pickedTeam, onPick }) {
  const teams = [game.teamA, game.teamB];

  return (
    <div
      style={{
        backgroundColor: "#f8f7f4",
        border: "1px solid #d8d3ca",
        borderRadius: "8px",
        overflow: "hidden",
        fontSize: "0.82rem",
      }}
    >
      {teams.map((team, index) => {
        const isPicked = team && pickedTeam === team.name;
        const isDisabled = !team;

        return (
          <Button
            key={team?.name || `empty-team-${index}`}
            type="button"
            variant="link"
            disabled={isDisabled}
            onClick={() => team && onPick(team.name)}
            aria-pressed={isPicked}
            aria-label={
              team
                ? `Pick ${team.name} to win ${game.label}`
                : `Waiting for previous round winner for ${game.label}`
            }
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.55rem 0.75rem",
              border: "none",
              borderBottom: index === 0 ? "1px solid #d8d3ca" : "none",
              borderRadius: 0,
              backgroundColor: isPicked ? "#f8d7d4" : "transparent",
              color: isDisabled ? "#8c8494" : isPicked ? "#8a1f15" : "#2e2736",
              fontWeight: isPicked ? "700" : "500",
              textDecoration: "none",
              textAlign: "left",
              cursor: isDisabled ? "not-allowed" : "pointer",
              opacity: isDisabled ? 0.75 : 1,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontSize: "0.7rem",
                color: isPicked ? "#8a1f15" : "#6b6375",
                fontWeight: "700",
                minWidth: "18px",
              }}
            >
              {team?.seed ? `#${team.seed}` : "TBD"}
            </span>

            {isPicked && (
              <span aria-hidden="true" style={{ fontSize: "0.72rem" }}>
                ✓
              </span>
            )}

            <span style={{ flex: 1 }}>
              {team?.name || "Winner from previous round"}
            </span>

            {team?.record && (
              <span
                style={{
                  fontSize: "0.72rem",
                  color: isPicked ? "#8a1f15" : "#6b6375",
                }}
              >
                {team.record}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}

export default BracketMatchup;