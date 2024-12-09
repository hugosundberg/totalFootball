import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Player = ({ player, handleFetchPlayer }: PlayerProps) => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      handleFetchPlayer(Number(id));
    }
  }, [id, handleFetchPlayer]);

  if (!player) return;

  console.log(player);

  console.log(player.photo);

  return (
    <div className="flex bg-black h-screen justify-center">
      <div className="bg-zinc-700 h-40 w-1/2 rounded-lg mt-20">
        <img src={player.photo} alt="" />
        <h2>
          {player.firstname} {player.lastname}
        </h2>
      </div>
    </div>
  );
};

export default Player;
