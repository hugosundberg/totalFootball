import { useState } from "react";
import Navigation from "./Navigation";
import Home from "./pages/Home";
import League from "./pages/League";
import footballApi from "./services";

export default function App() {
  const [teams, setTeams] = useState([]);

  const handleFetchTeams = () => {
    footballApi.fetchTeams();
  };

  return (
    <>
      <Navigation />
      <button className="h-40" onClick={handleFetchTeams}>
        TEAMS
      </button>
      <League />
    </>
  );
}
