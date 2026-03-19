import { Container, Row, Col, Card, Button } from "react-bootstrap";

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Container className="py-5">
        <section className="text-center mb-5">
          <p className="text-uppercase text-muted mb-2">
            CS571 Web Project
          </p>
          <h1 className="display-3 fw-bold">Bracket Lab</h1>
          <p className="lead mx-auto" style={{ maxWidth: "700px" }}>
            Build smarter March Madness brackets with matchup insights,
            adjustable evaluation modes, and side by side bracket comparison.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <Button variant="dark" size="lg">Build a Bracket</Button>
            <Button variant="outline-dark" size="lg">View Matchups</Button>
          </div>
        </section>

        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title>Team Success</Card.Title>
                <Card.Text>
                  Compare teams using overall program strength, efficiency
                  metrics, and recent season performance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title>Player Success</Card.Title>
                <Card.Text>
                  Focus on star player impact, scoring ability, and roster
                  availability before making a pick.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title>Coach Success</Card.Title>
                <Card.Text>
                  Evaluate coaching history, tournament performance, and
                  matchup results to find hidden edges.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <h2 className="mb-3">Why Bracket Lab?</h2>
            <p className="mb-0">
              Research matchups, track upset risk, and save custom brackets all
              in one place.
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default App;
