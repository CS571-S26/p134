import { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { BRACKET_2026 } from "../data/teamData.js";

const STORAGE_KEY = "bracketlab_saved_brackets";

// Derive the ordered game list directly from the real 2026 bracket
// so Compare always stays in sync with BuildBracket
const BRACKET_ORDER = Object.entries(BRACKET_2026).map(([region, matchups]) => ({
  region,
  matchups,
}));

function loadSavedBrackets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function BracketSlot({ label, bracket, onSelect, slotColor }) {
  const [showModal, setShowModal] = useState(false);
  const [brackets, setBrackets]   = useState([]);

  const open = () => { setBrackets(loadSavedBrackets()); setShowModal(true); };

  return (
    <>
      <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: `2px solid ${bracket ? slotColor + "55" : "#e8e6e1"}`, padding: "1.25rem" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: "700", color: slotColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
          {label}
        </div>
        {bracket ? (
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: "700", fontSize: "1rem", color: "#08060d", marginBottom: "0.3rem" }}>{bracket.name}</div>
            <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.75rem" }}>
              {Object.keys(bracket.picks).length}/{bracket.totalMatchups || 32} picks · {bracket.mode || "team"} mode · saved {bracket.savedAt}
            </div>
            <Button size="sm" variant="outline-secondary" onClick={open} style={{ borderRadius: "6px", fontSize: "0.8rem", borderColor: "#e8e6e1" }}>
              Change
            </Button>
          </div>
        ) : (
          <div onClick={open} style={{
            padding: "1.75rem 1rem", border: `2px dashed ${slotColor}44`, borderRadius: "8px",
            textAlign: "center", color: "#b0aab8", fontSize: "0.88rem", cursor: "pointer",
            backgroundColor: "#fafafa", transition: "background 0.15s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fafafa"}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>📄</div>
            Click to load a saved bracket
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={{ borderBottom: "1px solid #e8e6e1" }}>
          <Modal.Title style={{ fontFamily: "'Georgia', serif", fontSize: "1.1rem", fontWeight: "700" }}>
            Choose Bracket for {label}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "1.25rem" }}>
          {brackets.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#b0aab8" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</div>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>No saved brackets yet. Go to Build Bracket to create one!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {brackets.map((b) => (
                <div key={b.id} onClick={() => { onSelect(b); setShowModal(false); }} style={{
                  border: "1px solid #e8e6e1", borderRadius: "10px", padding: "0.85rem 1rem",
                  cursor: "pointer", transition: "background 0.12s, border-color 0.12s", textAlign: "left",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8f7f4"; e.currentTarget.style.borderColor = slotColor; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; e.currentTarget.style.borderColor = "#e8e6e1"; }}
                >
                  <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#08060d" }}>{b.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "#9ca3af", marginTop: "0.15rem" }}>
                    {Object.keys(b.picks).length}/{b.totalMatchups || 32} picks · {b.mode || "team"} mode · {b.savedAt}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

function Compare() {
  const [bracketA, setBracketA] = useState(null);
  const [bracketB, setBracketB] = useState(null);

  const allGames = BRACKET_ORDER.flatMap(({ region, matchups }) =>
    matchups.map((teams, i) => ({ key: `${region}-${i}`, region, teams }))
  );

  const totalBothPicked = bracketA && bracketB
    ? allGames.filter((g) => bracketA.picks[g.key] && bracketB.picks[g.key]).length : 0;
  const agreements = bracketA && bracketB
    ? allGames.filter((g) => bracketA.picks[g.key] && bracketA.picks[g.key] === bracketB.picks[g.key]).length : 0;
  const disagreements = bracketA && bracketB
    ? allGames.filter((g) => bracketA.picks[g.key] && bracketB.picks[g.key] && bracketA.picks[g.key] !== bracketB.picks[g.key]).length : 0;
  const agreementPct = totalBothPicked > 0 ? Math.round((agreements / totalBothPicked) * 100) : 0;
  const ready = bracketA && bracketB;

  return (
    <div style={{ backgroundColor: "#f8f7f4", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8e6e1", padding: "2.5rem 0" }}>
        <Container>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.78rem", color: "#9ca3af", fontWeight: "600", marginBottom: "0.4rem" }}>
            Analysis
          </p>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "2.2rem", fontWeight: "700", color: "#08060d", letterSpacing: "-0.5px", marginBottom: "0.4rem", textAlign: "left" }}>
            Compare Brackets
          </h1>
          <p style={{ color: "#6b6375", margin: 0, textAlign: "left" }}>
            Load two saved brackets to see where they agree and where they diverge, pick by pick.
          </p>
        </Container>
      </div>

      <Container className="py-4">
        <Row className="g-4 mb-4">
          <Col md={6}>
            <BracketSlot label="Bracket A" bracket={bracketA} onSelect={setBracketA} slotColor="#c0392b" />
          </Col>
          <Col md={6}>
            <BracketSlot label="Bracket B" bracket={bracketB} onSelect={setBracketB} slotColor="#2980b9" />
          </Col>
        </Row>

        {ready && (
          <Row className="g-3 mb-4">
            {[
              { label: "Games Both Picked", value: totalBothPicked, color: "#08060d" },
              { label: "Agreements",        value: agreements,      color: "#27ae60" },
              { label: "Disagreements",     value: disagreements,   color: "#c0392b" },
              { label: "Agreement Rate",    value: `${agreementPct}%`, color: "#2980b9" },
            ].map(({ label, value, color }) => (
              <Col key={label} xs={6} md={3}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", border: "1px solid #e8e6e1", padding: "1rem 1.25rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Georgia', serif", fontSize: "2rem", fontWeight: "700", color }}>{value}</div>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.25rem" }}>{label}</div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e8e6e1", overflow: "hidden" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 28px 1fr",
            padding: "0.75rem 1.25rem", borderBottom: "1px solid #e8e6e1",
            fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            <span style={{ color: "#c0392b" }}>{bracketA ? bracketA.name : "Bracket A"}</span>
            <span />
            <span style={{ color: "#2980b9", textAlign: "right" }}>{bracketB ? bracketB.name : "Bracket B"}</span>
          </div>

          {!ready ? (
            <div style={{ textAlign: "center", padding: "3.5rem 1rem", color: "#b0aab8" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>⚖️</div>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>Load two brackets above to see a pick-by-pick comparison.</p>
              <p style={{ margin: "0.5rem 0 0", fontSize: "0.83rem" }}>
                No saved brackets?{" "}
                <a href="#/build" style={{ color: "#c0392b", textDecoration: "none", fontWeight: "600" }}>Build and save one first →</a>
              </p>
            </div>
          ) : (
            <>
              {BRACKET_ORDER.map(({ region, matchups }) => (
                <div key={region}>
                  <div style={{
                    padding: "0.45rem 1.25rem", backgroundColor: "#f8f7f4",
                    borderBottom: "1px solid #e8e6e1", borderTop: "1px solid #e8e6e1",
                    fontSize: "0.72rem", fontWeight: "700", color: "#9ca3af",
                    textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "left",
                  }}>
                    {region} Region
                  </div>
                  {matchups.map((teams, i) => {
                    const key = `${region}-${i}`;
                    const pickA = bracketA.picks[key];
                    const pickB = bracketB.picks[key];
                    const agree = pickA && pickB && pickA === pickB;
                    const disagree = pickA && pickB && pickA !== pickB;
                    const neitherPicked = !pickA && !pickB;
                    return (
                      <div key={key} style={{
                        display: "grid", gridTemplateColumns: "1fr 28px 1fr",
                        borderBottom: "1px solid #f0eeeb", padding: "0.6rem 1.25rem", alignItems: "center",
                        backgroundColor: neitherPicked ? "transparent" : agree ? "#f0fdf4" : "#fff8f8",
                      }}>
                        <div style={{ fontSize: "0.85rem", fontWeight: pickA ? "600" : "400", color: pickA ? "#08060d" : "#d4cfd9", textAlign: "left" }}>
                          {pickA || <span style={{ fontStyle: "italic", fontSize: "0.78rem", color: "#d4cfd9" }}>no pick</span>}
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          {agree    && <span style={{ width:"18px", height:"18px", backgroundColor:"#dcfce7", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.6rem", color:"#16a34a" }}>✓</span>}
                          {disagree && <span style={{ width:"18px", height:"18px", backgroundColor:"#fee2e2", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.6rem", color:"#c0392b" }}>✕</span>}
                          {neitherPicked && <span style={{ width:"18px", height:"18px", backgroundColor:"#f0eeeb", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.65rem", color:"#b0aab8" }}>–</span>}
                        </div>
                        <div style={{ fontSize: "0.85rem", fontWeight: pickB ? "600" : "400", color: pickB ? "#08060d" : "#d4cfd9", textAlign: "right" }}>
                          {pickB || <span style={{ fontStyle: "italic", fontSize: "0.78rem", color: "#d4cfd9" }}>no pick</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div style={{ padding: "0.85rem 1.25rem", display: "flex", gap: "1.5rem", fontSize: "0.78rem", color: "#9ca3af", borderTop: "1px solid #e8e6e1", flexWrap: "wrap" }}>
                <span style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                  <span style={{ width:"14px", height:"14px", backgroundColor:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:"3px", display:"inline-block" }} /> Agreement
                </span>
                <span style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                  <span style={{ width:"14px", height:"14px", backgroundColor:"#fff8f8", border:"1px solid #fecaca", borderRadius:"3px", display:"inline-block" }} /> Disagreement
                </span>
                <span style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                  <span style={{ width:"14px", height:"14px", backgroundColor:"#f8f7f4", border:"1px solid #e8e6e1", borderRadius:"3px", display:"inline-block" }} /> Neither picked
                </span>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Compare;
