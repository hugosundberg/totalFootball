import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ standing, handleFetchTeam, currentTeam }: TableProps) => {
  const navigate = useNavigate();
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableWidth, setTableWidth] = useState(0);

  useEffect(() => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.clientWidth);
    }
  }, [tableWidth]);
  
  const handleTeamClick = (id: number) => {
    handleFetchTeam(id);
    navigate(`/team/${id}`);
  };  

  console.log(standing);

  return (
    <div 
    ref={tableRef}
    className="bg-white text-black dark:text-white dark:bg-zinc-800 h-fit w-full pt-3 pb-2 rounded-2xl overflow-hidden">
      <div className="flex flex-col">
        {standing && (
          <>
            <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1.25fr_1fr_1fr] md:grid-cols-[1.2fr_1.25fr_0.75fr] lg:grid-cols-[2.5fr_2fr_1fr]">
              <div>
                <p className="">#</p>
              </div>
              <div className="grid grid-cols-[1fr_1fr_1fr_1fr] sm:grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] pr-2 text-center">
                <p>PL</p>
                <p className="hidden md:block">W</p>
                <p className="hidden lg:block">D</p>
                <p className="hidden md:block">L</p>
                <p>+/-</p>
                <p>GD</p>
                <p>PT</p>
              </div>
              <p className="hidden sm:block text-left">Form</p>
            </div>
          </>
        )}
        {standing && standing.length > 0 ? (
          standing.map((team) => (
            <>
              <div
                key={team.team.id}
                className={`grid grid-cols-[1fr_1fr] sm:grid-cols-[1.25fr_1fr_1fr] md:grid-cols-[1.2fr_1.25fr_0.75fr] lg:grid-cols-[2.5fr_2fr_1fr] py-2 hover:cursor-pointer ${
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
                        ? "border-l-[5px] border-green-700"
                        : team.description === "UEFA Europa League"
                          ? "border-l-[5px] border-blue-700"
                          : team.description === "Relegation"
                            ? "border-l-[5px] border-red-600"
                            : ""
                    }`}
                  />
                  <p className=" text-center">{team.rank}</p>
                  <img
                    src={team.team.logo}
                    alt=""
                    className="h-5 mt-1 w-5 mr-1"
                  />
                  <p>{team.team.name}</p>
                </div>

                <div className="grid pr-2 text-center">
                  <div className="grid grid-cols-[1fr_1fr_1fr_1fr] sm:grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] text-center">
                    <p>{team.all.played}</p>
                    <p className="hidden md:block">{team.all.win}</p>
                    <p className="hidden lg:block">{team.all.draw}</p>
                    <p className="hidden md:block">{team.all.lose}</p>
                    <p>
                      {team.all.goals.for}-{team.all.goals.against}
                    </p>
                    <p>{team.goalsDiff}</p>
                    <p>{team.points}</p>
                  </div>
                </div>
                <div className="pr-2">
                  <p className="hidden sm:flex">
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
            </>
          ))
        ) : (
          <p className="px-4 pb-4">No standings available</p>
        )}
      </div>
      <p>{tableWidth}</p>
    </div>
  );
};

export default Table;
