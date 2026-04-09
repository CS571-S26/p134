import { Container, Row, Col, Alert } from "react-bootstrap";

function Compare() {
  return (
    <div style={{ backgroundColor: "#f8f7f4", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8e6e1", padding: "2.5rem 0" }}>
        <Container>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.78rem", color: "#9ca3af", fontWeight: "600", marginBottom: "0.4rem" }}>
            Analysis
          </p>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "2.2rem", fontWeight: "700", color: "#08060d", letterSpacing: "-0.5px", marginBottom: "0.5rem" }}>
            Compare Brackets
          </h1>
          <p style={{ color: "#6b6375", margin: 0 }}>
            Load two saved brackets and see where they agree or diverge.
          </p>
        </Container>
      </div>

      <Container className="py-4">
        <Alert variant="light" style={{ border: "1px dashed #d4cfd9", backgroundColor: "#fafafa", fontSize: "0.88rem", color: "#6b6375", marginBottom: "2rem" }}>
          🚧 <strong style={{ color: "#08060d" }}>Coming soon.</strong> This page will let you load two saved brackets and compare them side by ide — showing which picks agree, where they differ, and how Final Four and champion selections stack up.
        </Alert>

        <Row className="g-4 mb-4">
          {["Bracket A", "Bracket B"].map((label, i) => (
            <Col key={label} md={6}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: `2px dashed ${i === 0 ? "#d4cfd9" : "#d4cfd9"}`,
                  padding: "2rem",
                  textAlign: "center",
                  color: "#b0aab8",
                  minHeight: "160px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <div style={{ fontSize: "2rem" }}>📄</div>
                <div style={{ fontWeight: "600", color: "#9ca3af", fontSize: "0.95rem" }}>{label}</div>
                <div style={{ fontSize: "0.82rem" }}>No bracket loaded</div>
                <div
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.4rem 1rem",
                    border: "1px solid #e8e6e1",
                    borderRadius: "6px",
                    fontSize: "0.82rem",
                    color: "#9ca3af",
                    cursor: "not-allowed",
                    backgroundColor: "#f8f7f4",
                  }}
                >
                  Load Bracket (not yet available)
                </div>
              </div>
            </Col>
          ))}
        </Row>


        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e8e6e1", overflow: "hidden" }}>
          <div style={{ padding: "0.75rem 1.25rem", borderBottom: "1px solid #e8e6e1", display: "grid", gridTemplateColumns: "1fr 40px 1fr" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#9ca3af" }}>Bracket A</span>
            <span />
            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#9ca3af" }}>Bracket B</span>
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", borderBottom: "1px solid #f0eeeb", padding: "0.6rem 1.25rem", alignItems: "center" }}
            >
              <div style={{ height: "12px", backgroundColor: "#f0eeeb", borderRadius: "4px", width: `${60 + (i * 7) % 30}%` }} />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "16px", height: "16px", backgroundColor: "#f0eeeb", borderRadius: "50%" }} />
              </div>
              <div style={{ height: "12px", backgroundColor: "#f0eeeb", borderRadius: "4px", width: `${50 + (i * 11) % 35}%` }} />
            </div>
          ))}
          <div style={{ padding: "1.5rem", textAlign: "center", color: "#b0aab8", fontSize: "0.85rem" }}>
            Comparison will appear here once both brackets are loaded.
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Compare;
