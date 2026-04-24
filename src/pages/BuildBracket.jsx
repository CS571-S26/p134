import { useState } from "react";
import { Container, Row, Col, Button, Form, Alert, Modal } from "react-bootstrap";
import { BRACKET_2026, TEAM_DATA } from "../data/teamData.js";

const STORAGE_KEY = "bracketlab_saved_brackets";

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function persistSaved(arr) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch {}
}

// Seed lookup — derived from BRACKET_2026 structure (1v16, 8v9, 5v12, 4v13, 6v11, 3v14, 7v10, 2v15)
const SEED_PAIRS = [[1,16],[8,9],[5,12],[4,13],[6,11],[3,14],[7,10],[2,15]];

function BracketMatchup({ teamA, teamB, seedA, seedB, onPick, pickedTeam }) {
  return (
    <div style={{ backgroundColor: "#f8f7f4", border: "1px solid #e8e6e1", borderRadius: "8px", overflow: "hidden", fontSize: "0.82rem" }}>
      {[[teamA, seedA], [teamB, seedB]].map(([team, seed], i) => (
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
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.68rem", color: pickedTeam === team ? "#c0392b" : "#b0aab8", fontWeight: "700", minWidth: "14px" }}>{seed}</span>
          {pickedTeam === team && <span style={{ fontSize: "0.65rem" }}>✓</span>}
          <span>{team}</span>
          {TEAM_DATA[team] && (
            <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: "#b0aab8" }}>{TEAM_DATA[team].record}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function BuildBracket() {
  const [picks, setPicks]                 = useState({});
  const [activeRegion, setActiveRegion]   = useState("East");
  const [mode, setMode]                   = useState("team");
  const [bracketName, setBracketName]     = useState("My Bracket");
  const [saveStatus, setSaveStatus]       = useState(null);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [savedBrackets, setSavedBrackets] = useState(loadSaved);
  const [currentId, setCurrentId]         = useState(null);

  const totalMatchups = Object.values(BRACKET_2026).reduce((a, r) => a + r.length, 0);
  const totalPicks    = Object.keys(picks).length;
  const pct           = Math.round((totalPicks / totalMatchups) * 100);

  const handlePick = (region, idx, team) => {
    setPicks((prev) => ({ ...prev, [`${region}-${idx}`]: team }));
    setSaveStatus(null);
  };

  const handleSave = () => {
    const saved = loadSaved();
    const now = new Date().toLocaleString();
    let updated;
    if (currentId) {
      updated = saved.map((b) => b.id === currentId
        ? { ...b, name: bracketName, picks, mode, savedAt: now, totalPicks, totalMatchups }
        : b);
      setSaveStatus("updated");
    } else {
      const nb = { id: Date.now().toString(), name: bracketName, picks, mode, savedAt: now, totalPicks, totalMatchups };
      updated = [...saved, nb];
      setCurrentId(nb.id);
      setSaveStatus("saved");
    }
    persistSaved(updated);
    setSavedBrackets(updated);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleLoad = (b) => {
    setPicks(b.picks); setBracketName(b.name); setMode(b.mode || "team");
    setCurrentId(b.id); setShowLoadModal(false); setSaveStatus(null);
  };

  const handleDelete = (id) => {
    const updated = savedBrackets.filter((b) => b.id !== id);
    persistSaved(updated); setSavedBrackets(updated);
    if (currentId === id) setCurrentId(null);
  };

  const handleNew = () => {
    setPicks({}); setBracketName("My Bracket"); setMode("team");
    setCurrentId(null); setSaveStatus(null);
  };

  return (
    <div style={{ backgroundColor: "#f8f7f4", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8e6e1", padding: "2rem 0" }}>
        <Container>
          <Row className="align-items-center g-3">
            <Col>
              <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.78rem", color: "#9ca3af", fontWeight: "600", marginBottom: "0.3rem" }}>
                Bracket Builder · 2026 NCAA Tournament
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <input
                  value={bracketName}
                  onChange={(e) => setBracketName(e.target.value)}
                  style={{ fontFamily: "'Georgia', serif", fontSize: "1.8rem", fontWeight: "700", color: "#08060d", border: "none", background: "transparent", outline: "none", letterSpacing: "-0.5px", minWidth: "180px" }}
                />
                <span style={{
                  display: "inline-flex", alignItems: "center",
                  backgroundColor: totalPicks === totalMatchups ? "#27ae60" : "#08060d",
                  color: "#ffffff", fontWeight: "600", fontSize: "0.78rem",
                  padding: "0.3rem 0.75rem", borderRadius: "20px", whiteSpace: "nowrap",
                }}>
                  {totalPicks}/{totalMatchups} picks — {pct}%
                </span>
              </div>
              {currentId && <div style={{ fontSize: "0.78rem", color: "#9ca3af", marginTop: "0.25rem" }}>Editing saved bracket</div>}
            </Col>
            <Col xs="auto" className="d-flex gap-2 align-items-center flex-wrap">
              <Form.Select size="sm" value={mode} onChange={(e) => setMode(e.target.value)}
                style={{ fontSize: "0.85rem", borderColor: "#e8e6e1", borderRadius: "8px", width: "auto" }}>
                <option value="team">Team Mode</option>
                <option value="player">Player Mode</option>
                <option value="coach">Coach Mode</option>
              </Form.Select>
              <Button size="sm" variant="outline-secondary"
                onClick={() => { setSavedBrackets(loadSaved()); setShowLoadModal(true); }}
                style={{ borderColor: "#e8e6e1", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "600" }}>Load</Button>
              <Button size="sm" variant="outline-secondary" onClick={handleNew}
                style={{ borderColor: "#e8e6e1", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "600" }}>New</Button>
              <Button size="sm" onClick={handleSave} style={{
                backgroundColor: saveStatus ? "#27ae60" : "#08060d", border: "none",
                borderRadius: "8px", fontWeight: "600", fontSize: "0.85rem",
                transition: "background 0.3s", minWidth: "120px",
              }}>
                {saveStatus === "saved" ? "✓ Saved!" : saveStatus === "updated" ? "✓ Updated!" : currentId ? "Update Bracket" : "Save Bracket"}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-4">
        <Alert variant="light" style={{ border: "1px dashed #d4cfd9", backgroundColor: "#fafafa", fontSize: "0.85rem", color: "#6b6375", marginBottom: "1.5rem" }}>
          <strong style={{ color: "#08060d" }}>2026 NCAA Tournament — Round of 64.</strong>
          {" "}Stats shown are from the 2025-26 regular season. Pick winners, save your bracket, then head to{" "}
          <strong style={{ color: "#08060d" }}>Compare</strong> to diff two brackets side by side.
        </Alert>

        {/* Region tabs */}
        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {Object.keys(BRACKET_2026).map((r) => {
            const done = BRACKET_2026[r].filter((_, i) => picks[`${r}-${i}`]).length;
            return (
              <button key={r} onClick={() => setActiveRegion(r)} style={{
                padding: "0.45rem 1.1rem", borderRadius: "20px",
                border: activeRegion === r ? "2px solid #08060d" : "2px solid #e8e6e1",
                backgroundColor: activeRegion === r ? "#08060d" : "#ffffff",
                color: activeRegion === r ? "#ffffff" : "#6b6375",
                fontSize: "0.85rem", fontWeight: "600", cursor: "pointer", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                {r}
                <span style={{ fontSize: "0.7rem", backgroundColor: activeRegion === r ? "rgba(255,255,255,0.2)" : "#f0eeeb", color: activeRegion === r ? "#fff" : "#9ca3af", borderRadius: "10px", padding: "0.1rem 0.4rem" }}>
                  {done}/{BRACKET_2026[r].length}
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
            <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Click a team to pick the winner</span>
          </div>
          <Row className="g-3">
            {BRACKET_2026[activeRegion].map((matchup, i) => {
              const [s1, s2] = SEED_PAIRS[i];
              return (
                <Col key={i} xs={12} sm={6} lg={4}>
                  <div style={{ fontSize: "0.72rem", color: "#b0aab8", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Game {i + 1} · #{s1} vs #{s2}
                  </div>
                  <BracketMatchup
                    teamA={matchup[0]} seedA={s1}
                    teamB={matchup[1]} seedB={s2}
                    onPick={(team) => handlePick(activeRegion, i, team)}
                    pickedTeam={picks[`${activeRegion}-${i}`]}
                  />
                </Col>
              );
            })}
          </Row>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: "1.5rem", backgroundColor: "#ffffff", borderRadius: "10px", border: "1px solid #e8e6e1", padding: "1rem 1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#08060d" }}>Overall Progress</span>
            <span style={{ fontSize: "0.85rem", color: "#6b6375" }}>{pct}%</span>
          </div>
          <div style={{ backgroundColor: "#f0eeeb", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, backgroundColor: pct === 100 ? "#27ae60" : "#c0392b", borderRadius: "4px", transition: "width 0.4s ease" }} />
          </div>
        </div>

        <div style={{ marginTop: "1.5rem", backgroundColor: "#ffffff", borderRadius: "10px", border: "1px dashed #d4cfd9", padding: "1.5rem", textAlign: "center", color: "#b0aab8" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🚧</div>
          <p style={{ margin: 0, fontSize: "0.88rem" }}>
            Round of 32, Sweet 16, Elite 8, Final Four, and Championship coming in a future milestone.
          </p>
        </div>
      </Container>

      {/* Load Modal */}
      <Modal show={showLoadModal} onHide={() => setShowLoadModal(false)} centered>
        <Modal.Header closeButton style={{ borderBottom: "1px solid #e8e6e1" }}>
          <Modal.Title style={{ fontFamily: "'Georgia', serif", fontSize: "1.2rem", fontWeight: "700" }}>Saved Brackets</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "1.25rem" }}>
          {savedBrackets.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#b0aab8" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</div>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>No saved brackets yet. Fill out picks and hit Save!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {savedBrackets.map((b) => (
                <div key={b.id} style={{ border: "1px solid #e8e6e1", borderRadius: "10px", padding: "0.9rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#08060d", marginBottom: "0.15rem" }}>{b.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>
                      {Object.keys(b.picks).length}/{b.totalMatchups || 32} picks · {b.mode || "team"} mode · {b.savedAt}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                    <Button size="sm" onClick={() => handleLoad(b)} style={{ backgroundColor: "#08060d", border: "none", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "600" }}>Load</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(b.id)} style={{ borderRadius: "6px", fontSize: "0.8rem", fontWeight: "600" }}>✕</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BuildBracket;
