import { useNavigate } from "react-router-dom";

interface TeamStats {
  played: number;
}

interface TeamStanding {
  rank: number;
  team: {
    name: string;
    id: number;
    logo: string;
  };
  all: TeamStats;
  goalsDiff: number;
  points: number;
  form: string;
}

interface TableProps {
  standing: TeamStanding[];
  handleFetchTeam: (id: number) => void;
}

const Table = ({ standing, handleFetchTeam }: TableProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black dark:text-white dark:bg-slate-800 h-fit w-full pt-3 rounded-2xl overflow-hidden">
      <div className="flex flex-col">
        {standing && (
          <>
            <div className="flex flex-row justify-between">
              <div>
                <p className="pl-4 w-7 text-center">#</p>
              </div>
              <div className="md:md:w-60 mr-4 md:md:mr-3 flex flex-row gap-3">
                <p>PL</p>
                <p>GD</p>
                <p>PT</p>
                <p className="hidden md:md:block">Form</p>
              </div>
            </div>
          </>
        )}
        {standing && standing.length > 0 ? (
          standing.map((team, index) => (
            <>
              {index !== standing.length && (
                <span className="w-full bg-slate-200 dark:bg-slate-700 h-0.5" />
              )}
              <div
                key={team.team.id}
                className="flex flex-row p-3 hover:cursor-pointer hover:bg-slate-100  dark:hover:bg-slate-700 justify-between"
                onClick={() => handleFetchTeam(team.team.id)}
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

                <div className="flex flex-row gap-2 md:md:w-60">
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
