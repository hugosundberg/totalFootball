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
import FixtureList from "../components/FixtureList";
import TeamOverview from "../components/TeamOverview";

const Team = ({
  team,
  handleFetchTeam,
  standing,
  squad,
  handleFetchPlayer,
  fixtures,
  handleMatchClick,
  seasonStats,
}: TeamProps) => {
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
    <div className="flex w-full dark:text-white dark:bg-black h-full justify-center">
      <div className="relative pt-16 dark:bg-black h-full w-full md:lg:max-w-screen-xl">
        {/* Team Header */}
        <div className="dark:bg-zinc-900 p-4 sm:p-8 flex flex-col w-full relative sm:rounded-2xl sm:mt-4 sm:w-11/12 sm:justify-self-center">
          <div className="flex">
            <img
              src={team.logo}
              alt={`${team.name} logo`}
              className="h-10 sm:h-14"
            />
            <div className="ml-4">
              <h2 className="text-lg sm:text-2xl">{team.name}</h2>
              <p className="text-xs sm:text-lg">{team.country}</p>
            </div>
          </div>

          <div className="relative mt-6">
            <div
              ref={navLinksRef}
              className="flex gap-2 relative text-sm sm:text-lg"
            >
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
                    ? "text-green-700 active hidden sm:flex"
                    : "text-gray-400 hover:text-gray-500 hidden sm:flex"
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
            {/* DISPLAY IF SCREEN SIZE >= small */}
            <div
              className="absolute h-1 rounded-md bg-green-700 transition-all duration-300 hidden sm:block"
              style={{
                left: `${barStyle.left}px`,
                width: `${barStyle.width}px`,
              }}
            />
          </div>
        </div>

        {/* Dynamic Routes */}
        <div className="flex w-full sm:w-11/12 sm:mt-4 justify-self-center">
          <Routes>
            <Route path="/" element={<TeamOverview team={team} />} />
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
            <Route
              path="fixtures"
              element={
                <FixtureList
                  fixtures={fixtures}
                  teamID={team.id}
                  handleMatchClick={handleMatchClick}
                />
              }
            />
            <Route
              path="squad"
              element={
                <Squad squad={squad} handlePlayerClick={handleFetchPlayer} />
              }
            />
            <Route path="stats" element={<TeamStats />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Team;
