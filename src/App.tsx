import { useCallback, useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import footballApi from "./services";
import Team from "./pages/Team";
import Home from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./pages/About";
import Player from "./pages/Player";

export default function App() {
  const [currentTeam, setCurrentTeam] = useState<Team | undefined>(undefined);
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(
    undefined
  );
  const [currentPlayerTeam, setCurrentPlayerTeam] =
    useState<PlayerCurrentTeam>();
  const [currentSquad, setCurrentSquad] = useState<SquadPlayer[] | undefined>(
    undefined
  );
  const [standing, setStanding] = useState();
  const navigate = useNavigate();

  const handleFetchPlayer = useCallback(
    async (playerID: number) => {
      try {
        const fetchedPlayer = await footballApi.fetchPlayer(playerID);
        const fetchedPlayerTeam = await footballApi.fetchPlayerCurrentTeam(
          playerID
        );
        setCurrentPlayer(fetchedPlayer);
        setCurrentPlayerTeam(fetchedPlayerTeam);
        navigate(`/player/${playerID}`);
      } catch (error) {
        console.error("Error fetching player: ", error);
      }
    },
    [navigate]
  );

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
              handleFetchPlayer={handleFetchPlayer}
            />
          }
        />
        <Route
          path="/player/:id"
          element={
            <Player
              player={currentPlayer}
              handleFetchPlayer={handleFetchPlayer}
              currentTeam={currentPlayerTeam}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
