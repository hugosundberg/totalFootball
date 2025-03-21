const PlayerStats = ({ currentStats, player }: PlayerStatsProps) => {

  return (
    <div className="h-fit w-full sm:w-11/12 sm:rounded-xl sm:mt-4 bg-white dark:bg-zinc-900 items-center p-4 shadow-xl">
      <div className="flex gap-2 justify-self-center items-center">
        <img
          src={currentStats?.stats[0].league.logo}
          alt=""
          className="h-8 bg-white p-1 rounded-full ml-1"
        />
        <p className="justify-self-center text-xl">
          {currentStats?.stats[0].league.name}
        </p>
      </div>
      <span className="block h-0.5 w-full mt-2 bg-gray-300 dark:bg-slate-800 rounded-full" />

      {player.position === "Goalkeeper" && (
        <div className="flex flex-wrap gap-4 mt-4 justify-self-center justify-center">
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.appearences}</p>
            <p className="text-xs text-slate-400">Appearences</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.lineups}</p>
            <p className="text-xs text-slate-400">Starts</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.minutes}</p>
            <p className="text-xs text-slate-400">Minutes</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].goals.conceded}</p>
            <p className="text-xs text-slate-400">Goals conceded</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].cards.yellow}</p>
            <p className="text-xs text-slate-400">Yellow cards</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].cards.red}</p>
            <p className="text-xs text-slate-400">Red Cards</p>
          </div>
        </div>
      )}

      {player.position === "Defender" && (
        <div className="flex flex-wrap gap-4 mt-4 justify-self-center justify-center">
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.appearences}</p>
            <p className="text-xs text-slate-400">Appearences</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.lineups}</p>
            <p className="text-xs text-slate-400">Starts</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.minutes}</p>
            <p className="text-xs text-slate-400">Minutes</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>
              {currentStats?.stats[0].duels.won}/
              {currentStats?.stats[0].duels.total}
            </p>
            <p className="text-xs text-slate-400">Duels won</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].goals.total}</p>
            <p className="text-xs text-slate-400">Goals</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].goals.assists}</p>
            <p className="text-xs text-slate-400">Assists</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].cards.yellow}</p>
            <p className="text-xs text-slate-400">Yellow cards</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].cards.red}</p>
            <p className="text-xs text-slate-400">Red Cards</p>
          </div>
        </div>
      )}

      {player.position === "Midfielder" && (
        <div className="flex flex-wrap gap-4 mt-4 justify-self-center justify-center">
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.appearences}</p>
            <p className="text-xs text-slate-400">Appearences</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.lineups}</p>
            <p className="text-xs text-slate-400">Starts</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.minutes}</p>
            <p className="text-xs text-slate-400">Minutes</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>
              {currentStats?.stats[0].duels.won}/
              {currentStats?.stats[0].duels.total}
            </p>
            <p className="text-xs text-slate-400">Duels won</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].goals.total}</p>
            <p className="text-xs text-slate-400">Goals</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].goals.assists}</p>
            <p className="text-xs text-slate-400">Assists</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <div className="flex gap-2 items-center">
              <span className="block h-4 w-3 bg-yellow-400 rounded-sm" />
              <p>{currentStats?.stats[0].cards.yellow}</p>
            </div>
            <p className="text-xs text-slate-400">Yellow cards</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <div className="flex gap-2 items-center">
              <span className="block h-4 w-3 bg-red-500 rounded-sm" />
              <p>{currentStats?.stats[0].cards.red}</p>
            </div>
            <p className="text-xs text-slate-400">Red Cards</p>
          </div>
        </div>
      )}

      {player.position === "Attacker" && (
        <div className="flex flex-wrap gap-4 mt-4 justify-self-center justify-center">
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.appearences}</p>
            <p className="text-xs text-slate-400">Appearences</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.lineups}</p>
            <p className="text-xs text-slate-400">Starts</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.minutes}</p>
            <p className="text-xs text-slate-400">Minutes</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>
              {currentStats?.stats[0].duels.won}/
              {currentStats?.stats[0].duels.total}
            </p>
            <p className="text-xs text-slate-400">Duels won</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].goals.total}</p>
            <p className="text-xs text-slate-400">Goals</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].goals.assists}</p>
            <p className="text-xs text-slate-400">Assists</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <div className="flex gap-2 items-center">
              <span className="block h-4 w-3 bg-yellow-400 rounded-sm" />
              <p>{currentStats?.stats[0].cards.yellow}</p>
            </div>
            <p className="text-xs text-slate-400">Yellow cards</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <div className="flex gap-2 items-center">
              <span className="block h-4 w-3 bg-red-500 rounded-sm" />
              <p>{currentStats?.stats[0].cards.red}</p>
            </div>
            <p className="text-xs text-slate-400">Red Cards</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerStats;
