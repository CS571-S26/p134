import { useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";

const MATCHUPS = [
  // Thursday March 19
  { region: "East", seed1: 9, team1: "TCU", seed2: 8, team2: "Ohio State", score: "66-64", winner: "TCU" },
  { region: "East", seed1: 4, team1: "Nebraska", seed2: 13, team2: "Troy", score: "76-47", winner: "Nebraska" },
  { region: "South", seed1: 6, team1: "Louisville", seed2: 11, team2: "South Florida", score: "83-79", winner: "Louisville" },
  { region: "South", seed1: 12, team1: "High Point", seed2: 5, team2: "Wisconsin", score: "83-82", winner: "High Point" },
  { region: "East", seed1: 1, team1: "Duke", seed2: 16, team2: "Siena", score: "71-65", winner: "Duke" },
  { region: "West", seed1: 5, team1: "Vanderbilt", seed2: 12, team2: "McNeese", score: "78-68", winner: "Vanderbilt" },
  { region: "West", seed1: 3, team1: "Michigan State", seed2: 14, team2: "North Dakota State", score: "92-67", winner: "Michigan State" },
  { region: "Midwest", seed1: 4, team1: "Arkansas", seed2: 13, team2: "Hawai'i", score: "97-78", winner: "Arkansas" },
  { region: "South", seed1: 11, team1: "VCU", seed2: 6, team2: "North Carolina", score: "82-78 OT", winner: "VCU" },
  { region: "East", seed1: 1, team1: "Michigan", seed2: 16, team2: "Howard", score: "101-80", winner: "Michigan" },
  { region: "South", seed1: 11, team1: "Texas", seed2: 6, team2: "BYU", score: "79-71", winner: "Texas" },
  { region: "Midwest", seed1: 10, team1: "Texas A&M", seed2: 7, team2: "Saint Mary's", score: "63-50", winner: "Texas A&M" },
  { region: "East", seed1: 3, team1: "Illinois", seed2: 14, team2: "Penn", score: "105-70", winner: "Illinois" },
  { region: "Midwest", seed1: 9, team1: "Saint Louis", seed2: 8, team2: "Georgia", score: "102-77", winner: "Saint Louis" },
  { region: "West", seed1: 3, team1: "Gonzaga", seed2: 14, team2: "Kennesaw State", score: "73-64", winner: "Gonzaga" },
  { region: "South", seed1: 2, team1: "Houston", seed2: 15, team2: "Idaho", score: "78-47", winner: "Houston" },
  // Friday March 20
  { region: "Midwest", seed1: 7, team1: "Kentucky", seed2: 10, team2: "Santa Clara", score: "89-84 OT", winner: "Kentucky" },
  { region: "Midwest", seed1: 5, team1: "Texas Tech", seed2: 12, team2: "Akron", score: "91-71", winner: "Texas Tech" },
  { region: "West", seed1: 1, team1: "Arizona", seed2: 16, team2: "Long Island University", score: "92-58", winner: "Arizona" },
  { region: "East", seed1: 3, team1: "Virginia", seed2: 14, team2: "Wright State", score: "82-73", winner: "Virginia" },
  { region: "Midwest", seed1: 2, team1: "Iowa State", seed2: 15, team2: "Tennessee State", score: "108-74", winner: "Iowa State" },
  { region: "South", seed1: 4, team1: "Alabama", seed2: 13, team2: "Hofstra", score: "90-70", winner: "Alabama" },
  { region: "West", seed1: 9, team1: "Utah State", seed2: 8, team2: "Villanova", score: "86-76", winner: "Utah State" },
  { region: "South", seed1: 6, team1: "Tennessee", seed2: 11, team2: "Miami (Ohio)", score: "78-56", winner: "Tennessee" },
  { region: "Midwest", seed1: 9, team1: "Iowa", seed2: 8, team2: "Clemson", score: "67-61", winner: "Iowa" },
  { region: "West", seed1: 5, team1: "St. John's", seed2: 12, team2: "UNI", score: "79-53", winner: "St. John's" },
  { region: "Midwest", seed1: 2, team1: "Purdue", seed2: 15, team2: "Queens", score: "104-71", winner: "Purdue" },
  { region: "West", seed1: 7, team1: "UCLA", seed2: 10, team2: "UCF", score: "75-71", winner: "UCLA" },
  { region: "South", seed1: 1, team1: "Florida", seed2: 16, team2: "Prairie View A&M", score: "114-55", winner: "Florida" },
  { region: "South", seed1: 4, team1: "Kansas", seed2: 13, team2: "Cal Baptist", score: "68-60", winner: "Kansas" },
  { region: "West", seed1: 7, team1: "Miami (Fla.)", seed2: 10, team2: "Missouri", score: "80-66", winner: "Miami (Fla.)" },
  { region: "East", seed1: 2, team1: "UConn", seed2: 15, team2: "Furman", score: "82-71", winner: "UConn" },
];

const REGIONS = ["All", "East", "South", "Midwest", "West"];

function Matchups() {
  const [region, setRegion] = useState("All");
  const [mode, setMode] = useState("team");
  const [selected, setSelected] = useState(null);

  const filtered = region === "All" ? MATCHUPS : MATCHUPS.filter((m) => m.region === region);
  const matchup = selected !== null ? filtered[selected] : null;

  return (
    <div style={{ backgroundColor: "#f8f7f4", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8e6e1", padding: "2.5rem 0" }}>
        <Container>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.78rem", color: "#9ca3af", fontWeight: "600", marginBottom: "0.4rem" }}>
            2025 NCAA Tournament
          </p>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "2.2rem", fontWeight: "700", color: "#08060d", letterSpacing: "-0.5px", marginBottom: "0.5rem" }}>
            Matchups
          </h1>
          <p style={{ color: "#6b6375", margin: 0 }}>
            Round of 64 results. Select a matchup to see the detail panel.
          </p>
        </Container>
      </div>

      <Container className="py-4">
        {/* Filters */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => { setRegion(r); setSelected(null); }}
                style={{
                  padding: "0.35rem 0.9rem",
                  borderRadius: "20px",
                  border: region === r ? "2px solid #08060d" : "2px solid #e8e6e1",
                  backgroundColor: region === r ? "#08060d" : "#ffffff",
                  color: region === r ? "#ffffff" : "#6b6375",
                  fontSize: "0.82rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {r}
              </button>
            ))}
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Form.Select
              size="sm"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              style={{ fontSize: "0.85rem", borderColor: "#e8e6e1", borderRadius: "8px" }}
            >
              <option value="team">Team Mode</option>
              <option value="player">Player Mode</option>
              <option value="coach">Coach Mode</option>
            </Form.Select>
          </div>
        </div>

        <Row className="g-4">
          {/* Matchup list */}
          <Col md={5}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e8e6e1", overflow: "hidden" }}>
              <div style={{ padding: "0.75rem 1.25rem", borderBottom: "1px solid #e8e6e1", fontSize: "0.85rem", fontWeight: "600", color: "#08060d" }}>
                {filtered.length} matchups
              </div>
              <div style={{ maxHeight: "520px", overflowY: "auto" }}>
                {filtered.map((m, i) => (
                  <div
                    key={i}
                    onClick={() => setSelected(selected === i ? null : i)}
                    style={{
                      padding: "0.75rem 1.25rem",
                      borderBottom: "1px solid #f0eeeb",
                      cursor: "pointer",
                      backgroundColor: selected === i ? "#f8f7f4" : "transparent",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.87rem", fontWeight: m.winner === m.team1 ? "700" : "400", color: m.winner === m.team1 ? "#08060d" : "#9ca3af" }}>
                          ({m.seed1}) {m.team1}
                        </div>
                        <div style={{ fontSize: "0.87rem", fontWeight: m.winner === m.team2 ? "700" : "400", color: m.winner === m.team2 ? "#08060d" : "#9ca3af" }}>
                          ({m.seed2}) {m.team2}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: "0.75rem", color: "#b0aab8" }}>{m.region}</div>
                        <div style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6b6375" }}>{m.score}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Details */}
          <Col md={7}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e8e6e1", padding: "1.5rem", minHeight: "400px" }}>
              {!matchup ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "360px", color: "#b0aab8", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📋</div>
                  <p style={{ margin: 0, fontSize: "0.95rem" }}>Select a matchup to see details</p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {matchup.region} Region · Round of 64
                    </div>
                    <div style={{ fontFamily: "'Georgia', serif", fontWeight: "700", fontSize: "1.15rem", color: "#08060d" }}>
                      ({matchup.seed1}) {matchup.team1} vs. ({matchup.seed2}) {matchup.team2}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                    <div style={{ padding: "0.4rem 0.9rem", backgroundColor: "#f0fdf4", borderRadius: "6px", fontSize: "0.82rem", fontWeight: "700", color: "#16a34a", border: "1px solid #bbf7d0" }}>
                      Final: {matchup.score}
                    </div>
                    <div style={{ padding: "0.4rem 0.9rem", backgroundColor: "#fdf0ef", borderRadius: "6px", fontSize: "0.82rem", fontWeight: "700", color: "#c0392b", border: "1px solid #f5c6c2" }}>
                      Winner: {matchup.winner}
                    </div>
                  </div>

                  {/* Stat comparison — placeholder TODO */}
                  <div style={{ borderTop: "1px solid #f0eeeb", paddingTop: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                      <span style={{ fontSize: "0.78rem", fontWeight: "600", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        Season Stats — {mode === "team" ? "Team" : mode === "player" ? "Player" : "Coach"} Mode
                      </span>
                    </div>

                    {["Points Per Game", "Field Goal %", "Opp. PPG", "Strength of Schedule"].map((label) => (
                      <div key={label} style={{ marginBottom: "1.1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem", alignItems: "center" }}>
                          <div style={{ width: "55px", height: "12px", backgroundColor: "#f0eeeb", borderRadius: "4px", animation: "pulse 1.5s ease infinite" }} />
                          <span style={{ fontSize: "0.78rem", color: "#b0aab8" }}>{label}</span>
                          <div style={{ width: "55px", height: "12px", backgroundColor: "#f0eeeb", borderRadius: "4px" }} />
                        </div>
                        <div style={{ display: "flex", height: "6px", gap: "2px" }}>
                          <div style={{ flex: 1, backgroundColor: "#f0eeeb", borderRadius: "3px" }} />
                          <div style={{ flex: 1, backgroundColor: "#f0eeeb", borderRadius: "3px" }} />
                        </div>
                      </div>
                    ))}

                    <Alert variant="light" style={{ border: "1px dashed #d4cfd9", backgroundColor: "#fafafa", fontSize: "0.82rem", color: "#6b6375", marginTop: "1rem", marginBottom: 0 }}>
                      📂 Stat bars will populate once a season data CSV is connected. This panel will show PPG, FG%, SOS, and coach tournament record side by side per evaluation mode.
                    </Alert>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Matchups;
