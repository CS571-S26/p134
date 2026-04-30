import { Card, Button } from "react-bootstrap";

function NewsCard({ source, title, description, href, tag }) {
  return (
    <Card
      className="h-100 border-0"
      style={{
        borderRadius: "12px",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
      }}
    >
      <Card.Body className="p-4 d-flex flex-column">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "0.75rem",
            alignItems: "center",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              fontSize: "0.76rem",
              color: "#5c5566",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: "700",
            }}
          >
            {source}
          </span>

          {tag && (
            <span
              style={{
                fontSize: "0.72rem",
                backgroundColor: "#f8d7d4",
                color: "#8a1f15",
                borderRadius: "20px",
                padding: "0.2rem 0.55rem",
                fontWeight: "700",
              }}
            >
              {tag}
            </span>
          )}
        </div>

        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "1.15rem",
            fontWeight: "700",
            color: "#08060d",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: "#4f4759",
            fontSize: "0.92rem",
            lineHeight: "1.6",
            flex: 1,
          }}
        >
          {description}
        </p>

        <Button
          as="a"
          href={href}
          target="_blank"
          rel="noreferrer"
          variant="outline-dark"
          style={{
            borderRadius: "8px",
            fontWeight: "700",
            alignSelf: "flex-start",
          }}
          aria-label={`Open ${title} from ${source} in a new tab`}
        >
          Open source
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NewsCard;