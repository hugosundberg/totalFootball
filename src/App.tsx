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
  const [currentTeamSeasonStats, setCurrentTeamSeasonStats] = useState<TeamSeasonStats | undefined>(undefined);
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
  const [currentFixtureList, setCurrentFixtureList] = useState<Fixture[]>();
  const [currentFixture, setCurrentFixture] = useState<MatchFacts | undefined>(
    undefined
  );
  const [matchEvents, setMatchEvents] = useState<MatchEvent[]>();
  const [playerMatchStats, setPlayerMatchStats] = useState<PlayerMatchStats[]>();


  const [currentLeague, setCurrentLeague] = useState(39);
  const [headToHead, setHeadToHead] = useState<Fixture[] | undefined>();

  const [standing, setStanding] = useState();
  const navigate = useNavigate();

  const handleFetchMatch = useCallback(
    async (matchID: number) => {
      try {
        const fetchedMatch = await footballApi.fetchMatch(matchID);

        setCurrentFixture(fetchedMatch);

        if (fetchedMatch) {
          handleFetchHeadToHead(
            fetchedMatch.fixture.teams.home.id,
            fetchedMatch.fixture.teams.away.id
          );

          handleFetchPlayerMatchStats(matchID);

        }

        navigate(`/match/${matchID}`);
      } catch (error) {
        console.error("Error fetching player: ", error);
      }
    },
    [navigate]
  );

  const handleFetchPlayerMatchStats = async (matchID: number) => {
    try {
      const fetchedPlayerMatchStats = await footballApi.fetchPlayerMatchStatistics(matchID);
      
      setPlayerMatchStats(fetchedPlayerMatchStats?.allPlayers);

    } catch (error) {
      console.error("Error fetching player match stats: ", error);
      return [];
    }
  };

  const handleFetchMatchEvents = async (matchID: number) => {
    if (matchID) {
      try {
        const fetchedMatchEvents = await footballApi.fetchMatchEvents(matchID);

        setMatchEvents(fetchedMatchEvents);
      } catch (error) {
        console.error("Error fetching match events: ", error);
        return [];
      }
    }
    return [];
  }

  const handleFetchHeadToHead = async (
    teamOneID: number,
    teamTwoID: number
  ) => {
    try {
      const fetchedMatches = await footballApi.fetchHeadToHead(
        teamOneID,
        teamTwoID
      );

      setHeadToHead(fetchedMatches);
    } catch (error) {
      console.error("Error fetching head to head: ", error);
    }
  };

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

  const handleFetchStandings = async () => {
    try {
      const fetchedStandings = await footballApi.fetchStandings(currentLeague);
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
              handleMatchClick={handleFetchMatch}
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
              handleFetchMatch={handleFetchMatch}
              headToHead={headToHead}
              handleFetchTeam={handleFetchTeam}
              handleFetchMatchEvents={handleFetchMatchEvents}
              matchEvents={matchEvents}
              playerMatchStats={playerMatchStats}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
