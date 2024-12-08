import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import footballApi from "./services";
import Team from "./pages/Team";
import Home from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./pages/About";

export default function App() {
  const [currentTeam, setCurrentTeam] = useState<Team | undefined>(undefined);
  const [standing, setStanding] = useState();
  const navigate = useNavigate();

  const handleFetchTeam = async (id: number) => {
    try {
      const fetchedTeam = await footballApi.fetchTeam(id);
      setCurrentTeam(fetchedTeam);

      navigate(`/team/${id}`);
    } catch (error) {
      console.error("Error fetching team: ", error);
    }
  };

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
      <button onClick={() => handleFetchTeam(40)}>CLICK ME</button>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <Home standing={standing} handleFetchTeam={handleFetchTeam} />
          }
        />
        <Route
          path="/team/:id"
          element={
            <Team team={currentTeam} handleFetchTeam={handleFetchTeam} />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
