interface TeamStats {
  played: number;
}

interface TeamStanding {
  rank: number;
  team: {
    name: string;
    id: number; // Assuming there's a unique ID for each team
  };
  all: TeamStats;
  goalsDiff: number;
  points: number;
  form: string;
}

interface TableProps {
  standing: TeamStanding[];
}

const Table = ({ standing }: TableProps) => {
  return (
    <div className="bg-blue-800 h-full w-1/2">
      <div className="flex flex-col">
        {standing && standing.length > 0 ? (
          standing.map((team) => (
            <div
              key={team.team.id}
              className="flex flex-row p-2 gap-2 hover:cursor-pointer hover:bg-white justify-between"
            >
              <div className="flex flex-row gap-2">
                <p>{team.rank}</p>
                <p>{team.team.name}</p>
              </div>

              <div className="flex flex-row gap-2">
                <p>{team.all.played}</p>
                <p>{team.goalsDiff}</p>
                <p>{team.points}</p>
                <p>{team.form}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No standings available</p>
        )}
      </div>
    </div>
  );
};

export default Table;
