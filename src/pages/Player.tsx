import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Player = ({ player, handleFetchPlayer, currentTeam }: PlayerProps) => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      handleFetchPlayer(Number(id));
    }
  }, [id, handleFetchPlayer]);

  if (!player) return;

  return (
    <div className="flex bg-black h-screen justify-center">
      <div className="bg-zinc-800 h-fit w-4/5 p-8 rounded-lg mt-20">
        <div className="flex gap-10">
          <img
            src={player.photo}
            alt="player-photo"
            className="h-28 rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="dark:text-white text-3xl">
              {player.firstname} {player.lastname}
            </h2>
            <div
              className="flex gap-2 mt-2 items-center
            "
            >
              <img
                src={currentTeam?.currentTeamLogo}
                alt="team-logo"
                className="h-8 w-8"
              />
              <p className="dark:text-white text-xl mt-2">
                {currentTeam?.currentTeamName}
              </p>
            </div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
