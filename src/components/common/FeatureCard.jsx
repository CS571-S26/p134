import { Card } from "react-bootstrap";

function FeatureCard({ icon, title, description, accent = "#c0392b" }) {
  return (
    <Card
      className="h-100 border-0"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)";
      }}
    >
      <Card.Body className="p-4">
        {icon && (
          <div
            style={{
              width: "42px",
              height: "42px",
              backgroundColor: `${accent}15`,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
              fontSize: "1.2rem",
            }}
          >
            {icon}
          </div>
        )}
        <Card.Title
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "1.05rem",
            fontWeight: "700",
            color: "#08060d",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </Card.Title>
        <Card.Text style={{ color: "#6b6375", fontSize: "0.92rem", lineHeight: "1.6" }}>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default FeatureCard;
