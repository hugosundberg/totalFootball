import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Match = ({ fixture, handleFetchMatch }: MatchProps) => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      handleFetchMatch(Number(id));
    }
  }, [id, handleFetchMatch]);

  if (!fixture) return;

  return (
    <div className="bg-black h-screen pt-16 text-white">
      <div className="bg-zinc-900 h-fit mt-6">
        <div className="flex gap-2 justify-center p-5">
          <img src={fixture.league.logo} alt="league-logo" className="h-6" />
          <p className="">{fixture.league.name}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 justify-self-center p-10 items-center">
          <div className="flex items-center gap-4">
            <p className="text-xl">{fixture.fixture.teams.home.name}</p>
            <img
              src={fixture.fixture.teams.home.logo}
              alt="home-team-logo"
              className="h-10"
            />
          </div>
          <div>
            <p className="text-3xl text-center">
              {fixture.goals.home} - {fixture.goals.away}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={fixture.fixture.teams.away.logo}
              alt="away-team-logo"
              className="h-10"
            />
            <p className="text-xl">{fixture.fixture.teams.away.name}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-zinc-900 h-fit mt-4 rounded-2xl items-center">
        <h2 className="text-2xl mb-4">Statistics</h2>
        <div className="flex flex-col items-center w-1/2 gap-8">
          <div className="flex justify-between w-full">
            <p className="">{fixture?.statistics.home.possesion}</p>
            <p>Possesion</p>
            {fixture?.statistics.away.possesion}
          </div>

          <div className="flex justify-between w-full">
            {fixture?.statistics.home.expectedGoals}
            <p>Expected goals</p>
            {fixture?.statistics.away.expectedGoals}
          </div>

          <div className="flex justify-between w-full">
            {fixture?.statistics.home.shotsTotal}
            <p>Total Shots</p>
            {fixture?.statistics.away.shotsTotal}
          </div>

          <div className="flex justify-between w-full">
            {fixture?.statistics.home.shotsOn}
            <p>Shots on target</p>
            {fixture?.statistics.away.shotsOn}
          </div>

          <div className="flex justify-between w-full">
            {fixture?.statistics.home.passesAccurate} /{" "}
            {fixture?.statistics.home.passesTotal}
            <p>Accurate passes</p>
            {fixture?.statistics.away.passesAccurate} /{" "}
            {fixture?.statistics.away.passesTotal}
          </div>

          <div className="flex justify-between w-full">
            {fixture?.statistics.home.fouls}
            <p>Fouls committed</p>
            {fixture?.statistics.away.fouls}
          </div>

          <div className="flex justify-between w-full">
            {fixture?.statistics.home.yellowCards}
            <p>Yellow cards</p>
            {fixture?.statistics.away.yellowCards}
          </div>

          <div className="flex justify-between w-full">
            {fixture?.statistics.home.redCards === null && 0}
            <p>Red cards</p>
            {fixture?.statistics.away.redCards === null && 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;
