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

  const dateFormatter = (date: string) => {
    try {
      const extractedDate = date.slice(0, 10);

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(extractedDate));

      return formattedDate;
    } catch (error) {
      console.error("Invalid date format:", error);
      return null;
    }
  };

  const timeFormatter = (date: string) => {
    try {
      const extractedTime = date.slice(11, 16);

      const [hour, minute] = extractedTime.split(":");
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(new Date().setHours(Number(hour), Number(minute)));

      return formattedTime;
    } catch (error) {
      console.error("Invalid date format:", error);
      return null;
    }
  };

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

        <div>
          <span className="block h-0.5 bg-zinc-800 w-full" />
          <div className="flex gap-8 p-2 text-zinc-400 text-sm justify-center">
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              {dateFormatter(fixture.fixtureInfo.date) + ", "}
              {timeFormatter(fixture.fixtureInfo.date)}
            </div>
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              {fixture.fixtureInfo.venue}
            </div>
            <div className="flex gap-2 items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
                />
              </svg>

              {fixture.fixtureInfo.referee}
            </div>
          </div>
          <span className="block h-0.5 bg-zinc-800 w-full" />
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

          <div className="flex justify-between items-center w-full">
            {fixture.statistics.home.expectedGoals >
            fixture.statistics.away.expectedGoals ? (
              <>
                <div className="bg-slate-700 p-2 rounded-full px-4">
                  {fixture.statistics.home.expectedGoals}
                </div>
                <p>Expected goals</p>
                {fixture.statistics.away.expectedGoals}
              </>
            ) : (
              <div>
                {fixture.statistics.home.expectedGoals}
                <p>Expected goals</p>
                <div className="bg-gray-500 p-2 rounded-full px-4">
                  {fixture.statistics.away.expectedGoals}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between w-full items-center">
            {fixture.statistics.home.shotsTotal >
            fixture.statistics.away.shotsTotal ? (
              <>
                <div className="bg-slate-700 p-2 rounded-full px-4">
                  {fixture.statistics.home.shotsTotal}
                </div>
                <p>Total Shots</p>
                {fixture.statistics.away.shotsTotal}
              </>
            ) : (
              <>
                {fixture.statistics.home.shotsTotal}
                <p>Total Shots</p>
                <div className="bg-gray-500 p-2 rounded-full px-4">
                  {fixture.statistics.away.shotsTotal}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between w-full">
            {fixture.statistics.home.shotsOn >
            fixture.statistics.away.shotsOn ? (
              <>
                <div className="bg-slate-700 p-2 rounded-full px-4">
                  {fixture.statistics.home.shotsOn}
                </div>
                <p>Shots on target</p>
                {fixture.statistics.away.shotsOn}
              </>
            ) : (
              <>
                {fixture.statistics.home.shotsOn}
                <p>Shots on target</p>
                <div className="bg-gray-500 p-2 rounded-full px-4">
                  {fixture.statistics.away.shotsOn}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between w-full items-center">
            {fixture.statistics.home.passesPercentage >
            fixture.statistics.away.passesPercentage ? (
              <>
                <div className="bg-slate-700 p-2 rounded-full px-4">
                  {fixture.statistics.home.passesAccurate + " "} (
                  {fixture.statistics.home.passesPercentage})
                </div>
                <p>Accurate passes</p>
                {fixture.statistics.away.passesAccurate + " "}(
                {fixture.statistics.away.passesPercentage})
              </>
            ) : (
              <>
                {fixture.statistics.home.passesAccurate}
                <p>Accurate passes</p>
                <div className="bg-gray-500 p-2 rounded-full px-4">
                  {fixture.statistics.away.passesAccurate}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between w-full items-center">
            {fixture.statistics.home.fouls < fixture.statistics.away.fouls ? (
              <>
                <div className="bg-slate-700 p-2 rounded-full px-4">
                  {fixture.statistics.home.fouls}
                </div>
                <p>Fouls committed</p>
                {fixture.statistics.away.fouls}
              </>
            ) : (
              <>
                {fixture.statistics.home.fouls}
                <p>Fouls committed</p>
                <div className="bg-gray-500 p-2 rounded-full px-4">
                  {fixture.statistics.away.fouls}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between w-full items-center">
            {fixture.statistics.home.yellowCards <
            fixture.statistics.away.yellowCards ? (
              <>
                <div className="bg-slate-700 p-2 rounded-full px-4">
                  {fixture.statistics.home.yellowCards}
                </div>
                <p>Yellow cards</p>
                {fixture.statistics.away.yellowCards}
              </>
            ) : (
              <>
                {fixture.statistics.home.yellowCards}
                <p>Yellow cards</p>
                <div className="bg-gray-500 p-2 rounded-full px-4">
                  {fixture.statistics.away.yellowCards}
                </div>
              </>
            )}
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
