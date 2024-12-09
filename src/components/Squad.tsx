import { useEffect, useState } from "react";

interface SquadProps {
  squad?: Player[];
}

const Squad = ({ squad }: SquadProps) => {
  const [goalKeepers, setGoalKeepers] = useState<Player[]>([]);
  const [defenders, setDefenders] = useState<Player[]>([]);
  const [midfielders, setMidfielders] = useState<Player[]>([]);
  const [forwards, setForwards] = useState<Player[]>([]);

  useEffect(() => {
    if (squad) {
      // Categorize players by position
      const gk: Player[] = [];
      const def: Player[] = [];
      const mid: Player[] = [];
      const fwd: Player[] = [];

      squad.forEach((player) => {
        if (player.position === "Goalkeeper") {
          gk.push(player);
        } else if (player.position === "Defender") {
          def.push(player);
        } else if (player.position === "Midfielder") {
          mid.push(player);
        } else if (player.position === "Attacker") {
          fwd.push(player);
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
      <div className="bg-zinc-800 mt-4 h-fit p-10 flex flex-col rounded-lg text-white gap-10">
        <p className="font-bold">No squad data available</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 mt-4 h-fit p-10 flex flex-col rounded-lg text-white gap-10">
      <p className="font-bold text-xl">Squad</p>

      <div>
        <h2 className="font-semibold text-lg mb-2 ">Goalkeepers</h2>
        <div className="flex gap-2 flex-wrap">
          {goalKeepers.length > 0 ? (
            goalKeepers.map((player) => (
              <div className="flex w-60 h-20 bg-zinc-700 rounded-md gap-2 p-2 items-center">
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
              <div className="flex w-60 h-20 bg-zinc-700 rounded-md gap-2 p-2 items-center">
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
              <div className="flex w-60 h-20 bg-zinc-700 rounded-md gap-2 p-2 items-center">
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
              <div className="flex w-60 h-20 bg-zinc-700 rounded-md gap-2 p-2 items-center">
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
