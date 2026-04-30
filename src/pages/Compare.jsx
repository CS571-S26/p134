import { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllGames, getChampion, loadSaved } from "../utils/bracketUtils.js";

function BracketSlot({ label, bracket, onSelect, slotColor }) {
  const [showModal, setShowModal] = useState(false);
  const [brackets, setBrackets]   = useState([]);

  const open = () => {
    setBrackets(loadSaved());
    setShowModal(true);
  };

  return (
    <>
      <section aria-labelledby={`${label.replace(" ", "-").toLowerCase()}-heading`} style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: `2px solid ${bracket ? slotColor + "55" : "#d9d4dc"}`, padding: "1.25rem" }}>
        <h2 id={`${label.replace(" ", "-").toLowerCase()}-heading`} style={{ fontSize: "0.9rem", fontWeight: "700", color: slotColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
          {label}
        </h2>
        {bracket ? (
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: "700", fontSize: "1rem", color: "#08060d", marginBottom: "0.3rem" }}>{bracket.name}</div>
            <div style={{ fontSize: "0.8rem", color: "#5c5566", marginBottom: "0.35rem" }}>
              {bracket.totalPicks || Object.keys(bracket.picks || {}).length}/{bracket.totalMatchups || 63} picks · {bracket.mode || "team"} mode · saved {bracket.savedAt}
            </div>
            <div style={{ fontSize: "0.8rem", color: "#5c5566", marginBottom: "0.75rem" }}>
              Champion: {getChampion(bracket.picks || {}) || "not picked"}
            </div>
            <Button size="sm" variant="outline-secondary" onClick={open} style={{ borderRadius: "6px", fontSize: "0.8rem", borderColor: "#d9d4dc", fontWeight: "700" }}>
              Change
            </Button>
          </div>
        ) : (
          <button type="button" onClick={open} style={{
            width: "100%", padding: "1.75rem 1rem", border: `2px dashed ${slotColor}66`, borderRadius: "8px",
            textAlign: "center", color: "#4f4759", fontSize: "0.88rem", cursor: "pointer",
            backgroundColor: "#fafafa", transition: "background 0.15s",
          }}>
            <span aria-hidden="true" style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.4rem" }}>📄</span>
            Click to load a saved bracket
          </button>
        )}
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={{ borderBottom: "1px solid #d9d4dc" }}>
          <Modal.Title style={{ fontFamily: "'Georgia', serif", fontSize: "1.1rem", fontWeight: "700" }}>
            Choose Bracket for {label}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "1.25rem" }}>
          {brackets.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#5c5566" }}>
              <div aria-hidden="true" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</div>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>No saved brackets yet. Go to Build Bracket to create one.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {brackets.map((b) => (
                <button key={b.id} type="button" onClick={() => { onSelect(b); setShowModal(false); }} style={{
                  border: "1px solid #d9d4dc", borderRadius: "10px", padding: "0.85rem 1rem",
                  cursor: "pointer", textAlign: "left", backgroundColor: "#ffffff",
                }}>
                  <span style={{ display: "block", fontWeight: "700", fontSize: "0.95rem", color: "#08060d" }}>{b.name}</span>
                  <span style={{ display: "block", fontSize: "0.78rem", color: "#5c5566", marginTop: "0.15rem" }}>
                    {b.totalPicks || Object.keys(b.picks || {}).length}/{b.totalMatchups || 63} picks · {b.mode || "team"} mode · {b.savedAt}
                  </span>
                  <span style={{ display: "block", fontSize: "0.78rem", color: "#5c5566", marginTop: "0.15rem" }}>
                    Champion: {getChampion(b.picks || {}) || "not picked"}
                  </span>
                </button>
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
  const navigate = useNavigate();

  const games = getAllGames({ ...(bracketA?.picks || {}), ...(bracketB?.picks || {}) });
  const totalBothPicked = bracketA && bracketB
    ? games.filter((g) => bracketA.picks?.[g.key] && bracketB.picks?.[g.key]).length : 0;
  const agreements = bracketA && bracketB
    ? games.filter((g) => bracketA.picks?.[g.key] && bracketA.picks?.[g.key] === bracketB.picks?.[g.key]).length : 0;
  const disagreements = bracketA && bracketB
    ? games.filter((g) => bracketA.picks?.[g.key] && bracketB.picks?.[g.key] && bracketA.picks[g.key] !== bracketB.picks[g.key]).length : 0;
  const agreementPct = totalBothPicked > 0 ? Math.round((agreements / totalBothPicked) * 100) : 0;
  const ready = bracketA && bracketB;

  return (
    <div style={{ backgroundColor: "#f8f7f4", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8e6e1", padding: "2.5rem 0" }}>
        <Container>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.78rem", color: "#5c5566", fontWeight: "700", marginBottom: "0.4rem" }}>
            Analysis
          </p>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "2.2rem", fontWeight: "700", color: "#08060d", letterSpacing: "-0.5px", marginBottom: "0.4rem", textAlign: "left" }}>
            Compare Brackets
          </h1>
          <p style={{ color: "#4f4759", margin: 0, textAlign: "left" }}>
            Load two saved brackets to compare every pick from the Round of 64 through the championship.
          </p>
        </Container>
      </div>

      <Container className="py-4">
        <Row className="g-4 mb-4">
          <Col md={6}>
            <BracketSlot label="Bracket A" bracket={bracketA} onSelect={setBracketA} slotColor="#a92f24" />
          </Col>
          <Col md={6}>
            <BracketSlot label="Bracket B" bracket={bracketB} onSelect={setBracketB} slotColor="#1f6694" />
          </Col>
        </Row>

        {ready && (
          <Row className="g-3 mb-4">
            {[
              { label: "Games Both Picked", value: totalBothPicked, color: "#08060d" },
              { label: "Agreements",        value: agreements,      color: "#176c3a" },
              { label: "Disagreements",     value: disagreements,   color: "#a92f24" },
              { label: "Agreement Rate",    value: `${agreementPct}%`, color: "#1f6694" },
            ].map(({ label, value, color }) => (
              <Col key={label} xs={6} md={3}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", border: "1px solid #d9d4dc", padding: "1rem 1.25rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Georgia', serif", fontSize: "2rem", fontWeight: "700", color }}>{value}</div>
                  <div style={{ fontSize: "0.75rem", color: "#5c5566", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.25rem", fontWeight: "700" }}>{label}</div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        <section aria-labelledby="pick-comparison-heading" style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d9d4dc", overflow: "hidden" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 36px 1fr",
            padding: "0.75rem 1.25rem", borderBottom: "1px solid #d9d4dc",
            fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            <span style={{ color: "#a92f24" }}>{bracketA ? bracketA.name : "Bracket A"}</span>
            <span id="pick-comparison-heading" style={{ textAlign: "center", color: "#5c5566" }}>vs</span>
            <span style={{ color: "#1f6694", textAlign: "right" }}>{bracketB ? bracketB.name : "Bracket B"}</span>
          </div>

          {!ready ? (
            <div style={{ textAlign: "center", padding: "3.5rem 1rem", color: "#5c5566" }}>
              <div aria-hidden="true" style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>⚖️</div>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>Load two brackets above to see a pick-by-pick comparison.</p>
              <Button variant="link" onClick={() => navigate("/build")} style={{ color: "#8a1f15", textDecoration: "none", fontWeight: "700", marginTop: "0.4rem" }}>
                Build and save one first
              </Button>
            </div>
          ) : (
            <>
              {games.map((game) => {
                const pickA = bracketA.picks?.[game.key];
                const pickB = bracketB.picks?.[game.key];
                const agree = pickA && pickB && pickA === pickB;
                const disagree = pickA && pickB && pickA !== pickB;
                const neitherPicked = !pickA && !pickB;
                return (
                  <div key={game.key} style={{
                    display: "grid", gridTemplateColumns: "1fr 36px 1fr",
                    borderBottom: "1px solid #eee9f0", padding: "0.6rem 1.25rem", alignItems: "center",
                    backgroundColor: neitherPicked ? "transparent" : agree ? "#e9f7ef" : "#fff1f0",
                  }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: pickA ? "700" : "400", color: pickA ? "#08060d" : "#6f6878", textAlign: "left" }}>
                      {pickA || <span style={{ fontStyle: "italic", fontSize: "0.78rem", color: "#6f6878" }}>no pick</span>}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {agree && <span aria-label="same pick" style={{ width:"22px", height:"22px", backgroundColor:"#d6f3df", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.7rem", color:"#176c3a", fontWeight:"700" }}>✓</span>}
                      {disagree && <span aria-label="different pick" style={{ width:"22px", height:"22px", backgroundColor:"#f8d7d4", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.7rem", color:"#8a1f15", fontWeight:"700" }}>✕</span>}
                      {neitherPicked && <span aria-label="neither picked" style={{ width:"22px", height:"22px", backgroundColor:"#eee9f0", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.7rem", color:"#4f4759" }}>–</span>}
                    </div>
                    <div style={{ fontSize: "0.85rem", fontWeight: pickB ? "700" : "400", color: pickB ? "#08060d" : "#6f6878", textAlign: "right" }}>
                      {pickB || <span style={{ fontStyle: "italic", fontSize: "0.78rem", color: "#6f6878" }}>no pick</span>}
                    </div>
                    <div style={{ gridColumn: "1 / 4", marginTop: "0.2rem", fontSize: "0.72rem", color: "#5c5566", textAlign: "center" }}>
                      {game.region} · {game.roundLabel} · {game.label}
                    </div>
                  </div>
                );
              })}
              <div style={{ padding: "0.85rem 1.25rem", display: "flex", gap: "1.5rem", fontSize: "0.78rem", color: "#5c5566", justifyContent: "center", flexWrap: "wrap" }}>
                <span><strong style={{ color: "#176c3a" }}>✓</strong> same pick</span>
                <span><strong style={{ color: "#8a1f15" }}>✕</strong> different pick</span>
                <span><strong>–</strong> neither picked</span>
              </div>
            </>
          )}
        </section>
      </Container>
    </div>
  );
}

export default Compare;
