const MatchStats = ({ fixture }: MatchStatsProps) => {
  return (
    <div className="flex flex-col bg-zinc-900 h-fit mt-4 rounded-3xl items-center py-10 w-11/12 max-w-[1200px] justify-self-center">
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

        <div className="grid grid-cols-3 w-full">
          {fixture.statistics.home.expectedGoals >
          fixture.statistics.away.expectedGoals ? (
            <>
              <div className="w-fit bg-slate-700 p-2 rounded-full px-4">
                {fixture.statistics.home.expectedGoals}
              </div>
              <p className="justify-self-center">Expected goals</p>
              <p className="justify-self-end">
                {fixture.statistics.away.expectedGoals}
              </p>
            </>
          ) : (
            <>
              {fixture.statistics.home.expectedGoals}
              <p className="justify-self-center">Expected goals</p>
              <div className="w-fit bg-gray-500 p-2 rounded-full px-4 justify-self-end">
                {fixture.statistics.away.expectedGoals}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 w-full items-center">
          {fixture.statistics.home.shotsTotal >
          fixture.statistics.away.shotsTotal ? (
            <>
              <div className="w-fit bg-slate-700 p-2 rounded-full px-4">
                {fixture.statistics.home.shotsTotal}
              </div>
              <p className="justify-self-center">Total Shots</p>
              <p className="justify-self-end">
                {fixture.statistics.away.shotsTotal}
              </p>
            </>
          ) : (
            <>
              {fixture.statistics.home.shotsTotal}
              <p className="justify-self-center">Total Shots</p>
              <div className="w-fit bg-gray-500 p-2 rounded-full px-4 justify-self-end">
                {fixture.statistics.away.shotsTotal}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 w-full">
          {fixture.statistics.home.shotsOn > fixture.statistics.away.shotsOn ? (
            <>
              <div className="w-fit bg-slate-700 p-2 rounded-full px-4">
                {fixture.statistics.home.shotsOn}
              </div>
              <p className="justify-self-center">Shots on target</p>
              <p className="justify-self-end">
                {fixture.statistics.away.shotsOn}
              </p>
            </>
          ) : (
            <>
              {fixture.statistics.home.shotsOn}
              <p className="justify-self-center">Shots on target</p>
              <div className="w-fit bg-gray-500 p-2 rounded-full px-4 justify-self-end">
                {fixture.statistics.away.shotsOn}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 w-full items-center">
          {fixture.statistics.home.passesPercentage >
          fixture.statistics.away.passesPercentage ? (
            <>
              <div className="w-fit bg-slate-700 p-2 rounded-full px-4">
                {fixture.statistics.home.passesAccurate + " "} (
                {fixture.statistics.home.passesPercentage})
              </div>
              <p className="justify-self-center">Accurate passes</p>
              <div className="justify-self-end">
                {fixture.statistics.away.passesAccurate + " "}(
                {fixture.statistics.away.passesPercentage})
              </div>
            </>
          ) : (
            <>
              {fixture.statistics.home.passesAccurate}
              <p className="justify-self-center">Accurate passes</p>
              <div className="w-fit bg-gray-500 p-2 rounded-full px-4 justify-self-end">
                {fixture.statistics.away.passesAccurate}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 w-full items-center">
          {fixture.statistics.home.fouls < fixture.statistics.away.fouls ? (
            <>
              <div className="w-fit bg-slate-700 p-2 rounded-full px-4">
                {fixture.statistics.home.fouls}
              </div>
              <p className="justify-self-center">Fouls committed</p>
              <p className="justify-self-end">
                {fixture.statistics.away.fouls}
              </p>
            </>
          ) : (
            <>
              {fixture.statistics.home.fouls}
              <p className="justify-self-center">Fouls committed</p>
              <div className="w-fit bg-gray-500 p-2 rounded-full px-4 justify-self-end">
                {fixture.statistics.away.fouls}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 w-full items-center">
          {fixture.statistics.home.yellowCards <
          fixture.statistics.away.yellowCards ? (
            <>
              <div className="w-fit bg-slate-700 p-2 rounded-full px-4">
                {fixture.statistics.home.yellowCards}
              </div>
              <p className="justify-self-center">Yellow cards</p>
              <p className="justify-self-end">
                {fixture.statistics.away.yellowCards}
              </p>
            </>
          ) : (
            <>
              {fixture.statistics.home.yellowCards}
              <p className="justify-self-center">Yellow cards</p>
              <div className="w-fit bg-gray-500 p-2 rounded-full px-4 justify-self-end">
                {fixture.statistics.away.yellowCards}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 w-full">
          {fixture.statistics.home.redCards === null && 0}
          <p className="justify-self-center">Red cards</p>
          <p className="justify-self-end">
            {fixture.statistics.away.redCards === null && 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchStats;
