import { Row, Col } from "react-bootstrap";
import BracketMatchup from "./BracketMatchup.jsx";

function BracketRound({ title, subtitle, games, picks, onPick }) {
  return (
    <section aria-labelledby={`round-${title.replaceAll(" ", "-").toLowerCase()}`}>
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <h2 id={`round-${title.replaceAll(" ", "-").toLowerCase()}`} style={{ fontFamily: "'Georgia', serif", fontSize: "1.2rem", fontWeight: "700", color: "#08060d", margin: 0 }}>
            {title}
          </h2>
          {subtitle && <p style={{ color: "#5c5566", margin: "0.2rem 0 0", fontSize: "0.86rem" }}>{subtitle}</p>}
        </div>
        <span style={{ fontSize: "0.8rem", color: "#5c5566" }}>Click a team to advance it</span>
      </div>

      <Row className="g-3">
        {games.map((game, i) => (
          <Col key={game.key} xs={12} sm={6} lg={games.length <= 2 ? 6 : 4}>
            <div style={{ fontSize: "0.72rem", color: "#6f6878", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "700" }}>
              {game.label || `Game ${i + 1}`}
            </div>
            <BracketMatchup game={game} pickedTeam={picks[game.key]} onPick={(team) => onPick(game, team)} />
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default BracketRound;
