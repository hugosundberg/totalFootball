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

  return (
    <div className="flex-col w-full">
      <div className="flex w-full justify-between">
        <div>#</div>
        <div className="flex gap-4">
          <p>PL</p>
          <p>W</p>
          <p>D</p>
          <p>L</p>
          <p>GD</p>
          <p>PTS</p>
          <p>Form</p>
          <p>Next</p>
        </div>
      </div>
      {standing.map((team) => (
        <div
          key={team.team.id}
          className={`flex w-full justify-between items-center py-2 border-b border-gray-200 ${
            currentTeam && currentTeam === team.team.id ? "bg-gray-100" : ""
          }`}
          onClick={() => handleTeamClick(team.team.id)}
        >
          <div className="flex items-center gap-4">
            <div className="w-5 flex justify-center">{team.rank}</div>
            <img src={team.team.logo} className="h-5 w-5 object-contain" alt="" />
            {team.team.name}
          </div>
          <div className="flex gap-4">
            <p>{team.all.played}</p>
            <p>{team.all.win}</p>
            <p>{team.all.draw}</p>
            <p>{team.all.lose}</p>
            <p>{team.goalsDiff}</p>
            <p>{team.points}</p>
            <p>{team.form}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
