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

  console.log(fixture.fixtureInfo.status.short);

  return (
    <div className="bg-black h-screen pt-16 text-white">
      <div className="bg-zinc-900 h-fit mt-6">
        <div className="flex gap-4 justify-center p-5 items-center">
          <img
            src={fixture.league.logo}
            alt="league-logo"
            className="h-8 bg-white p-1 rounded-full"
          />
          <p>
            {fixture.league.name} {fixture.league.round}
          </p>
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
        <div className="h-10 justify-self-center">
          {fixture.fixtureInfo.status.short === "HT" ? (
            <p>Half Time</p>
          ) : fixture.fixtureInfo.status.short === "FT" ? (
            <p>Full Time</p>
          ) : fixture.fixtureInfo.status.short === "1H" ? (
            <p>{fixture.fixtureInfo.status.elapsed}</p>
          ) : fixture.fixtureInfo.status.short === "2H" ? (
            <p>{fixture.fixtureInfo.status.elapsed}</p>
          ) : fixture.fixtureInfo.status.extra !== null ? (
            <p>
              {fixture.fixtureInfo.status.elapsed +
                " + " +
                fixture.fixtureInfo.status.extra}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col bg-zinc-900 h-fit mt-4 rounded-2xl items-center py-10">
        <h2 className="text-2xl mb-4">Statistics</h2>
        <div className="flex flex-col items-center w-1/2 gap-8">
          <p>Ball possesion</p>
          <div className="flex justify-between w-full bg-gray-500 h-10 rounded-full">
            <div
              className="bg-slate-700 h-full rounded-l-full border-r-2"
              style={{ width: `${fixture.statistics.home.possesion}` }}
            >
              <p className="p-2 px-4">{fixture.statistics.home.possesion}</p>
            </div>
            <p className="p-2 px-4">{fixture.statistics.away.possesion}</p>
          </div>

          <div className="flex justify-between w-full">
            {fixture.statistics.home.expectedGoals}
            <p>Expected goals</p>
            {fixture.statistics.away.expectedGoals}
          </div>

          <div className="flex justify-between w-full">
            {fixture.statistics.home.shotsTotal}
            <p>Total Shots</p>
            {fixture.statistics.away.shotsTotal}
          </div>

          <div className="flex justify-between w-full">
            {fixture.statistics.home.shotsOn}
            <p>Shots on target</p>
            {fixture.statistics.away.shotsOn}
          </div>

          <div className="flex justify-between w-full">
            {fixture.statistics.home.passesAccurate} /{" "}
            {fixture.statistics.home.passesTotal}
            <p>Accurate passes</p>
            {fixture.statistics.away.passesAccurate} /{" "}
            {fixture.statistics.away.passesTotal}
          </div>

          <div className="flex justify-between w-full">
            {fixture.statistics.home.fouls}
            <p>Fouls committed</p>
            {fixture.statistics.away.fouls}
          </div>

          <div className="flex justify-between w-full">
            {fixture.statistics.home.yellowCards}
            <p>Yellow cards</p>
            {fixture.statistics.away.yellowCards}
          </div>

          <div className="flex justify-between w-full">
            {fixture.statistics.home.redCards === null && 0}
            <p>Red cards</p>
            {fixture.statistics.away.redCards === null && 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;
