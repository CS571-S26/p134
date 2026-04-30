import { Container, Row, Col, Alert } from "react-bootstrap";
import NewsCard from "../components/news/NewsCard.jsx";

const NEWS_LINKS = [
  {
    source: "ESPN",
    title: "Men's College Basketball News",
    description: "Live scores, video highlights, game analysis, rankings, and college basketball headlines from ESPN.",
    href: "https://www.espn.com/mens-college-basketball/",
    tag: "News",
  },
  {
    source: "NCAA.com",
    title: "Official Men's Basketball Hub",
    description: "Official NCAA men's basketball scores, news, rankings, highlights, and tournament information.",
    href: "https://www.ncaa.com/sports/basketball-men/d1",
    tag: "Official",
  },
  {
    source: "NCAA",
    title: "Official March Madness Page",
    description: "Tournament information, archived stories, championship details, and March Madness resources from the NCAA.",
    href: "https://www.ncaa.org/sports/march-madness",
    tag: "Tournament",
  },
  {
    source: "NCAA Bracket",
    title: "Live NCAA Bracket",
    description: "Official March Madness bracket page with game paths, scores, and tournament bracket context.",
    href: "https://www.ncaa.com/march-madness-live/bracket",
    tag: "Bracket",
  },
];

function News() {
  return (
    <div style={{ backgroundColor: "#f8f7f4", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8e6e1", padding: "2.5rem 0" }}>
        <Container>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.78rem", color: "#5c5566", fontWeight: "700", marginBottom: "0.4rem" }}>
            Research
          </p>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "2.2rem", fontWeight: "700", color: "#08060d", letterSpacing: "-0.5px", marginBottom: "0.4rem", textAlign: "left" }}>
            NCAA Basketball News
          </h1>
          <p style={{ color: "#4f4759", margin: 0, textAlign: "left", maxWidth: "720px" }}>
            Use these links to check current college basketball news before making bracket picks. Each source opens in a new tab.
          </p>
        </Container>
      </div>

      <Container className="py-4">
        <Alert variant="light" style={{ border: "1px dashed #b8afc0", backgroundColor: "#fafafa", fontSize: "0.88rem", color: "#4f4759" }}>
          This page does not scrape articles or store outside content. It gives you quick access to current NCAA basketball sources for injuries, rankings, scores, and tournament news.
        </Alert>

        <Row className="g-4">
          {NEWS_LINKS.map((item) => (
            <Col key={item.title} md={6} lg={3}>
              <NewsCard {...item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default News;
