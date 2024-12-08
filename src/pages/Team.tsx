import { useEffect } from "react";
import { NavLink, useParams, Route, Routes } from "react-router-dom";
import Squad from "../components/Squad";
import Table from "../components/Table";

interface TeamProps {
  team?: Team;
  handleFetchTeam: (id: number) => void;
  standing?: TeamStanding[];
}

const Team = ({ team, handleFetchTeam, standing }: TeamProps) => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      handleFetchTeam(Number(id));
    }
  }, [id, handleFetchTeam]);

  if (!team) {
    return (
      <p className="w-full h-screen flex justify-center items-center text-white dark:bg-black">
        Loading...
      </p>
    );
  }

  return (
    <div className="flex bg-black h-screen justify-center">
      <div className="relative pt-16 bg-black h-full w-full md:lg:max-w-screen-xl">
        {/* Team Header */}
        <div className="bg-zinc-800 mt-4 h-48 p-10 flex flex-row rounded-lg">
          <div className="text-white flex flex-col">
            <div className="flex">
              <img src={team.logo} alt={`${team.name} logo`} className="h-14" />
              <div className="ml-4">
                <h2 className="text-white text-2xl">{team.name}</h2>
                <p>{team.country}</p>
              </div>
            </div>
            <div className="text-white top-0 flex gap-10 pt-10">
              <NavLink
                to={`/team/${id}`}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "text-gray-500"
                }
                end
              >
                Overview
              </NavLink>
              <NavLink
                to={`/team/${id}/table`}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "text-gray-500"
                }
              >
                Table
              </NavLink>
              <NavLink
                to={`/team/${id}/fixtures`}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "text-gray-500"
                }
              >
                Fixtures
              </NavLink>
              <NavLink
                to={`/team/${id}/squad`}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "text-gray-500"
                }
              >
                Squad
              </NavLink>
            </div>
          </div>
        </div>

        {/* Dynamic Routes */}

        <Routes>
          <Route path="/" element={<p>Team Table Content</p>} />
          <Route
            path="table"
            element={
              <Table
                standing={standing}
                handleFetchTeam={handleFetchTeam}
                currentTeam={team}
              />
            }
          />
          <Route path="fixtures" element={<p>Team Fixtures Content</p>} />
          <Route path="squad" element={<Squad />} />
        </Routes>
      </div>
    </div>
  );
};

export default Team;
