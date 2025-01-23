const HeadToHead = ({
  fixture,
  headToHead,
  handleMatchClick,
}: HeadToHeadProps) => {
  if (headToHead === undefined) {
    return null;
  }
  if (headToHead.length === 1) {
    return;
  }

  return (
    <div className="flex flex-col bg-zinc-900 w-full h-fit sm:rounded-2xl overflow-auto mt-5 mb-5">
      {headToHead.map((match, index) => (
        <div
          key={index}
          className="h-fit hover:bg-zinc-800 hover:cursor-pointer"
          onClick={() => handleMatchClick(match.fixtureInfo.id)}
        >
          <div className="flex justify-between p-6">
            <p className="text-sm text-gray-400">
              {new Date(match.fixtureInfo.date).toLocaleDateString()}
            </p>
            <div className="flex gap-2 items-center text-sm text-gray-400">
              {match.league.name}
              <img
                src={match.league.logo}
                className="h-8 bg-gray-400 p-1 rounded-full"
                alt="league-logo"
              />
            </div>
          </div>
          <div className="grid grid-cols-custom-fixture gap-2 items-center pb-8">
            <span className="justify-self-end text-center ">
              {match.teams.home.name}
            </span>
            <img
              src={match.teams.home.logo}
              className="justify-self-center h-5"
              alt="home-team-logo"
            />
            <div className="text-center">
              {match.goals.home} - {match.goals.away}
            </div>
            <img
              src={match.teams.away.logo}
              className="justify-self-center h-5"
              alt="away-team-logo"
            />
            <span className="justify-self-start text-center">
              {match.teams.away.name}
            </span>
          </div>
          <span className="block w-full h-0.5 bg-zinc-800" />
        </div>
      ))}
    </div>
  );
};
export default HeadToHead;
