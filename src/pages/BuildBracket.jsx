import { useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { BRACKET_2026 } from "../data/teamData.js";
import {
  ROUND_OPTIONS,
  getRegionGames,
  getNationalGames,
  getTotalGameCount,
  countValidPicks,
  getChampion,
  loadSaved,
  persistSaved,
  prunePicksAfterChange,
} from "../utils/bracketUtils.js";
import RoundSelector from "../components/bracket/RoundSelector.jsx";
import BracketRound from "../components/bracket/BracketRound.jsx";
import BracketProgress from "../components/bracket/BracketProgress.jsx";
import SavedBracketModal from "../components/bracket/SavedBracketModal.jsx";

function BuildBracket() {
  const [picks, setPicks]                 = useState({});
  const [activeRegion, setActiveRegion]   = useState("East");
  const [activeRound, setActiveRound]     = useState("r64");
  const [mode, setMode]                   = useState("team");
  const [bracketName, setBracketName]     = useState("My Bracket");
  const [saveStatus, setSaveStatus]       = useState(null);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [savedBrackets, setSavedBrackets] = useState(loadSaved);
  const [currentId, setCurrentId]         = useState(null);

  const totalMatchups = getTotalGameCount();
  const totalPicks    = countValidPicks(picks);
  const pct           = Math.round((totalPicks / totalMatchups) * 100);
  const champion      = getChampion(picks);
  const isNationalRound = activeRound === "f4" || activeRound === "champ";
  const roundMeta = ROUND_OPTIONS.find((round) => round.key === activeRound);

  const handlePick = (game, team) => {
    setPicks((prev) => {
      const cleaned = prunePicksAfterChange(prev, game.region, game.roundKey);
      return { ...cleaned, [game.key]: team };
    });
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
    setPicks(b.picks || {});
    setBracketName(b.name || "My Bracket");
    setMode(b.mode || "team");
    setCurrentId(b.id);
    setShowLoadModal(false);
    setSaveStatus(null);
  };

  const handleDelete = (id) => {
    const updated = savedBrackets.filter((b) => b.id !== id);
    persistSaved(updated);
    setSavedBrackets(updated);
    if (currentId === id) {
      setCurrentId(null);
    }
  };

  const handleNew = () => {
    setPicks({});
    setBracketName("My Bracket");
    setMode("team");
    setCurrentId(null);
    setActiveRound("r64");
    setActiveRegion("East");
    setSaveStatus(null);
  };

  const roundGames = isNationalRound
    ? getNationalGames(activeRound, picks)
    : getRegionGames(activeRegion, activeRound, picks);

  return (
    <div style={{ backgroundColor: "#f8f7f4", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8e6e1", padding: "2rem 0" }}>
        <Container>
          <Row className="align-items-center g-3">
            <Col>
              <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.78rem", color: "#5c5566", fontWeight: "700", marginBottom: "0.3rem" }}>
                Bracket Builder · 2026 NCAA Tournament
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Form.Group controlId="bracket-name">
                  <Form.Label className="visually-hidden">Bracket name</Form.Label>
                  <Form.Control
                    value={bracketName}
                    onChange={(e) => setBracketName(e.target.value)}
                    aria-label="Bracket name"
                    style={{ fontFamily: "'Georgia', serif", fontSize: "1.8rem", fontWeight: "700", color: "#08060d", border: "1px solid transparent", background: "transparent", letterSpacing: "-0.5px", minWidth: "180px" }}
                  />
                </Form.Group>
                <span style={{
                  display: "inline-flex", alignItems: "center",
                  backgroundColor: totalPicks === totalMatchups ? "#176c3a" : "#08060d",
                  color: "#ffffff", fontWeight: "700", fontSize: "0.78rem",
                  padding: "0.3rem 0.75rem", borderRadius: "20px", whiteSpace: "nowrap",
                }}>
                  {totalPicks}/{totalMatchups} picks · {pct}%
                </span>
              </div>
              {currentId && <div style={{ fontSize: "0.78rem", color: "#5c5566", marginTop: "0.25rem" }}>Editing saved bracket</div>}
            </Col>
            <Col xs="auto" className="d-flex gap-2 align-items-end flex-wrap">
              <Form.Group controlId="evaluation-mode">
                <Form.Label className="visually-hidden">Evaluation mode</Form.Label>
                <Form.Select size="sm" value={mode} onChange={(e) => setMode(e.target.value)}
                  style={{ fontSize: "0.85rem", borderColor: "#d9d4dc", borderRadius: "8px", width: "auto" }}>
                  <option value="team">Team Mode</option>
                  <option value="player">Player Mode</option>
                  <option value="coach">Coach Mode</option>
                </Form.Select>
              </Form.Group>
              <Button size="sm" variant="outline-secondary"
                onClick={() => { setSavedBrackets(loadSaved()); setShowLoadModal(true); }}
                style={{ borderColor: "#d9d4dc", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "700" }}>Load</Button>
              <Button size="sm" variant="outline-secondary" onClick={handleNew}
                style={{ borderColor: "#d9d4dc", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "700" }}>New</Button>
              <Button size="sm" onClick={handleSave} style={{
                backgroundColor: saveStatus ? "#176c3a" : "#08060d", border: "none",
                borderRadius: "8px", fontWeight: "700", fontSize: "0.85rem",
                transition: "background 0.3s", minWidth: "120px",
              }}>
                {saveStatus === "saved" ? "✓ Saved" : saveStatus === "updated" ? "✓ Updated" : currentId ? "Update Bracket" : "Save Bracket"}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-4">
        <Alert variant="light" style={{ border: "1px dashed #b8afc0", backgroundColor: "#fafafa", fontSize: "0.85rem", color: "#4f4759", marginBottom: "1.5rem" }}>
          <strong style={{ color: "#08060d" }}>Full 63-game bracket builder.</strong>
          {" "}Start with the Round of 64, then advance your winners through the title game. Save your bracket and compare it with another version.
        </Alert>

        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d9d4dc", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginBottom: "1rem" }}>
            <div>
              <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "1.5rem", fontWeight: "700", color: "#08060d", margin: 0 }}>Make picks by round</h1>
              <p style={{ color: "#5c5566", margin: "0.25rem 0 0", fontSize: "0.9rem" }}>Later rounds unlock after earlier picks are made.</p>
            </div>
            <RoundSelector rounds={ROUND_OPTIONS} activeRound={activeRound} onSelect={setActiveRound} />
          </div>

          {!isNationalRound && (
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }} aria-label="Region selector">
              {Object.keys(BRACKET_2026).map((region) => {
                const done = BRACKET_2026[region].filter((_, i) => picks[`${region}-${i}`]).length;
                return (
                  <button key={region} type="button" onClick={() => setActiveRegion(region)} className="pill-button" style={{
                    padding: "0.45rem 1.1rem", borderRadius: "20px",
                    border: activeRegion === region ? "2px solid #08060d" : "2px solid #d9d4dc",
                    backgroundColor: activeRegion === region ? "#08060d" : "#ffffff",
                    color: activeRegion === region ? "#ffffff" : "#4f4759",
                    fontSize: "0.85rem", fontWeight: "700", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "0.4rem",
                  }}>
                    {region}
                    <span style={{ fontSize: "0.7rem", backgroundColor: activeRegion === region ? "rgba(255,255,255,0.2)" : "#eee9f0", color: activeRegion === region ? "#fff" : "#4f4759", borderRadius: "10px", padding: "0.1rem 0.4rem" }}>
                      {done}/{BRACKET_2026[region].length}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d9d4dc", padding: "1.5rem" }}>
          <BracketRound
            title={isNationalRound ? roundMeta.label : `${activeRegion} Region · ${roundMeta.label}`}
            subtitle={isNationalRound ? "Pick the teams that advance on the national side of the bracket." : "Advance winners inside this region first."}
            games={roundGames}
            picks={picks}
            onPick={handlePick}
          />
        </div>

        <BracketProgress totalPicks={totalPicks} totalMatchups={totalMatchups} champion={champion} />

        <div style={{ marginTop: "1.5rem", backgroundColor: "#ffffff", borderRadius: "10px", border: "1px dashed #b8afc0", padding: "1.5rem", textAlign: "center", color: "#5c5566" }}>
          <div aria-hidden="true" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🏆</div>
          <p style={{ margin: 0, fontSize: "0.88rem" }}>
            {champion ? `${champion} is your current champion.` : "Finish the Final Four and championship to crown a winner."}
          </p>
        </div>
      </Container>

      <SavedBracketModal
        show={showLoadModal}
        onHide={() => setShowLoadModal(false)}
        savedBrackets={savedBrackets}
        onLoad={handleLoad}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default BuildBracket;
