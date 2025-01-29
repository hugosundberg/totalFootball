const MatchStats = ({ fixture }: MatchStatsProps) => {
  if (!fixture.statistics) return null;

  if (fixture.statistics.home.shotsOn === null) {
    return null;
  }

  console.log("Match statistics: ", fixture.statistics);

  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 h-fit mt-4 rounded-3xl items-center py-3 sm:py-10 w-full sm:w-11/12 max-w-[1200px] justify-self-center shadow-lg">
      <h2 className="text-lg sm:text-2xl mb-4">Statistics</h2>
      <div className="flex flex-col items-center w-11/12 sm:w-9/12 lg:w-1/2 gap-8 text-sm sm:text-base">
        <p>Ball possesion</p>
        <div className="flex justify-between w-full bg-gray-300 dark:bg-gray-500 h-10 rounded-full">
          <div
            className="bg-slate-400 dark:bg-slate-700 h-full rounded-l-full border-r-2"
            style={{ width: `${fixture.statistics.home.possesion}` }}
          >
            <p className="p-2 px-4">{fixture.statistics.home.possesion}</p>
          </div>
          <p className="p-2 px-4">{fixture.statistics.away.possesion}</p>
        </div>

        {fixture.statistics.home.expectedGoals && (
          <div className="grid grid-cols-4 w-full items-center">
            {fixture.statistics.home.expectedGoals &&
            fixture.statistics.away.expectedGoals &&
            fixture.statistics.home.expectedGoals >
              fixture.statistics.away.expectedGoals ? (
              <>
                <div className="w-fit bg-slate-400 dark:bg-slate-700 p-2 rounded-full px-4">
                  {fixture.statistics.home.expectedGoals}
                </div>
                <p className="justify-self-center col-start-2 col-span-2">
                  Expected goals
                </p>
                <p className="justify-self-end px-4">
                  {fixture.statistics.away.expectedGoals}
                </p>
              </>
            ) : (
              <>
                <p className="px-4">{fixture.statistics.home.expectedGoals}</p>
                <p className="justify-self-center col-start-2 col-span-2">
                  Expected goals
                </p>
                <div className="w-fit bg-gray-300 dark:bg-gray-500 p-2 rounded-full px-4 justify-self-end">
                  {fixture.statistics.away.expectedGoals}
                </div>
              </>
            )}
          </div>
        )}

        <div className="grid grid-cols-4 w-full items-center">
          {fixture.statistics.home.shotsTotal &&
          fixture.statistics.away.shotsTotal &&
          fixture.statistics.home.shotsTotal >
            fixture.statistics.away.shotsTotal ? (
            <>
              <div className="w-fit bg-slate-400 dark:bg-slate-700 p-2 rounded-full px-4">
                {fixture.statistics.home.shotsTotal}
              </div>
              <p className="justify-self-center col-start-2 col-span-2">
                Total Shots
              </p>
              <p className="justify-self-end px-4">
                {fixture.statistics.away.shotsTotal}
              </p>
            </>
          ) : (
            <>
              <p className="px-4">{fixture.statistics.home.shotsTotal}</p>
              <p className="justify-self-center col-start-2 col-span-2">
                Total Shots
              </p>
              <div className="w-fit bg-gray-300 dark:bg-gray-500 p-2 rounded-full px-4 justify-self-end">
                {fixture.statistics.away.shotsTotal}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-4 w-full items-center">
          {fixture.statistics.home.shotsOn &&
          fixture.statistics.away.shotsOn &&
          fixture.statistics.home.shotsOn > fixture.statistics.away.shotsOn ? (
            <>
              <div className="w-fit bg-slate-400 dark:bg-slate-700 p-2 rounded-full px-4">
                {fixture.statistics.home.shotsOn}
              </div>
              <p className="justify-self-center col-start-2 col-span-2">
                Shots on target
              </p>
              <p className="justify-self-end px-4">
                {fixture.statistics.away.shotsOn}
              </p>
            </>
          ) : (
            <>
              <p className="px-4">{fixture.statistics.home.shotsOn}</p>
              <p className="justify-self-center col-start-2 col-span-2">
                Shots on target
              </p>
              <div className="w-fit bg-gray-300 dark:bg-gray-500 p-2 rounded-full px-4 justify-self-end">
                {fixture.statistics.away.shotsOn}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-4 w-full items-center">
          {fixture.statistics.home.passesPercentage &&
          fixture.statistics.away.passesPercentage &&
          fixture.statistics.home.passesPercentage >
            fixture.statistics.away.passesPercentage ? (
            <>
              <div className="w-fit bg-slate-400 dark:bg-slate-700 p-2 rounded-full px-4">
                {fixture.statistics.home.passesAccurate + " "} (
                {fixture.statistics.home.passesPercentage})
              </div>
              <p className="justify-self-center col-start-2 col-span-2">
                Accurate passes
              </p>
              <div className="justify-self-end px-4">
                {fixture.statistics.away.passesAccurate + " "}(
                {fixture.statistics.away.passesPercentage})
              </div>
            </>
          ) : (
            <>
              <p className="px-4">{fixture.statistics.home.passesAccurate}</p>
              <p className="justify-self-center col-start-2 col-span-2">
                Accurate passes
              </p>
              <div className="w-fit bg-gray-300 dark:bg-gray-500 p-2 rounded-full px-4 justify-self-end">
                {fixture.statistics.away.passesAccurate}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-4 w-full items-center">
          {fixture.statistics.home.fouls &&
          fixture.statistics.away.fouls &&
          fixture.statistics.home.fouls < fixture.statistics.away.fouls ? (
            <>
              <div className="w-fit bg-slate-400 dark:bg-slate-700 p-2 rounded-full px-4">
                {fixture.statistics.home.fouls}
              </div>
              <p className="justify-self-center col-start-2 col-span-2">
                Fouls committed
              </p>
              <p className="justify-self-end px-4">
                {fixture.statistics.away.fouls}
              </p>
            </>
          ) : (
            <>
              <p className="px-4">{fixture.statistics.home.fouls}</p>
              <p className="justify-self-center col-start-2 col-span-2">
                Fouls committed
              </p>
              <div className="w-fit bg-gray-300 dark:bg-gray-500 p-2 rounded-full px-4 justify-self-end">
                {fixture.statistics.away.fouls}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-4 w-full items-center">
          {fixture.statistics.home.yellowCards &&
          fixture.statistics.away.yellowCards &&
          fixture.statistics.home.yellowCards <
            fixture.statistics.away.yellowCards ? (
            <>
              <div className="w-fit bg-slate-400 dark:bg-slate-700 p-2 rounded-full px-4">
                {fixture.statistics.home.yellowCards}
              </div>
              <p className="justify-self-center col-start-2 col-span-2">
                Yellow cards
              </p>
              <p className="justify-self-end px-4">
                {fixture.statistics.away.yellowCards}
              </p>
            </>
          ) : (
            <>
              <p className="px-4">{fixture.statistics.home.yellowCards}</p>
              <p className="justify-self-center col-start-2 col-span-2">
                Yellow cards
              </p>
              <div className="w-fit bg-gray-300 dark:bg-gray-500 p-2 rounded-full px-4 justify-self-end">
                {fixture.statistics.away.yellowCards}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-4 w-full">
          {fixture.statistics.home.redCards === null ? (
            <p className="px-4">0</p>
          ) : (
            <p className="px-4">{fixture.statistics.home.redCards}</p>
          )}
          <p className="justify-self-center col-start-2 col-span-2">
            Red cards
          </p>
          <p className="justify-self-end">
            {fixture.statistics.away.redCards === null ? (
              <p className="px-4">0</p>
            ) : (
              <p className="px-4">{fixture.statistics.away.redCards}</p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchStats;
