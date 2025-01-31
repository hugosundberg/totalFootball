import { useNavigate } from "react-router-dom";

interface TableProps {
  standing?: TeamStanding[];
  handleFetchTeam: (id: number) => void;
  currentTeam?: Team;
}

const Table = ({ standing, handleFetchTeam, currentTeam }: TableProps) => {
  const navigate = useNavigate();

  const handleTeamClick = (id: number) => {
    handleFetchTeam(id);
    navigate(`/team/${id}`);
  };

  console.log(standing);

  return (
    <div className="bg-white text-black dark:text-white dark:bg-zinc-800 h-fit w-full pt-3 rounded-2xl overflow-hidden">
      <div className="flex flex-col">
        {standing && (
          <>
            <div className="flex flex-row justify-between px-3 py-2">
              <div>
                <p className="pl-4 w-7 text-center">#</p>
              </div>
              <div className="md:md:w-72 mr-4 md:md:mr-3 flex flex-row gap-7">
                <p>PL</p>
                <p>GD</p>
                <p>PT</p>
                <p className="hidden md:md:block">Form</p>
              </div>
            </div>
          </>
        )}
        {standing && standing.length > 0 ? (
          standing.map((team) => (
            <>
              <div
                key={team.team.id}
                className={`flex flex-row p-3 px-6 hover:cursor-pointer justify-between ${
                  currentTeam?.id === team.team.id
                    ? "bg-blue-100 dark:bg-zinc-900"
                    : "dark:hover:bg-zinc-700"
                }`}
                onClick={() => handleTeamClick(team.team.id)}
              >
                <div className="flex flex-row gap-4">
                  <p className="w-5 text-center">{team.rank}</p>
                  <img
                    src={team.team.logo}
                    alt=""
                    className="h-5 mt-1 w-5 mr-1"
                  />
                  <p>{team.team.name}</p>
                </div>

                <div className="flex flex-row gap-6 md:md:min-w-72">
                  <p className="w-4 mr-2">{team.all.played}</p>
                  <p className="w-4 mr-2 text-center">{team.goalsDiff}</p>
                  <p className="w-4 mr-2 text-center">{team.points}</p>

                  <p className="hidden md:flex">
                    {team.form.split("").map((char, index) => (
                      <span
                        key={index}
                        className={`mx-0.5 w-6 rounded text-center ${
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
                  </p>
                </div>
              </div>
            </>
          ))
        ) : (
          <p className="px-4 pb-4">No standings available</p>
        )}
      </div>
    </div>
  );
};

export default Table;
