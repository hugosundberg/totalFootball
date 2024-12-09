import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  useLocation,
  useParams,
  Route,
  Routes,
} from "react-router-dom";
import Squad from "../components/Squad";
import Table from "../components/Table";
import TeamStats from "../components/TeamStats";

interface TeamProps {
  team?: Team;
  handleFetchTeam: (id: number) => void;
  standing?: TeamStanding[];
  squad?: Player[];
}

const Team = ({ team, handleFetchTeam, standing, squad }: TeamProps) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });
  const navLinksRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (id) {
      handleFetchTeam(Number(id));
    }
  }, [id, handleFetchTeam]);

  useEffect(() => {
    const activeLink = navLinksRef.current?.querySelector(".active");
    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink as HTMLElement;
      setBarStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [location]);

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
        <div className="bg-zinc-900 mt-4 p-8 flex flex-col rounded-lg relative">
          <div className="text-white">
            <div className="flex">
              <img src={team.logo} alt={`${team.name} logo`} className="h-14" />
              <div className="ml-4">
                <h2 className="text-white text-2xl">{team.name}</h2>
                <p>{team.country}</p>
              </div>
            </div>
          </div>
          <div className="relative mt-6">
            <div ref={navLinksRef} className="text-white flex gap-10 relative">
              <NavLink
                to={`/team/${id}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 active"
                    : "text-gray-400 hover:text-gray-500"
                }
                end
              >
                <div className="pb-2 px-2">Overview</div>
              </NavLink>
              <NavLink
                to={`/team/${id}/table`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 active"
                    : "text-gray-400 hover:text-gray-500"
                }
              >
                <div className="pb-2 px-2">Table</div>
              </NavLink>
              <NavLink
                to={`/team/${id}/fixtures`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 active"
                    : "text-gray-400 hover:text-gray-500"
                }
              >
                <div className="pb-2 px-2">Matches</div>
              </NavLink>
              <NavLink
                to={`/team/${id}/squad`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 active"
                    : "text-gray-400 hover:text-gray-500"
                }
              >
                <div className="pb-2 px-2">Squad</div>
              </NavLink>
              <NavLink
                to={`/team/${id}/stats`}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 active"
                    : "text-gray-400 hover:text-gray-500"
                }
              >
                <div className="pb-2 px-2">Stats</div>
              </NavLink>
            </div>
            <div
              className="absolute h-1 rounded-md bg-green-700 transition-all duration-300"
              style={{
                left: `${barStyle.left}px`,
                width: `${barStyle.width}px`,
              }}
            />
          </div>
        </div>

        {/* Dynamic Routes */}
        <Routes>
          <Route path="/" element={<p>Team Overview Content</p>} />
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
          <Route path="squad" element={<Squad squad={squad} />} />
          <Route path="stats" element={<TeamStats />} />
        </Routes>
      </div>
    </div>
  );
};

export default Team;
