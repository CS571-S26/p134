import { Modal, Button } from "react-bootstrap";
import { getChampion } from "../../utils/bracketUtils.js";

function SavedBracketModal({ show, onHide, savedBrackets, onLoad, onDelete }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ borderBottom: "1px solid #d9d4dc" }}>
        <Modal.Title style={{ fontFamily: "'Georgia', serif", fontSize: "1.2rem", fontWeight: "700" }}>Saved Brackets</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1.25rem" }}>
        {savedBrackets.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "#5c5566" }}>
            <div aria-hidden="true" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</div>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>No saved brackets yet. Fill out picks and hit Save.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {savedBrackets.map((bracket) => (
              <div key={bracket.id} style={{ border: "1px solid #d9d4dc", borderRadius: "10px", padding: "0.9rem 1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", alignItems: "center" }}>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#08060d" }}>{bracket.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "#5c5566", marginTop: "0.15rem" }}>
                      {bracket.totalPicks || Object.keys(bracket.picks || {}).length}/{bracket.totalMatchups || 63} picks · {bracket.mode || "team"} mode · {bracket.savedAt}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#5c5566", marginTop: "0.15rem" }}>
                      Champion: {getChampion(bracket.picks || {}) || "not picked"}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                    <Button size="sm" onClick={() => onLoad(bracket)} style={{ backgroundColor: "#08060d", border: "none", borderRadius: "6px" }}>Load</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => onDelete(bracket.id)} style={{ borderRadius: "6px" }}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default SavedBracketModal;
