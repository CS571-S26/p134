import { useState } from "react";
import { Container, Row, Col, Badge, Button, Form, Alert, Spinner } from "react-bootstrap";

// Matchups
const BRACKET = {
  East: [
    ["Duke", "Siena"],
    ["Michigan", "Howard"],
    ["Illinois", "Penn"],
    ["Nebraska", "Troy"],
    ["TCU", "Ohio State"],
    ["Virginia", "Wright State"],
    ["UConn", "Furman"],
  ],
  South: [
    ["Florida", "Prairie View A&M"],
    ["Houston", "Idaho"],
    ["Alabama", "Hofstra"],
    ["Kansas", "Cal Baptist"],
    ["Louisville", "South Florida"],
    ["VCU", "North Carolina"],
    ["Texas", "BYU"],
    ["High Point", "Wisconsin"],
    ["Tennessee", "Miami (Ohio)"],
  ],
  Midwest: [
    ["Iowa State", "Tennessee State"],
    ["Purdue", "Queens"],
    ["Texas Tech", "Akron"],
    ["Arkansas", "Hawai'i"],
    ["Texas A&M", "Saint Mary's"],
    ["Kentucky", "Santa Clara"],
    ["Iowa", "Clemson"],
    ["Saint Louis", "Georgia"],
  ],
  West: [
    ["Arizona", "Long Island University"],
    ["Michigan State", "North Dakota State"],
    ["Gonzaga", "Kennesaw State"],
    ["Vanderbilt", "McNeese"],
    ["St. John's", "UNI"],
    ["Utah State", "Villanova"],
    ["UCLA", "UCF"],
    ["Miami (Fla.)", "Missouri"],
  ],
};

function BracketMatchup({ teamA, teamB, onPick, pickedTeam }) {
  return (
    <div style={{ backgroundColor: "#f8f7f4", border: "1px solid #e8e6e1", borderRadius: "8px", overflow: "hidden", fontSize: "0.82rem", marginBottom: "0.4rem" }}>
      {[teamA, teamB].map((team, i) => (
        <div
          key={team}
          onClick={() => onPick(team)}
          style={{
            padding: "0.45rem 0.75rem",
            cursor: "pointer",
            backgroundColor: pickedTeam === team ? "#fdf0ef" : "transparent",
            borderBottom: i === 0 ? "1px solid #e8e6e1" : "none",
            fontWeight: pickedTeam === team ? "700" : "400",
            color: pickedTeam === team ? "#c0392b" : "#3d3646",
            transition: "background 0.1s",
          }}
        >
          {pickedTeam === team && <span style={{ marginRight: "0.3rem", fontSize: "0.65rem" }}>✓</span>}
          {team}
        </div>
      ))}
    </div>
  );
}

function BuildBracket() {
  const [picks, setPicks] = useState({});
  const [activeRegion, setActiveRegion] = useState("East");
  const [mode, setMode] = useState("team");
  const [bracketName, setBracketName] = useState("My Bracket");
  const [saved, setSaved] = useState(false);

  const handlePick = (region, idx, team) => {
    setPicks((prev) => ({ ...prev, [`${region}-${idx}`]: team }));
    setSaved(false);
  };

  const totalMatchups = Object.values(BRACKET).reduce((a, r) => a + r.length, 0);
  const totalPicks = Object.keys(picks).length;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ backgroundColor: "#f8f7f4", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8e6e1", padding: "2rem 0" }}>
        <Container>
          <Row className="align-items-center g-3">
            <Col>
              <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.78rem", color: "#9ca3af", fontWeight: "600", marginBottom: "0.3rem" }}>
                Bracket Builder
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <input
                  value={bracketName}
                  onChange={(e) => setBracketName(e.target.value)}
                  style={{ fontFamily: "'Georgia', serif", fontSize: "1.8rem", fontWeight: "700", color: "#08060d", border: "none", background: "transparent", outline: "none", letterSpacing: "-0.5px", minWidth: "180px" }}
                />
                <Badge style={{ backgroundColor: totalPicks === totalMatchups ? "#27ae60" : "#f0eeeb", color: totalPicks === totalMatchups ? "#fff" : "#6b6375", fontWeight: "600", fontSize: "0.78rem", padding: "0.3rem 0.7rem" }}>
                  {totalPicks}/{totalMatchups} picks
                </Badge>
              </div>
            </Col>
            <Col xs="auto" className="d-flex gap-2 align-items-center flex-wrap">
              <Form.Select
                size="sm"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                style={{ fontSize: "0.85rem", borderColor: "#e8e6e1", borderRadius: "8px", width: "auto" }}
              >
                <option value="team">Team Mode</option>
                <option value="player">Player Mode</option>
                <option value="coach">Coach Mode</option>
              </Form.Select>
              <Button
                size="sm"
                onClick={handleSave}
                style={{ backgroundColor: saved ? "#27ae60" : "#08060d", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "0.85rem", transition: "background 0.3s" }}
              >
                {saved ? "✓ Saved!" : "Save Bracket"}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-4">
        {/* Weighting placeholder banner */}
        <Alert variant="light" style={{ border: "1px dashed #d4cfd9", backgroundColor: "#fafafa", fontSize: "0.85rem", color: "#6b6375", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Spinner animation="border" size="sm" style={{ color: "#b0aab8", flexShrink: 0 }} />
          <span>
            <strong style={{ color: "#08060d" }}>
              {mode === "team" ? "Team" : mode === "player" ? "Player" : "Coach"} weighting engine
            </strong>
            {" "}— loading season data... Stat-based pick suggestions will appear here once the data CSV is connected.
          </span>
        </Alert>

        {/* Region tabs */}
        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {Object.keys(BRACKET).map((r) => {
            const done = BRACKET[r].filter((_, i) => picks[`${r}-${i}`]).length;
            return (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "20px",
                  border: activeRegion === r ? "2px solid #08060d" : "2px solid #e8e6e1",
                  backgroundColor: activeRegion === r ? "#08060d" : "#ffffff",
                  color: activeRegion === r ? "#ffffff" : "#6b6375",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                {r}
                <span style={{ fontSize: "0.7rem", backgroundColor: activeRegion === r ? "rgba(255,255,255,0.2)" : "#f0eeeb", color: activeRegion === r ? "#fff" : "#9ca3af", borderRadius: "10px", padding: "0.1rem 0.4rem" }}>
                  {done}/{BRACKET[r].length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Matchup grid */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e8e6e1", padding: "1.5rem" }}>
          <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "1.2rem", fontWeight: "700", color: "#08060d", margin: 0 }}>
              {activeRegion} Region — Round of 64
            </h3>
            <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Click a team name to pick the winner</span>
          </div>
          <Row className="g-3">
            {BRACKET[activeRegion].map((matchup, i) => (
              <Col key={i} xs={12} sm={6} lg={4}>
                <div style={{ fontSize: "0.72rem", color: "#b0aab8", marginBottom: "0.2rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Game {i + 1}
                </div>
                <BracketMatchup
                  teamA={matchup[0]}
                  teamB={matchup[1]}
                  onPick={(team) => handlePick(activeRegion, i, team)}
                  pickedTeam={picks[`${activeRegion}-${i}`]}
                />
              </Col>
            ))}
          </Row>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: "1.5rem", backgroundColor: "#ffffff", borderRadius: "10px", border: "1px solid #e8e6e1", padding: "1rem 1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#08060d" }}>Overall Progress</span>
            <span style={{ fontSize: "0.85rem", color: "#6b6375" }}>{Math.round((totalPicks / totalMatchups) * 100)}%</span>
          </div>
          <div style={{ backgroundColor: "#f0eeeb", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(totalPicks / totalMatchups) * 100}%`, backgroundColor: "#c0392b", borderRadius: "4px", transition: "width 0.4s ease" }} />
          </div>
        </div>

        <div style={{ marginTop: "1.5rem", backgroundColor: "#ffffff", borderRadius: "10px", border: "1px dashed #d4cfd9", padding: "1.5rem", textAlign: "center", color: "#b0aab8" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🚧</div>
          <p style={{ margin: 0, fontSize: "0.88rem" }}>
            Round of 32, Sweet 16, Elite 8, Final Four, and Championship rounds — coming in a future milestone.
          </p>
        </div>
      </Container>
    </div>
  );
}

export default BuildBracket;
