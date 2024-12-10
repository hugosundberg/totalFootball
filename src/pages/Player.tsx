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
    <div className="flex dark:bg-black h-screen justify-center dark:text-white">
      <div className="bg-zinc-800 h-fit w-4/5 p-8 rounded-lg mt-20">
        <div className="flex gap-10">
          <img
            src={player.photo}
            alt="player-photo"
            className="h-28 rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="text-3xl">
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
              <p className=" text-xl mt-2">{currentTeam?.currentTeamName}</p>
            </div>
            {currentTeam?.type === "Loan" && (
              <div className="flex items-center mt-2">
                <p> on loan from </p>
                <img
                  src={currentTeam.formerTeamLogo}
                  alt="former team logo"
                  className="h-5 w-5"
                />
              </div>
            )}
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
