import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Squad from "../components/Squad";

interface TeamProps {
  team?: Team;
  handleFetchTeam: (id: number) => void;
}

const Team = ({ team, handleFetchTeam }: TeamProps) => {
  if (!team) {
    return <p className="w-full h-screen dark:bg-black">Loading</p>;
  }

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      handleFetchTeam(Number(id));
    }
  }, [id]);

  return (
    <>
      <div className="flex bg-black h-screen justify-center ">
        <div className="relative pt-16 bg-black h-full w-full md:lg:max-w-screen-xl">
          <div className="bg-zinc-800 mt-4 h-48 p-10 flex flex-row rounded-lg">
            <div className="text-white flex flex-col">
              <div className="flex">
                <img src={team.logo} alt="" className="h-14" />
                <div className="ml-4">
                  <h2 className="text-white text-2xl">{team.name}</h2>
                  <p>{team.country}</p>
                </div>
              </div>
              <div className="text-white top-0 flex gap-10 pt-10">
                <button>Table</button>
                <button>Teams</button>
                <button>Matches</button>
                <button>Stats</button>
              </div>
            </div>
          </div>
          <div className="bg-zinc-800 mt-4 h-48 p-10 flex flex-row rounded-lg text-white">
            <p>Matches</p>
            <div className="text-white top-0 flex gap-10 pt-10">
              <button>Table</button>
              <button>Teams</button>
              <button>Matches</button>
              <button>Stats</button>
            </div>
          </div>
          <Squad />
        </div>
      </div>
    </>
  );
};

export default Team;
