import moment from "moment";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Player = ({
  player,
  currentStats,
  handleFetchPlayer,
  currentTeam,
}: PlayerProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleTeamClick = (teamID: number) => {
    navigate(`/team/${teamID}`);
  };

  useEffect(() => {
    if (id) {
      handleFetchPlayer(Number(id));
    }
  }, [id, handleFetchPlayer]);

  const dateConverter = (date: string) => {
    const formattedDate = moment(date).format("MMM D, YYYY");
    return formattedDate;
  };

  if (!player) return;

  return (
    <div className="flex flex-col dark:bg-black min-h-screen dark:text-white sm:items-center">
      <div className="player-header bg-zinc-800 h-fit w-full px-4 py-6 mt-16 sm:rounded-t-2xl sm:mt-20 sm:w-11/12">
        <div className="flex gap-4">
          <img
            src={player.photo}
            alt="player-photo"
            className="h-14 rounded-full sm:h-20"
          />
          <div className="flex flex-col">
            <h2 className="text-md sm:text-3xl">
              {player.firstname} {player.lastname}
            </h2>
            <div
              className="flex gap-2 mt-2 items-center hover:underline hover:cursor-pointer"
              onClick={() => {
                if (currentTeam) handleTeamClick(currentTeam.currentTeamId);
              }}
            >
              <img
                src={currentTeam?.currentTeamLogo}
                alt="team-logo"
                className="h-4 sm:h-8"
              />
              <p className="text-sm sm:text-lg">
                {currentTeam?.currentTeamName}
              </p>
            </div>
            {currentTeam?.type === "Loan" && (
              <div className="flex mt-2 gap-2">
                <img
                  src={currentTeam.formerTeamLogo}
                  alt="former team logo"
                  className="h-4"
                />
                <p className="dark:text-slate-300 text-xs">
                  on loan from {currentTeam.formerTeamName}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="player-info grid grid-cols-2 h-fit gap-y-4 p-4 bg-zinc-900 w-full text-xs sm:w-11/12 sm:rounded-b-2xl">
        <div className="h-fit">
          <p>{player.height}</p>
          <p className="text-slate-400 text-xs mt-1">Height</p>
          <span className="block h-1 w-5/6 bg-slate-800 rounded-full mt-2" />
        </div>
        <div className="h-fit">
          <p>{player.squadNumber}</p>
          <p className="text-slate-400 text-xs mt-1">Shirt</p>
          <span className="block h-1 w-5/6 bg-slate-800 rounded-full mt-2" />
        </div>
        <div className="h-fit">
          <p>{player.age} years</p>
          <p className="text-slate-400 text-xs mt-1">
            {dateConverter(player.birth.date)}
          </p>
          <span className="block h-1 w-5/6 bg-slate-800 rounded-full mt-2" />
        </div>
        <div className="h-fit">
          <div className="flex gap-2 items-center">
            <p>{player.nationality}</p>
            <img
              src={`https://flagsapi.com/${player.countryCode}/flat/64.png`}
              alt=""
              className="h-4"
            />
          </div>
          <p className="text-slate-400 text-xs mt-1">Nationality</p>
          <span className="block h-1 w-5/6 bg-slate-800 rounded-full mt-2" />
        </div>
        <div className="h-fit">
          <p>{player.position}</p>
          <p className="text-slate-400 text-xs mt-1">Position</p>
          <span className="block h-1 w-5/6 bg-slate-800 rounded-full mt-2" />
        </div>
      </div>
      <div className="h-fit w-full bg-zinc-800 items-center p-4">
        <div className="flex gap-1 justify-self-center">
          <p className="justify-self-center text-xl">
            {currentStats?.stats[0].league.name}
          </p>
          <img
            src={currentStats?.stats[0].league.logo}
            alt=""
            className="h-10 bg-white"
          />
        </div>

        {/* GOALKEEPER STATS  ----- Should perhaps be its own component   */}
        <div className="flex flex-wrap gap-4 mt-2 justify-self-center justify-center">
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.appearences}</p>
            <p className="text-xs text-slate-400">Appearences</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.appearences}</p>
            <p className="text-xs text-slate-400">Starts</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].goals.conceded}</p>
            <p className="text-xs text-slate-400">Goals conceded</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].games.minutes}</p>
            <p className="text-xs text-slate-400">Minutes</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].cards.yellow}</p>
            <p className="text-xs text-slate-400">Yellow cards</p>
          </div>
          <div className="flex flex-col items-center w-24">
            <p>{currentStats?.stats[0].cards.red}</p>
            <p className="text-xs text-slate-400">Red Cards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
