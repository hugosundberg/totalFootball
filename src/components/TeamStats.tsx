const TeamStats = ({ seasonStats }: TeamStats) => {
  if (!seasonStats) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full dark:bg-black text-sm sm:text-base shadow-xl">
      <div className="flex flex-col w-full h-full bg-white dark:bg-zinc-900 pt-4 sm:rounded-2xl overflow-hidden">
        <h2 className="text-2xl text-center font-bold dark:text-white mb-4">
          Competition stats
        </h2>

        <div>
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 bg-slate-100 dark:bg-zinc-700 border-solid border-b-[1.5px] border-t-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p className="col-start-2">Home</p>
            <p>Away</p>
            <p>Total</p>
          </div>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p>Games played</p>
            <p>{seasonStats.fixtures.played.home}</p>
            <p>{seasonStats.fixtures.played.away}</p>
            <p>{seasonStats.fixtures.played.total}</p>
          </div>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p>Wins</p>
            <p>{seasonStats.fixtures.wins.home}</p>
            <p>{seasonStats.fixtures.wins.away}</p>
            <p>{seasonStats.fixtures.wins.total}</p>
          </div>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p>Draws</p>
            <p>{seasonStats.fixtures.draws.home}</p>
            <p>{seasonStats.fixtures.draws.away}</p>
            <p>{seasonStats.fixtures.draws.total}</p>
          </div>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p>Losses</p>
            <p>{seasonStats.fixtures.losses.home}</p>
            <p>{seasonStats.fixtures.losses.away}</p>
            <p>{seasonStats.fixtures.losses.total}</p>
          </div>

          <p className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 bg-slate-100 dark:bg-zinc-700 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            GOALS
          </p>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p>Goals for</p>
            <p>{seasonStats.goals.for.total.home}</p>
            <p>{seasonStats.goals.for.total.away}</p>
            <p>{seasonStats.goals.for.total.total}</p>
          </div>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            <p>Goals against</p>
            <p>{seasonStats.goals.against.total.total}</p>
            <p>{seasonStats.goals.against.total.away}</p>
            <p>{seasonStats.goals.against.total.home}</p>
          </div>

          <p className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 bg-slate-100 dark:bg-zinc-700 border-solid border-b-[1.5px] border-zinc-200 dark:border-zinc-500">
            GOALS AVERAGE
          </p>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 gap-4 col-span-4 dark:bg-zinc-800 border-solid  border-zinc-200 dark:border-zinc-500">
            <p>Goals average</p>
            <p>{seasonStats.goals.for.average.home}</p>
            <p>{seasonStats.goals.for.average.away}</p>
            <p>{seasonStats.goals.for.average.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;
