import { useEffect, useState } from "react";

const TeamOverview = ({ team, fixtures }: TeamOverviewProps) => {
  if (!fixtures) return null;

  const [nextFixture, setNextFixture] = useState<Fixture | null>(null);

  useEffect(() => {
    return setNextFixture(getNextFixture(fixtures));
  });

  const getNextFixture = (fixtures: Fixture[]) => {
    const today = new Date();
    for (let index = 0; index < fixtures.length; index++) {
      const fixtureDate = new Date(fixtures[index].fixtureInfo.date);
      if (fixtureDate > today) {
        return fixtures[index];
      }
    }
    return null; // Return null if no future fixture is found
  };

  console.log("Next fixture: ", getNextFixture(fixtures));

  return (
    <div className="w-full">
      <div className="bg-zinc-800 w-full h-full p-8">
        <p>Next match</p>
        <div className="flex justify-between mt-6 px-10">
          <div className="flex flex-col items-center gap-2">
            <img src={nextFixture?.teams.home.logo} alt="" className="h-10" />
            <p>{nextFixture?.teams.home.name}</p>
          </div>
          <div>
            <p>{nextFixture?.fixtureInfo.date}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src={nextFixture?.teams.away.logo} alt="" className="h-10" />
            <p>{nextFixture?.teams.away.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;
