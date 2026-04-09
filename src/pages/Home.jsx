import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/common/FeatureCard.jsx";

const MODES = [
  {
    icon: "🏆",
    title: "Team Success",
    description: "Compare teams using overall program strength, efficiency metrics, and recent season performance.",
    accent: "#c0392b",
  },
  {
    icon: "⭐",
    title: "Player Success",
    description: "Focus on star player impact, scoring ability, and roster availability before making a pick.",
    accent: "#e67e22",
  },
  {
    icon: "🎯",
    title: "Coach Success",
    description: "Evaluate coaching history, tournament performance, and matchup results to find hidden edges.",
    accent: "#27ae60",
  },
];

const STATS = [
  { value: "68", label: "Teams" },
  { value: "64", label: "Matchups" },
  { value: "3", label: "Eval Modes" },
  { value: "∞", label: "Brackets" },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid #e8e6e1",
          padding: "5rem 0 4rem",
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <Container>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontSize: "0.78rem",
              color: "#9ca3af",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            CS571 Web Project
          </p>
          <h1
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: "700",
              color: "#08060d",
              letterSpacing: "-2px",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Bracket<span style={{ color: "#c0392b" }}>Lab</span>
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              color: "#6b6375",
              maxWidth: "580px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            Build smarter March Madness brackets with matchup insights,
            adjustable evaluation modes, and side by side bracket comparison.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button
              onClick={() => navigate("/build")}
              style={{
                backgroundColor: "#08060d",
                border: "none",
                borderRadius: "8px",
                padding: "0.7rem 1.8rem",
                fontWeight: "600",
                fontSize: "1rem",
              }}
            >
              Build a Bracket
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => navigate("/matchups")}
              style={{
                borderRadius: "8px",
                padding: "0.7rem 1.8rem",
                fontWeight: "600",
                fontSize: "1rem",
                borderColor: "#d4cfd9",
                color: "#08060d",
              }}
            >
              View Matchups
            </Button>
          </div>
        </Container>
      </div>

      {/* Stats */}
      <div style={{ backgroundColor: "#08060d", padding: "1.5rem 0" }}>
        <Container>
          <Row className="justify-content-center text-center">
            {STATS.map((s) => (
              <Col key={s.label} xs={6} md={3} className="py-2">
                <div style={{ fontSize: "2rem", fontWeight: "700", color: "#ffffff", fontFamily: "'Georgia', serif" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {s.label}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Evaluation modes */}
      <div style={{ padding: "5rem 0", backgroundColor: "#f8f7f4" }}>
        <Container>
          <div className="text-center mb-5">
            <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.78rem", color: "#9ca3af", fontWeight: "600", marginBottom: "0.5rem" }}>
              Evaluation Modes
            </p>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "2rem", color: "#08060d", fontWeight: "700", letterSpacing: "-0.5px" }}>
              Pick your strategy
            </h2>
          </div>
          <Row className="g-4">
            {MODES.map((m) => (
              <Col key={m.title} md={4}>
                <FeatureCard {...m} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>


      {/* CTA */}
      <div style={{ backgroundColor: "#08060d", padding: "4rem 0", textAlign: "center" }}>
        <Container>
          <h2 style={{ fontFamily: "'Georgia', serif", color: "#ffffff", fontSize: "2rem", fontWeight: "700", marginBottom: "1rem" }}>
            Ready to beat your pool?
          </h2>
          <p style={{ color: "#9ca3af", marginBottom: "2rem", fontSize: "1rem" }}>
            Start filling in your bracket with data backed picks.
          </p>
          <Button
            onClick={() => navigate("/build")}
            style={{
              backgroundColor: "#c0392b",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 2rem",
              fontWeight: "700",
              fontSize: "1rem",
            }}
          >
            Build Your Bracket →
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default Home;
