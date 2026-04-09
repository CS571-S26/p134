import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Home from "../../pages/Home.jsx";
import Matchups from "../../pages/Matchups.jsx";
import BuildBracket from "../../pages/BuildBracket.jsx";
import Compare from "../../pages/Compare.jsx";

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f7f4" }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matchups" element={<Matchups />} />
        <Route path="/build" element={<BuildBracket />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </div>
  );
}

export default App;
