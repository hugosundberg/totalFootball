const FixtureList = ({ fixtures }: FixtureListProps) => {
  if (!fixtures) return null;

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
    <div className="flex flex-col bg-slate-800 w-full h-fit gap-2">
      {fixtures.map((fixture, index) => (
        <div key={index} className="h-20 bg-slate-400">
          <div className="flex justify-between px-2 pt-2">
            <p>{dateFormatter(fixture.fixtureInfo?.date)}</p>
            <div className="flex gap-2">
              <img
                src={fixture.league.logo}
                className="h-6"
                alt="league-logo"
              />
              {fixture.league.name}
            </div>
          </div>
          <div className="grid grid-cols-custom-fixture gap-2 items-center">
            <span className="justify-self-end text-center ">
              {fixture.teams.home.name}
            </span>
            <img
              src={fixture.teams.home.logo}
              className="justify-self-end h-5"
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
