import { useCallback, useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import footballApi from "./services";
import Team from "./pages/Team";
import Home from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./pages/About";

export default function App() {
  const [currentTeam, setCurrentTeam] = useState<Team | undefined>(undefined);
  const [currentSquad, setCurrentSquad] = useState<Player[] | undefined>(
    undefined
  );
  const [standing, setStanding] = useState();
  const navigate = useNavigate();

  const handleFetchTeam = useCallback(
    async (id: number) => {
      try {
        const fetchedTeam = await footballApi.fetchTeam(id);
        setCurrentTeam(fetchedTeam);

        const fetchedSquad = await footballApi.fetchSquad(id);
        setCurrentSquad(fetchedSquad);
      } catch (error) {
        console.error("Error fetching team: ", error);
      }
    },
    [navigate]
  );

  const handleFetchStandings = async () => {
    try {
      const fetchedStandings = await footballApi.fetchStandings();
      setStanding(fetchedStandings || []);
    } catch (error) {
      console.error("Error fetching table:", error);
    }
  };

  useEffect(() => {
    handleFetchStandings();
  }, []);

  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <Home standing={standing} handleFetchTeam={handleFetchTeam} />
          }
        />
        <Route
          path="/team/:id/*"
          element={
            <Team
              team={currentTeam}
              standing={standing}
              handleFetchTeam={handleFetchTeam}
              squad={currentSquad}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
