import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import League from "./pages/League";
import footballApi from "./services";
import Team from "./pages/Team";
import Home from "./pages/Home";

export default function App() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    handleFetchTeams();
  }, []);

  const handleFetchTeams = async () => {
    try {
      const fetchedTeams = await footballApi.fetchTeams();
      setTeams(fetchedTeams || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  return (
    <>
      <Navigation />
      <Home />
    </>
  );
}
