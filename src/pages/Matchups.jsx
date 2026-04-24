import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import StatBar from "../components/common/StatBar.jsx";
import TeamBadge from "../components/common/TeamBadge.jsx";
import { TEAM_DATA, BRACKET_2026, RESULTS_2025 } from "../data/teamData.js";

const REGIONS = ["All", "East", "Midwest", "South", "West"];
const SEED_PAIRS = [[1,16],[8,9],[5,12],[4,13],[6,11],[3,14],[7,10],[2,15]];

const MODE_STATS = {
  team: [
    { key: "ppg",    label: "Points Per Game",  max: 95 },
    { key: "oppPpg", label: "Opp. PPG",         max: 90, lowerBetter: true },
    { key: "fgPct",  label: "Field Goal %",     max: 55 },
    { key: "ast",    label: "Assists Per Game", max: 21 },
  ],
  player: [
    { key: "ppg",    label: "Points Per Game",  max: 95 },
    { key: "fgPct",  label: "Field Goal %",     max: 55 },
    { key: "fg3Pct", label: "3-Point %",        max: 45 },
    { key: "ftPct",  label: "Free Throw %",     max: 90 },
  ],
  coach: [
    { key: "coachWins", label: "Coach NCAA Wins",    max: 65 },
    { key: "oppPpg",    label: "Opp. PPG",           max: 90, lowerBetter: true },
    { key: "toPg",      label: "Turnovers Per Game", max: 15, lowerBetter: true },
    { key: "stl",       label: "Steals Per Game",    max: 12 },
  ],
};

// Build upcoming 2026 matchup list from bracket structure
const MATCHUPS_2026 = Object.entries(BRACKET_2026).flatMap(([region, games]) =>
  games.map(([t1, t2], i) => ({
    region,
    seed1: SEED_PAIRS[i][0],
    seed2: SEED_PAIRS[i][1],
    team1: t1,
    team2: t2,
    score: null,
    winner: null,
  }))
);

function Matchups() {
  const [tab, setTab]           = useState("2026");
  const [region, setRegion]     = useState("All");
  const [mode, setMode]         = useState("team");
  const [selected, setSelected] = useState(null);

  const source   = tab === "2026" ? MATCHUPS_2026 : RESULTS_2025;
  const filtered = region === "All" ? source : source.filter((m) => m.region === region);
  const matchup  = selected !== null ? filtered[selected] : null;
  const statsA   = matchup ? TEAM_DATA[matchup.team1] : null;
  const statsB   = matchup ? TEAM_DATA[matchup.team2] : null;

  const handleTabChange = (t) => { setTab(t); setSelected(null); setRegion("All"); };

  return (
    <div style={{ backgroundColor: "#f8f7f4", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8e6e1", padding: "2.5rem 0" }}>
        <Container>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.78rem", color: "#9ca3af", fontWeight: "600", marginBottom: "0.4rem" }}>
            NCAA Tournament
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ textAlign: "left" }}>
              <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "2.2rem", fontWeight: "700", color: "#08060d", letterSpacing: "-0.5px", marginBottom: "0.4rem" }}>
                Matchups
              </h1>
              <p style={{ color: "#6b6375", margin: 0 }}>
                {tab === "2026"
                  ? "2026 bracket with 2025-26 season stats. Results pending."
                  : "2025 Round of 64 completed results."}
              </p>
            </div>
            <Form.Select size="sm" value={mode} onChange={(e) => setMode(e.target.value)}
              style={{ fontSize: "0.85rem", borderColor: "#e8e6e1", borderRadius: "8px", width: "auto" }}>
              <option value="team">Team Mode</option>
              <option value="player">Player Mode</option>
              <option value="coach">Coach Mode</option>
            </Form.Select>
          </div>
          <div style={{ display: "flex", gap: "0.4rem", marginTop: "1.25rem" }}>
            {["2026", "2025"].map((y) => (
              <button key={y} onClick={() => handleTabChange(y)} style={{
                padding: "0.35rem 1rem", borderRadius: "20px",
                border: tab === y ? "2px solid #c0392b" : "2px solid #e8e6e1",
                backgroundColor: tab === y ? "#c0392b" : "#ffffff",
                color: tab === y ? "#ffffff" : "#6b6375",
                fontSize: "0.82rem", fontWeight: "600", cursor: "pointer", transition: "all 0.15s",
              }}>
                {y === "2026" ? "2026 (Current)" : "2025 (Completed)"}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-4">
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {REGIONS.map((r) => (
            <button key={r} onClick={() => { setRegion(r); setSelected(null); }} style={{
              padding: "0.35rem 0.9rem", borderRadius: "20px",
              border: region === r ? "2px solid #08060d" : "2px solid #e8e6e1",
              backgroundColor: region === r ? "#08060d" : "#ffffff",
              color: region === r ? "#ffffff" : "#6b6375",
              fontSize: "0.82rem", fontWeight: "600", cursor: "pointer", transition: "all 0.15s",
            }}>{r}</button>
          ))}
        </div>

        <Row className="g-4">
          <Col md={5}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e8e6e1", overflow: "hidden" }}>
              <div style={{ padding: "0.75rem 1.25rem", borderBottom: "1px solid #e8e6e1", fontSize: "0.85rem", fontWeight: "600", color: "#08060d", display: "flex", justifyContent: "space-between" }}>
                <span>{filtered.length} matchups</span>
                {tab === "2026" && <span style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: "400" }}>Results TBD</span>}
              </div>
              <div style={{ maxHeight: "520px", overflowY: "auto" }}>
                {filtered.map((m, i) => (
                  <div key={i} onClick={() => setSelected(selected === i ? null : i)} style={{
                    padding: "0.75rem 1.25rem", borderBottom: "1px solid #f0eeeb",
                    cursor: "pointer", backgroundColor: selected === i ? "#f8f7f4" : "transparent",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontSize: "0.87rem", fontWeight: m.winner === m.team1 ? "700" : "400", color: m.winner === m.team1 ? "#08060d" : (m.winner ? "#9ca3af" : "#3d3646") }}>
                          ({m.seed1}) {m.team1}
                        </div>
                        <div style={{ fontSize: "0.87rem", fontWeight: m.winner === m.team2 ? "700" : "400", color: m.winner === m.team2 ? "#08060d" : (m.winner ? "#9ca3af" : "#3d3646") }}>
                          ({m.seed2}) {m.team2}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: "0.75rem", color: "#b0aab8" }}>{m.region}</div>
                        {m.score
                          ? <div style={{ fontSize: "0.8rem", fontWeight: "600", color: "#6b6375" }}>{m.score}</div>
                          : <div style={{ fontSize: "0.72rem", color: "#d4cfd9", fontStyle: "italic" }}>upcoming</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col md={7}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e8e6e1", padding: "1.5rem", minHeight: "400px" }}>
              {!matchup ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "360px", color: "#b0aab8", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📋</div>
                  <p style={{ margin: 0, fontSize: "0.95rem" }}>Select a matchup to compare stats</p>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "left" }}>
                    {matchup.region} Region · Round of 64 · {tab === "2026" ? "2026 Tournament" : "2025 Tournament"}
                  </div>
                  <Row className="g-2 mb-3">
                    <Col xs={6}>
                      <TeamBadge seed={matchup.seed1} name={matchup.team1}
                        conference={statsA?.conf ?? ""} record={statsA?.record ?? ""}
                        selected={tab === "2025" && matchup.winner === matchup.team1} />
                    </Col>
                    <Col xs={6}>
                      <TeamBadge seed={matchup.seed2} name={matchup.team2}
                        conference={statsB?.conf ?? ""} record={statsB?.record ?? ""}
                        selected={tab === "2025" && matchup.winner === matchup.team2} />
                    </Col>
                  </Row>
                  <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                    {matchup.score ? (
                      <>
                        <div style={{ padding: "0.4rem 0.9rem", backgroundColor: "#f0fdf4", borderRadius: "6px", fontSize: "0.82rem", fontWeight: "700", color: "#16a34a", border: "1px solid #bbf7d0" }}>
                          Final: {matchup.score}
                        </div>
                        <div style={{ padding: "0.4rem 0.9rem", backgroundColor: "#fdf0ef", borderRadius: "6px", fontSize: "0.82rem", fontWeight: "700", color: "#c0392b", border: "1px solid #f5c6c2" }}>
                          Winner: {matchup.winner}
                        </div>
                      </>
                    ) : (
                      <div style={{ padding: "0.4rem 0.9rem", backgroundColor: "#f8f7f4", borderRadius: "6px", fontSize: "0.82rem", fontWeight: "600", color: "#9ca3af", border: "1px solid #e8e6e1" }}>
                        2026 Tournament — result pending
                      </div>
                    )}
                  </div>
                  {mode === "coach" && statsA && statsB && (
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                      <div style={{ flex: 1, backgroundColor: "#f8f7f4", borderRadius: "8px", padding: "0.6rem 0.8rem", fontSize: "0.78rem", textAlign: "left" }}>
                        <div style={{ fontWeight: "700", color: "#08060d", marginBottom: "0.1rem" }}>{statsA.coachName}</div>
                        <div style={{ color: "#9ca3af" }}>{statsA.coachWins} NCAA tourney wins</div>
                      </div>
                      <div style={{ flex: 1, backgroundColor: "#f8f7f4", borderRadius: "8px", padding: "0.6rem 0.8rem", fontSize: "0.78rem", textAlign: "right" }}>
                        <div style={{ fontWeight: "700", color: "#08060d", marginBottom: "0.1rem" }}>{statsB.coachName}</div>
                        <div style={{ color: "#9ca3af" }}>{statsB.coachWins} NCAA tourney wins</div>
                      </div>
                    </div>
                  )}
                  <div style={{ borderTop: "1px solid #f0eeeb", paddingTop: "1.25rem" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: "600", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem", textAlign: "left" }}>
                      2025-26 Season Stats — {mode === "team" ? "Team" : mode === "player" ? "Player" : "Coach"} Mode
                    </div>
                    {statsA && statsB
                      ? MODE_STATS[mode].map(({ key, label, max, lowerBetter }) => (
                          <StatBar key={key}
                            label={label + (lowerBetter ? " ↓" : "")}
                            valueA={statsA[key] ?? 0} valueB={statsB[key] ?? 0}
                            maxValue={max} nameA={matchup.team1} nameB={matchup.team2} />
                        ))
                      : <p style={{ color: "#b0aab8", fontSize: "0.85rem", textAlign: "left" }}>Stats not available.</p>
                    }
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
