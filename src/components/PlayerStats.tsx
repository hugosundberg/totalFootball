const PlayerStats = ({ currentStats, player }: PlayerStatsProps) => {
  console.log(currentStats);

  return (
    <div className="h-fit w-full bg-zinc-800 items-center p-4">
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
      <span className="block h-0.5 w-full mt-2 bg-slate-700 rounded-full" />

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
            <p>{currentStats?.stats[0].cards.yellow}</p>
            <p className="text-xs text-slate-400">Yellow cards</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].cards.red}</p>
            <p className="text-xs text-slate-400">Red Cards</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerStats;
