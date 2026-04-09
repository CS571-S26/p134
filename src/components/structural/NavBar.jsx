import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <Navbar
      expand="md"
      expanded={expanded}
      onToggle={setExpanded}
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e8e6e1",
        padding: "0.75rem 0",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          style={{
            fontFamily: "'Georgia', serif",
            fontWeight: "700",
            fontSize: "1.4rem",
            color: "#08060d",
            letterSpacing: "-0.5px",
          }}
        >
          Bracket<span style={{ color: "#c0392b" }}>Lab</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-nav"
          onClick={() => setExpanded(!expanded)}
          style={{ border: "none", boxShadow: "none" }}
        />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-md-center gap-1" onClick={() => setExpanded(false)}>
            <Nav.Link
              as={NavLink}
              to="/"
              end
              style={({ isActive }) => ({
                color: isActive ? "#08060d" : "#6b6375",
                fontWeight: isActive ? "600" : "400",
                fontSize: "0.95rem",
                padding: "0.4rem 0.75rem",
              })}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/matchups"
              style={({ isActive }) => ({
                color: isActive ? "#08060d" : "#6b6375",
                fontWeight: isActive ? "600" : "400",
                fontSize: "0.95rem",
                padding: "0.4rem 0.75rem",
              })}
            >
              Matchups
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/compare"
              style={({ isActive }) => ({
                color: isActive ? "#08060d" : "#6b6375",
                fontWeight: isActive ? "600" : "400",
                fontSize: "0.95rem",
                padding: "0.4rem 0.75rem",
              })}
            >
              Compare
            </Nav.Link>
            <Button
              variant="dark"
              size="sm"
              onClick={() => { navigate("/build"); setExpanded(false); }}
              style={{
                backgroundColor: "#08060d",
                border: "none",
                borderRadius: "6px",
                padding: "0.45rem 1.1rem",
                fontWeight: "600",
                fontSize: "0.9rem",
                marginLeft: "0.5rem",
              }}
            >
              Build Bracket
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
