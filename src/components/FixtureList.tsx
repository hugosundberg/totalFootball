import { useState } from "react";

const FixtureList = ({
  fixtures,
  teamID,
  handleMatchClick,
}: FixtureListProps) => {
  if (!fixtures) return null;

  const [currentPage, setCurrentPage] = useState(1);
  const fixturesPerPage = 10;

  // Calculate the fixtures to display
  const indexOfLastFixture = currentPage * fixturesPerPage;
  const indexOfFirstFixture = indexOfLastFixture - fixturesPerPage;
  const currentFixtures = fixtures.slice(
    indexOfFirstFixture,
    indexOfLastFixture
  );

  // Calculate total pages
  const totalPages = Math.ceil(fixtures.length / fixturesPerPage);

  // Handle page change
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

  return (
    <div className="flex flex-col bg-zinc-900 w-full h-fit rounded-2xl overflow-auto mb-10">
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {currentFixtures.map((fixture, index) => (
        <div
          key={index}
          className="h-fit hover:bg-zinc-800 hover:cursor-pointer"
          onClick={() => handleMatchClick(fixture.fixtureInfo.id)}
        >
          <div className="flex justify-between p-6">
            <p className="text-sm text-gray-400">
              {dateFormatter(fixture.fixtureInfo?.date)}
            </p>
            <div className="flex gap-2 items-center text-sm text-gray-400">
              {fixture.league.name}
              <img
                src={fixture.league.logo}
                className="h-8 bg-gray-400 p-1 rounded-full"
                alt="league-logo"
              />
            </div>
          </div>
          <div className="grid grid-cols-custom-fixture gap-2 items-center pb-8">
            <span className="justify-self-end text-center ">
              {fixture.teams.home.name}
            </span>
            <img
              src={fixture.teams.home.logo}
              className="justify-self-center h-5"
              alt="home-team-logo"
            />

            {fixture.fixtureInfo.status.short === "1H" ||
              fixture.fixtureInfo.status.short === "HT" ||
              fixture.fixtureInfo.status.short === "2H" ||
              (fixture.fixtureInfo.status.short === "ET" && (
                <div>
                  {fixture.goals.home} - {fixture.goals.away}
                </div>
              ))}

            {fixture.fixtureInfo.status.short === "FT" && (
              <div
                className={`text-center rounded-lg ${
                  fixture.teams.home.id === teamID && fixture.teams.home.winner
                    ? "bg-green-700" // Home wins
                    : fixture.teams.away.id === teamID &&
                        fixture.teams.away.winner
                      ? "bg-green-700" // Away wins
                      : fixture.teams.home.id === teamID &&
                          fixture.teams.away.winner
                        ? "bg-red-700" // Home losses
                        : fixture.teams.away.id === teamID &&
                            fixture.teams.home.winner
                          ? "bg-red-700" // Away losses
                          : fixture.teams.away.winner === null &&
                              fixture.teams.home.winner === null
                            ? "bg-gray-500" // Draws
                            : "" // Default
                }`}
              >
                {fixture.goals.home} - {fixture.goals.away}
              </div>
            )}

            {fixture.fixtureInfo.status.short === "PEN" && (
              <div
                className={`text-center rounded-lg ${
                  fixture.teams.home.id === teamID && fixture.teams.home.winner
                    ? "bg-green-700" // Home wins
                    : fixture.teams.away.id === teamID &&
                        fixture.teams.away.winner
                      ? "bg-green-700" // Away wins
                      : fixture.teams.home.id === teamID &&
                          fixture.teams.away.winner
                        ? "bg-red-700" // Home losses
                        : fixture.teams.away.id === teamID &&
                            fixture.teams.home.winner
                          ? "bg-red-700" // Away losses
                          : fixture.teams.away.winner === null &&
                              fixture.teams.home.winner === null
                            ? "bg-gray-500" // Draws
                            : "" // Default
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
            <span className="justify-self-starttext-center">
              {fixture.teams.away.name}
            </span>
          </div>
          <span className="block w-full h-0.5 bg-zinc-800" />
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
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
