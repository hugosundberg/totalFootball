import { useEffect, useState } from "react";
import Table from "./Table";

const TeamOverview = ({
  team,
  fixtures,
  handleMatchClick,
  standing,
  handleFetchTeam,
}: TeamOverviewProps) => {
  if (!fixtures) return null;

  const [nextFixture, setNextFixture] = useState<Fixture | null>(null);
  const [currentForm, setCurrentForm] = useState<Fixture[]>();

  useEffect(() => {
    setNextFixture(getNextFixture(fixtures));
    setCurrentForm(getCurrentForm(fixtures));
  }, [fixtures]);

  const getNextFixture = (fixtures: Fixture[]) => {
    const today = new Date();
    for (let index = 0; index < fixtures.length; index++) {
      const fixtureDate = new Date(fixtures[index].fixtureInfo.date);
      if (fixtureDate > today) {
        return fixtures[index];
      }
    }
    return null;
  };

  const getCurrentForm = (fixtures: Fixture[]) => {
    const today = new Date();
    for (let index = 0; index < fixtures.length; index++) {
      const fixtureDate = new Date(fixtures[index].fixtureInfo.date);
      if (fixtureDate > today) {
        if (index < 5) {
          return fixtures.slice(0, index);
        } else {
          return fixtures.slice(index - 5, index);
        }
      }
    }
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
    <div className="w-full">
      {/* Next match */}
      <div className="bg-zinc-800 w-full p-6 rounded-xl">
        <div className="flex justify-between">
          <p>Next match</p>
          <div className="flex items-center gap-2">
            <p>{nextFixture?.league.name}</p>
            <img
              src={nextFixture?.league.logo}
              alt=""
              className="h-8 bg-white rounded-full p-1"
            />
          </div>
        </div>
        <div className="flex justify-between mt-6 px-10">
          <div className="flex flex-col items-center gap-2">
            <img src={nextFixture?.teams.home.logo} alt="" className="h-10" />
            <p>{nextFixture?.teams.home.name}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            {nextFixture && (
              <>
                <p className="text-2xl">
                  {timeFormatter(nextFixture?.fixtureInfo.date)}
                </p>
                <p className="text-sm">
                  {dateFormatter(nextFixture?.fixtureInfo.date)}
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src={nextFixture?.teams.away.logo} alt="" className="h-10" />
            <p>{nextFixture?.teams.away.name}</p>
          </div>
        </div>
      </div>

      {/* Current form */}
      <div className="bg-zinc-800 w-full p-6 rounded-xl mt-4">
        <p>Team form</p>
        <div className="flex justify-between">
          {currentForm?.map((fixture, index) => (
            <div key={index} className="flex flex-col items-center gap-2 mt-2">
              {fixture.teams.away.teamID === team.id ? (
                <div
                  className="flex flex-col items-center gap-4 hover:cursor-pointer p-2 sm:px-6 hover:bg-zinc-900 rounded-xl"
                  onClick={() => handleMatchClick(fixture.fixtureInfo.id)}
                >
                  <p
                    className={`px-2 rounded-lg ${
                      fixture.teams.away.winner
                        ? "bg-green-500"
                        : fixture.teams.home.winner
                          ? "bg-red-500"
                          : "bg-gray-500"
                    }`}
                  >
                    {fixture.goals.home} - {fixture.goals.away}
                  </p>
                  <img src={fixture.teams.home.logo} alt="" className="h-10" />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center gap-4 hover:cursor-pointer p-2 sm:px-6 hover:bg-zinc-900 rounded-xl"
                  onClick={() => handleMatchClick(fixture.fixtureInfo.id)}
                >
                  <p
                    className={`px-2 rounded-lg ${
                      fixture.teams.home.winner
                        ? "bg-green-500"
                        : fixture.teams.away.winner
                          ? "bg-red-500"
                          : "bg-gray-500"
                    }`}
                  >
                    {fixture.goals.home} - {fixture.goals.away}
                  </p>
                  <img src={fixture.teams.away.logo} alt="" className="h-10" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* TABLE */}
      </div>
      <div className="mt-4">
        <Table
          standing={standing}
          handleFetchTeam={handleFetchTeam}
          currentTeam={team}
        />
      </div>
    </div>
  );
};

export default TeamOverview;
