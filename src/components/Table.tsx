import { useNavigate } from "react-router-dom";

const Table = ({
  standing = [],
  handleFetchTeam,
  currentTeam,
}: TableProps & { currentTeam: number }) => {
  const navigate = useNavigate();

  const handleTeamClick = (id: number) => {
    handleFetchTeam(id);
    navigate(`/team/${id}`);
  };

  console.log(currentTeam.id);

  
  

  return (
    <div className="flex-col w-full bg-zinc-900 rounded-2xl overflow-auto">
      <div className="flex w-full justify-between bg-zinc-800 p-4">
        <div className="w-5 flex justify-center">#</div>
        <div className="flex gap-4">
          <p className="w-10 flex justify-center">PL</p>
          <p className="hidden lg:flex w-10 justify-center">W</p>
          <p className="hidden lg:flex w-10 justify-center">D</p>
          <p className="hidden lg:flex w-10 justify-center">L</p>
          <p className="w-10 flex justify-center">GD</p>
          <p className="w-10 flex justify-center">PTS</p>
          <p className="hidden sm:flex w-36 mr-2">Form</p>
        </div>
      </div>
      {standing.map((team) => (
        <div
          key={team.team.id}
          className={`flex w-full justify-between items-center py-2 px-4 hover:cursor-pointer hover:bg-zinc-700 ${
            currentTeam && currentTeam === team.team.id ? "bg-zinc-700" : ""
          }`}
          onClick={() => handleTeamClick(team.team.id)}
        >
          <div className="flex items-center gap-4 w-full">
            <div className="w-5 flex justify-center">{team.rank}</div>
            <div className="flex items-center gap-4 w-full">
              <img
                src={team.team.logo}
                className="h-5 w-5 object-contain"
                alt=""
              />
              {team.team.name}
            </div>
          </div>
          <div className="flex gap-4">
            <p className="w-10 flex justify-center">{team.all.played}</p>
            <p className="hidden lg:flex w-10 justify-center">{team.all.win}</p>
            <p className="hidden lg:flex w-10 justify-center">{team.all.draw}</p>
            <p className="hidden lg:flex w-10 justify-center">{team.all.lose}</p>
            <p className="w-10 flex justify-center">{team.goalsDiff}</p>
            <p className="w-10 flex justify-center">{team.points}</p>
            <div className="hidden sm:flex gap-2 ">
              {team.form.split("").map((char, index) => (
                <span
                  key={index}
                  className={`w-6 rounded text-center ${
                    char === "L"
                      ? "bg-red-600 text-white"
                      : char === "W"
                        ? "bg-green-600 text-white"
                        : char === "D"
                          ? "bg-gray-500 text-white"
                          : ""
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
