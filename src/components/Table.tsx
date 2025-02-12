import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ standing, handleFetchTeam, currentTeam }: TableProps) => {
  const navigate = useNavigate();
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableWidth, setTableWidth] = useState(0);

  useEffect(() => {
    const updateTableWidth = () => {
      if (tableRef.current) {
        setTableWidth(tableRef.current.clientWidth);
      }
    };

    updateTableWidth(); // Initial width
    window.addEventListener("resize", updateTableWidth);

    return () => {
      window.removeEventListener("resize", updateTableWidth);
    };
  }, []);

  const handleTeamClick = (id: number) => {
    handleFetchTeam(id);
    navigate(`/team/${id}`);
  };

  console.log(standing);

  return (
    <div
      ref={tableRef}
      className="bg-white text-black dark:text-white dark:bg-zinc-800 h-fit w-full pt-3 pb-2 rounded-2xl overflow-hidden"
    >
      <div className="flex flex-col">
        {standing && (
          <>
            <div
              className={`grid grid-cols-[1fr_1fr] ${
                tableWidth > 800
                  ? "grid-cols-[1.2fr_2fr_0.8fr]"
                  : tableWidth > 710
                    ? "grid-cols-[1.2fr_1fr_0.8fr]"
                    : tableWidth > 640
                      ? "grid-cols-[1fr_1fr_1fr]"
                      : "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
              } `}
            >
              <div>
                <p className="ml-4">#</p>
              </div>
              <div
                className={`grid grid-cols-[1fr_1fr_1fr_1fr] text-center pr-2 ${
                  tableWidth > 800
                    ? "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
                    : tableWidth > 710
                      ? "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
                      : tableWidth > 640
                        ? "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
                        : "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
                }`}
              >
                <p>PL</p>
                {tableWidth > 800 && <p>W</p>}
                {tableWidth > 800 && <p>D</p>}
                {tableWidth > 800 && <p>L</p>}
                <p>+/-</p>
                <p>GD</p>
                <p>PT</p>
              </div>
              {tableWidth > 640 && (
                <p className="hidden sm:block text-left">Form</p>
              )}
            </div>
          </>
        )}
        {standing && standing.length > 0 ? (
          standing.map((team) => (
            <div
              key={team.team.id}
              className={`grid grid-cols-[1fr_1fr] py-2 hover:cursor-pointer ${
                tableWidth > 800
                  ? "grid-cols-[1.2fr_2fr_0.8fr]"
                  : tableWidth > 710
                    ? "grid-cols-[1.2fr_1fr_0.8fr]"
                    : tableWidth > 640
                      ? "grid-cols-[1fr_1fr_1fr]"
                      : "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
              }  ${
                currentTeam?.id === team.team.id
                  ? "bg-blue-100 dark:bg-zinc-900"
                  : "dark:hover:bg-zinc-700"
              }`}
              onClick={() => handleTeamClick(team.team.id)}
            >
              <div className="grid grid-cols-[6px_30px_30px_1fr] ">
                <span
                  className={`h-20px w-1 ${
                    team.description === "Champions League"
                      ? "border-l-[5px] border-green-400 dark:border-green-700"
                      : team.description === "UEFA Europa League"
                        ? "border-l-[5px] border-blue-400 dark:border-blue-700"
                        : team.description === "Relegation"
                          ? "border-l-[5px] border-red-500 dark:border-red-600"
                          : ""
                  }`}
                />
                <p className=" text-center">{team.rank}</p>
                <div className="flex items-center">
                  <img
                    src={team.team.logo}
                    alt=""
                    className="h-5 w-5 flex justify-self-center"
                  />
                </div>
                <p>{team.team.name}</p>
              </div>

              <div className="grid pr-2 text-center">
                <div
                  className={`grid grid-cols-[1fr_1fr_1fr_1fr] ${
                    tableWidth > 800
                      ? "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
                      : tableWidth > 710
                        ? "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
                        : tableWidth > 640
                          ? "grid-cols-[1fr_1fr_1fr_1fr]"
                          : ""
                  }`}
                >
                  <p>{team.all.played}</p>
                  {tableWidth > 800 && <p>{team.all.win}</p>}
                  {tableWidth > 800 && <p>{team.all.draw}</p>}
                  {tableWidth > 800 && <p>{team.all.lose}</p>}
                  <p>
                    {team.all.goals.for}-{team.all.goals.against}
                  </p>
                  <p>{team.goalsDiff}</p>
                  <p>{team.points}</p>
                </div>
              </div>
              <div className="pr-2">
                <p
                  className={`hidden ${
                    tableWidth > 640 ? "sm:flex" : "hidden"
                  }`}
                >
                  {team.form.split("").map((char, index) => (
                    <span
                      key={index}
                      className={`mx-1 w-6 rounded text-center ${
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
          ))
        ) : (
          <p className="px-4 pb-4">No standings available</p>
        )}
      </div>
    </div>
  );
};

export default Table;
