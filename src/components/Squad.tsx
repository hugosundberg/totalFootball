import { useEffect, useState } from "react";

interface SquadProps {
  squad?: SquadPlayer[];
  handlePlayerClick: (playerID: number) => void;
}

const Squad = ({ squad, handlePlayerClick }: SquadProps) => {
  const [goalKeepers, setGoalKeepers] = useState<SquadPlayer[]>([]);
  const [defenders, setDefenders] = useState<SquadPlayer[]>([]);
  const [midfielders, setMidfielders] = useState<SquadPlayer[]>([]);
  const [forwards, setForwards] = useState<SquadPlayer[]>([]);

  useEffect(() => {
    if (squad) {
      // Categorize players by position
      const gk: SquadPlayer[] = [];
      const def: SquadPlayer[] = [];
      const mid: SquadPlayer[] = [];
      const fwd: SquadPlayer[] = [];

      squad.forEach((squadPlayer) => {
        if (squadPlayer.position === "Goalkeeper") {
          gk.push(squadPlayer);
        } else if (squadPlayer.position === "Defender") {
          def.push(squadPlayer);
        } else if (squadPlayer.position === "Midfielder") {
          mid.push(squadPlayer);
        } else if (squadPlayer.position === "Attacker") {
          fwd.push(squadPlayer);
        }
      });

      setGoalKeepers(gk);
      setDefenders(def);
      setMidfielders(mid);
      setForwards(fwd);
    }
  }, [squad]); // Re-run when `squad` changes

  if (!squad) {
    return (
      <div className="dark:bg-zinc-900 mt-4 h-fit p-10 flex flex-col rounded-lg dark:text-white gap-10">
        <p className="font-bold">No squad data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 mt-4 h-fit p-10 flex flex-col rounded-2xl dark:text-white gap-10 shadow-lg">
      <p className="font-bold text-xl">Squad</p>

      <div>
        <h2 className="font-semibold text-lg mb-2 ">Goalkeepers</h2>
        <div className="flex gap-2 flex-wrap ho">
          {goalKeepers.length > 0 ? (
            goalKeepers.map((player) => (
              <div
                className="flex w-60 h-20 border border-zinc-300 dark:bg-zinc-700 rounded-md gap-2 p-2 items-center hover:cursor-pointer"
                onClick={() => handlePlayerClick(player.id)}
              >
                <img
                  src={player.photo}
                  alt="player-photo"
                  className="rounded-full h-12 p-1 bg-green-900"
                />
                <div className="">
                  <p>{player.name}</p>
                  <p># {player.squadNumber}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No goalkeepers available</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Defenders</h2>
        <div className="flex gap-2 flex-wrap">
          {defenders.length > 0 ? (
            defenders.map((player) => (
              <div
                className="flex w-60 h-20 border border-zinc-300 dark:bg-zinc-700 rounded-md gap-2 p-2 items-center hover:cursor-pointer"
                onClick={() => handlePlayerClick(player.id)}
              >
                <img
                  src={player.photo}
                  alt="player-photo"
                  className="rounded-full h-12 p-1 bg-green-900"
                />
                <div className="">
                  <p>{player.name}</p>
                  <p># {player.squadNumber}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No defenders available</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Midfielders</h2>
        <div className="flex gap-2 flex-wrap">
          {midfielders.length > 0 ? (
            midfielders.map((player) => (
              <div
                className="flex w-60 h-20 border border-zinc-300 dark:bg-zinc-700 rounded-md gap-2 p-2 items-center hover:cursor-pointer"
                onClick={() => handlePlayerClick(player.id)}
              >
                <img
                  src={player.photo}
                  alt="player-photo"
                  className="rounded-full h-12 p-1 bg-green-900"
                />
                <div className="">
                  <p>{player.name}</p>
                  <p># {player.squadNumber}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No midfielders available</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2">Forwards</h2>
        <div className="flex gap-2 flex-wrap">
          {forwards.length > 0 ? (
            forwards.map((player) => (
              <div
                className="flex w-60 h-20 border border-zinc-300 dark:bg-zinc-700 rounded-md gap-2 p-2 items-center hover:cursor-pointer"
                onClick={() => handlePlayerClick(player.id)}
              >
                <img
                  src={player.photo}
                  alt="player-photo"
                  className="rounded-full h-12 p-1 bg-green-900"
                />
                <div className="">
                  <p>{player.name}</p>
                  <p># {player.squadNumber}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No forwards available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Squad;
