import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lineup from "../components/Lineup";
import MatchStats from "../components/MatchStats";
import HeadToHead from "../components/HeadToHead";
import MatchEvents from "../components/MatchEvents";
import football from "../../assets/football.webp";

const Match = ({
  fixture,
  handleFetchMatch,
  headToHead,
  handleFetchTeam,
  handleFetchMatchEvents,
  matchEvents,
}: MatchProps) => {
  const { id } = useParams<{ id: string }>();
  const [homeReds, setHomeReds] = useState(0);
  const [awayReds, setAwayReds] = useState(0);

  console.log(fixture);
  

  useEffect(() => {
    if (id) {
      handleFetchMatch(Number(id));
    }

    handleFetchMatchEvents(Number(id));
  }, [id, handleFetchMatch]);

  const navigate = useNavigate();

  const handleTeamClick = (id: number) => {
    handleFetchTeam(id);
    navigate(`/totalFootball/team/${id}`);
  };

  if (!fixture) return null;

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

  const getGoalEvents = (events: MatchEvent[]) => {
    const goals = events.filter((event) => event.type === "Goal");

    return goals;
  };

  const getRedCardEvents = (events: MatchEvent[]) => {
    const redCards = events.filter(
      (event) => event.type === "Card" && event.detail === "Red Card"
    );

    let homeReds = 0;
    let awayReds = 0;

    redCards.forEach((card) => {
      if (card.team.id === fixture.fixture.teams.home.id) homeReds++;
      if (card.team.id === fixture.fixture.teams.away.id) awayReds++;
    });

    setHomeReds(homeReds);
    setAwayReds(awayReds);
  };

  return (
    <div className="bg-slate-200 dark:bg-black h-full pt-14 sm:pt-20 dark:text-white overflow-hidden">
      <div className="bg-white dark:bg-zinc-900 h-fit w-full sm:w-11/12 justify-self-center sm:rounded-3xl max-w-[1200px] shadow-lg">
        {/* Header */}
        <div className="hidden sm:flex gap-4 justify-center p-5 items-center">
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
          <span className="hidden sm:block h-0.5 bg-slate-300 dark:bg-zinc-800 w-full" />
          <div className="hidden sm:flex gap-8 p-2 dark:text-zinc-400 text-sm justify-center">
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
            {fixture.fixtureInfo.referee && (
              <div className="flex gap-2 items-center ">
                <svg
                  version="1.1"
                  id="Icons"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="none"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    className="st0"
                    d="M19.5,12L18,15h-5l1.5-3h-4.2c-4.3,0-8,3.2-8.3,7.5C1.7,24.1,5.4,28,10,28c2.3,0,4.4-1,5.8-2.5c3.8-4.1,8.7-7,14.2-8.5l0,0v-5H19.5z"
                  />
                  <circle className="st0" cx="10" cy="20" r="3" />
                  <line className="st0" x1="17" y1="4" x2="17" y2="7" />
                  <line className="st0" x1="12.1" y1="6.1" x2="14.2" y2="8.2" />
                  <line className="st0" x1="21.9" y1="6.1" x2="19.8" y2="8.2" />
                </svg>

                {fixture.fixtureInfo.referee}
              </div>
            )}
          </div>
          <span className="hidden sm:block h-0.5 bg-slate-300 dark:bg-zinc-800" />
        </div>

        <div className="grid grid-cols-3 gap-16 sm:gap-4 justify-self-center p-6 items-center">
          {/* Home Team */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 justify-self-end hover:cursor-pointer hover:underline"
            onClick={() => handleTeamClick(fixture.fixture.teams.home.id)}
          >
            <img
              src={fixture.fixture.teams.home.logo}
              alt="home-team-logo"
              className="h-10 sm:hidden"
            />
            <p className="text-sm sm:text-xl">
              {fixture.fixture.teams.home.name}
            </p>
            <img
              src={fixture.fixture.teams.home.logo}
              alt="home-team-logo"
              className="h-10 hidden sm:block"
            />
          </div>
          <div className="flex flex-col items-center gap-4 w-22 justify-self-center">
            <p className="text-3xl text-center">
              {/* Check if the match has started */}
              {fixture.fixtureInfo.status.short === "NS" ||
              fixture.fixtureInfo.status.short === "TBD" ||
              fixture.fixtureInfo.status.short === "PST"
                ? fixture.fixtureInfo.date.slice(11, 16)
                : `${fixture.goals !== undefined && fixture.goals.home} - ${fixture.goals !== undefined && fixture.goals.away}`}
            </p>
            <div className="text-sm text-slate-500">
              {fixture.fixtureInfo.status.short === "HT" ? (
                <p>Half Time</p>
              ) : fixture.fixtureInfo.status.short === "FT" ? (
                <p>Full Time</p>
              ) : fixture.fixtureInfo.status.short === "1H" ? (
                <p>
                  {fixture.fixtureInfo.status.extra === 0 &&
                    fixture.fixtureInfo.status.elapsed + "'"}

                  {fixture.fixtureInfo.status.extra !== 0 &&
                    fixture.fixtureInfo.status.elapsed +
                      " + " +
                      fixture.fixtureInfo.status.extra +
                      "'"}
                </p>
              ) : fixture.fixtureInfo.status.short === "2H" ? (
                <p>
                  {fixture.fixtureInfo.status.extra === 0 &&
                    fixture.fixtureInfo.status.elapsed + "'"}

                  {fixture.fixtureInfo.status.extra !== 0 &&
                    fixture.fixtureInfo.status.elapsed +
                      " + " +
                      fixture.fixtureInfo.status.extra +
                      "'"}
                </p>
              ) : fixture.fixtureInfo.status.short === "PEN" ? (
                <p>
                  {fixture.penalties
                    ? `Pen: ${fixture.penalties.home} - ${fixture.penalties.away}`
                    : "PEN"}
                </p>
              ) : fixture.fixtureInfo.status.extra !== null ? (
                <p>
                  {fixture.fixtureInfo.status.extra === 0 &&
                    fixture.fixtureInfo.status.elapsed + "'"}

                  {fixture.fixtureInfo.status.extra !== 0 &&
                    fixture.fixtureInfo.status.elapsed +
                      " + " +
                      fixture.fixtureInfo.status.extra +
                      "'"}
                </p>
              ) : fixture.fixtureInfo.status.short === "NS" ||
                fixture.fixtureInfo.status.short === "PST" ? (
                <p>{dateFormatter(fixture.fixtureInfo.date)}</p>
              ) : (
                <p>{fixture.fixtureInfo.status.elapsed + "'"}</p>
              )}
            </div>
          </div>

          {/* Away Team */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 hover:cursor-pointer hover:underline"
            onClick={() => handleTeamClick(fixture.fixture.teams.away.id)}
          >
            <img
              src={fixture.fixture.teams.away.logo}
              alt="away-team-logo"
              className="h-10"
            />
            <p className="text-sm sm:text-xl">
              {fixture.fixture.teams.away.name}
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full justify-center items-center pb-3">
          {fixture.fixtureInfo.status.short === "FT" && matchEvents && (
            <div className="grid grid-cols-[1fr_auto_1fr] text-zinc-500 text-xs justify-self-center w-full justify-center">
              <div className="flex flex-col gap-1">
                {getGoalEvents(matchEvents).map((event) => (
                  <>
                    {event.team.id === fixture.fixture.teams.home.id && (
                      <p className="flex justify-end">
                        {event.player.name} {event.time.elapsed}'
                      </p>
                    )}
                  </>
                ))}
              </div>
              <div>
                <img
                  src={football}
                  alt=""
                  className="h-[10px] px-5 mt-1 opacity-65"
                />
              </div>
              <div>
                {getGoalEvents(matchEvents).map((event) => (
                  <>
                    {event.team.id === fixture.fixture.teams.away.id && (
                      <p className="flex justify-start">
                        {event.player.name} {event.time.elapsed}'
                      </p>
                    )}
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {(fixture.fixtureInfo.status.short === "FT" ||
      fixture.fixtureInfo.status.short === "1H" || 
      fixture.fixtureInfo.status.short === "2H" || 
      fixture.fixtureInfo.status.short === "ET") &&  (
        <MatchEvents matchEvents={matchEvents} fixture={fixture} />
      )}

      {(fixture.fixtureInfo.status.short === "NS" ||
        fixture.fixtureInfo.status.short === "PST" ||
        fixture.fixtureInfo.status.short === "TBD") && (
        <HeadToHead
          fixture={fixture.fixture}
          headToHead={headToHead}
          handleMatchClick={handleFetchMatch}
        />
      )}

      <MatchStats fixture={fixture} />

      <div className="w-11/12 justify-self-center mb-32">
        <Lineup fixture={fixture} />
      </div>
    </div>
  );
};

export default Match;
