import { useCallback, useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import footballApi from "./services";
import Team from "./pages/Team";
import Home from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./pages/About";
import Player from "./pages/Player";
import Match from "./pages/Match";

export default function App() {
  const [currentTeam, setCurrentTeam] = useState<Team | undefined>(undefined);
  const [currentTeamSeasonStats, setCurrentTeamSeasonStats] = useState();
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(
    undefined
  );
  const [currentPlayerTeam, setCurrentPlayerTeam] =
    useState<PlayerCurrentTeam | null>();
  const [currentSquad, setCurrentSquad] = useState<SquadPlayer[] | undefined>(
    undefined
  );
  const [playerCurrentStats, setPlayerCurrentStats] = useState<
    PlayerCurrentStats | undefined
  >(undefined);
  const [currentFixtureList, setCurrentFixtureList] = useState<
    Fixture[] | undefined
  >();
  const [currentFixture, setCurrentFixture] = useState<MatchFacts | undefined>(
    undefined
  );
  const [currentLeague, setCurrentLeague] = useState(39);
  const [headToHead, setHeadToHead] = useState();

  const [standing, setStanding] = useState();
  const navigate = useNavigate();

  const handleMatchClick = useCallback(
    async (matchID: number) => {
      try {
        const fetchedMatch = await footballApi.fetchMatch(matchID);

        setCurrentFixture(fetchedMatch);

        navigate(`/match/${matchID}`);
      } catch (error) {
        console.error("Error fetching player: ", error);
      }
    },
    [navigate]
  );

  const handleFetchPlayer = useCallback(
    async (playerID: number) => {
      try {
        const fetchedPlayer = await footballApi.fetchPlayer(playerID);
        const fetchedPlayerTeam =
          await footballApi.fetchPlayerCurrentTeam(playerID);
        setCurrentPlayer(fetchedPlayer?.formattedPlayer);
        setPlayerCurrentStats(fetchedPlayer?.formattedPlayerStats);
        setCurrentPlayerTeam(fetchedPlayerTeam);
        navigate(`/player/${playerID}`);
      } catch (error) {
        console.error("Error fetching player: ", error);
      }
    },
    [navigate]
  );

  const handleFetchTeam = useCallback(
    async (teamID: number) => {
      try {
        const fetchedTeam = await footballApi.fetchTeam(teamID);
        setCurrentTeam(fetchedTeam);

        const fetchedFixtureList = await footballApi.fetchTeamFixtures(teamID);
        setCurrentFixtureList(fetchedFixtureList);

        const fetchedTeamStats = await footballApi.fetchTeamSeasonStats(teamID);
        setCurrentTeamSeasonStats(fetchedTeamStats);

        const fetchedSquad = await footballApi.fetchSquad(teamID);
        setCurrentSquad(fetchedSquad);
      } catch (error) {
        console.error("Error fetching team: ", error);
      }
    },
    [navigate]
  );

  const handleFetchHeadToHead = async (teamID: number, opponentID: number) => {
    async (teamID: number, opponentID: number) => {
      try {
        const fetchedHeadToHead = await footballApi.fetchHeadToHead(
          teamID,
          opponentID
        );

        setHeadToHead(fetchedHeadToHead);
      } catch (error) {
        console.error("Error fetching head to head: ", error);
      }
    };

    const handleFetchStandings = async () => {
      try {
        const fetchedStandings =
          await footballApi.fetchStandings(currentLeague);
        setStanding(fetchedStandings || []);
      } catch (error) {
        console.error("Error fetching table:", error);
      }
    };

    useEffect(() => {
      handleFetchStandings();
    }, [currentLeague]);

    return (
      <>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                standing={standing}
                handleFetchTeam={handleFetchTeam}
                setCurrentLeague={setCurrentLeague}
              />
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
                fixtures={currentFixtureList}
                handleMatchClick={handleMatchClick}
                seasonStats={currentTeamSeasonStats}
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
                currentStats={playerCurrentStats}
              />
            }
          />
          <Route
            path="/match/:id"
            element={
              <Match
                fixture={currentFixture}
                handleFetchMatch={handleMatchClick}
                handleFetchHeadToHead={handleFetchHeadToHead}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </>
    );
  };
}
