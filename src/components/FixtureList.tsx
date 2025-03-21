import { useEffect, useState } from "react";

const FixtureList = ({
  fixtures,
  teamID,
  handleMatchClick,
}: FixtureListProps) => {
  if (!fixtures) return null;

  const [currentFixtures, setCurrentFixtures] = useState<Fixture[]>([]);

  const fixturesPerPage = 10;

  const upcomingGameIndex = fixtures.findIndex(
    (fixture) => fixture.fixtureInfo.status.short === "NS"
  );

  // Calculate the initial page based on the upcoming game index
  const initialPage = Math.ceil((upcomingGameIndex + 1) / fixturesPerPage);

  const [currentPage, setCurrentPage] = useState(initialPage);

  const indexOfLastFixture = currentPage * fixturesPerPage;
  const indexOfFirstFixture = indexOfLastFixture - fixturesPerPage;

  useEffect(() => {
    const currentFixtures = fixtures.slice(
      indexOfFirstFixture,
      indexOfLastFixture
    );
    setCurrentFixtures(currentFixtures);
  }, [fixtures, indexOfFirstFixture, indexOfLastFixture]);

  const totalPages = Math.ceil(fixtures.length / fixturesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

  const getFixtureBackgroundColor = (fixture: Fixture, teamID: number) => {
    const isHomeTeam = fixture.teams.home.teamID === teamID;
    const isAwayTeam = fixture.teams.away.teamID === teamID;

    if (isHomeTeam) {
      return fixture.teams.home.winner
        ? "bg-green-700"
        : fixture.teams.away.winner
          ? "bg-red-700"
          : "bg-gray-500";
    } else if (isAwayTeam) {
      return fixture.teams.away.winner
        ? "bg-green-700"
        : fixture.teams.home.winner
          ? "bg-red-700"
          : "bg-gray-500";
    } else {
      return "bg-transparent";
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 w-full h-fit rounded-2xl overflow-auto mb-10">
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1
                ? "bg-green-600 text-white"
                : "text-green-800 bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Fixture List */}
      {currentFixtures.map((fixture, index) => (
        <div
          key={index}
          className="h-fit hover:bg-zinc-800 hover:cursor-pointer"
          onClick={() => handleMatchClick(fixture.fixtureInfo.id)}
        >
          <div className="flex justify-between p-6">
            <p className="text-sm dark:text-gray-400">
              {dateFormatter(fixture.fixtureInfo?.date)}
            </p>
            <div className="flex gap-2 items-center text-sm dark:text-gray-400">
              {fixture.league.name}
              <img
                src={fixture.league.logo}
                className="h-8 dark:bg-gray-100 p-1 rounded-full"
                alt="league-logo"
              />
            </div>
          </div>
          <div className="grid grid-cols-custom-fixture gap-2 items-center pb-8">
            <span className="justify-self-end text-center ">
              {fixture.teams.home.name}{" "}
            </span>
            <img
              src={fixture.teams.home.logo}
              className="justify-self-center h-5"
              alt="home-team-logo"
            />

            {fixture.fixtureInfo.status.short === "1H" ||
            fixture.fixtureInfo.status.short === "HT" ||
            fixture.fixtureInfo.status.short === "2H" ||
            fixture.fixtureInfo.status.short === "ET" ? (
              <div>
                {fixture.goals.home} - {fixture.goals.away}
              </div>
            ) : null}

            {fixture.fixtureInfo.status.short === "FT" && (
              <div
                className={`text-center rounded-lg text-white ${getFixtureBackgroundColor(fixture, teamID)}`}
              >
                {fixture.goals.home} - {fixture.goals.away}
              </div>
            )}

            {fixture.fixtureInfo.status.short === "PEN" && (
              <div
                className={`text-center rounded-lg ${
                  fixture.teams.home.teamID === teamID
                    ? fixture.teams.home.winner
                      ? "bg-green-700" // Home wins
                      : fixture.teams.away.winner
                        ? "bg-red-700" // Home losses
                        : fixture.teams.away.winner === null &&
                            fixture.teams.home.winner === null
                          ? "bg-gray-500" // Draws
                          : "" // Default
                    : fixture.teams.away.teamID === teamID
                      ? fixture.teams.away.winner
                        ? "bg-green-700" // Away wins
                        : fixture.teams.home.winner
                          ? "bg-red-700" // Away losses
                          : fixture.teams.away.winner === null &&
                              fixture.teams.home.winner === null
                            ? "bg-gray-500" // Draws
                            : "" // Default
                      : ""
                }`}
              >
                <p>PEN</p>
                {fixture.goals.home} - {fixture.goals.away}
              </div>
            )}

            {fixture.fixtureInfo.status.short === "PST" && (
              <div className="text-center">PP</div>
            )}

            {fixture.fixtureInfo.status.short === "NS" && (
              <div className="text-center">
                {timeFormatter(fixture.fixtureInfo.date)}
              </div>
            )}

            <img
              src={fixture.teams.away.logo}
              className="justify-self-center h-5"
              alt="away-team-logo"
            />
            <span className="justify-self-start text-center">
              {fixture.teams.away.name}
            </span>
          </div>
          <span className="block w-full h-0.5 bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1
                ? "bg-green-600 text-white"
                : "text-green-700 bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FixtureList;
