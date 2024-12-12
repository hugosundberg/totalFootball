const FixtureList = ({ fixtures }: FixtureListProps) => {
  if (!fixtures) return null;

  return (
    <div className="flex flex-col bg-slate-800 w-full h-fit gap-2">
      {fixtures.map((fixture, index) => (
        <div key={index} className="h-20 bg-slate-400">
          <div>{fixture.fixtureInfo?.date}</div>
          <div className="grid grid-cols-custom-fixture gap-2 items-center">
            <span className="justify-self-end text-center ">
              {fixture.teams.home.name}
            </span>
            <img
              src={fixture.teams.home.logo}
              className="h-5"
              alt="home-team-logo"
            />
            <div className="text-center">
              {fixture.goals.home} - {fixture.goals.away}
            </div>
            <img
              src={fixture.teams.away.logo}
              className="h-5"
              alt="away-team-logo"
            />
            <span className=" justify-self-starttext-center">
              {fixture.teams.away.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FixtureList;
