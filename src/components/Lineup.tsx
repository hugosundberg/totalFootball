import field from "../../assets/field.svg";

const Lineup = ({ fixture }: LineupProps) => {
  const homeLineup = fixture.lineups.home;
  const awayLineup = fixture.lineups.away;

  // Group players by column based on their grid position
  const groupPlayersByColumn = (players: LineupPlayer[]) => {
    const columnMap: Record<number, LineupPlayer[]> = {};

    players.forEach(({ player }) => {
      if (!player || !player.grid) {
        console.warn("Skipping invalid player:", player);
        return; // Skip if player or grid is undefined
      }

      const [col] = player.grid.split(":").map(Number); // Extract column
      if (!columnMap[col]) {
        columnMap[col] = [];
      }
      columnMap[col].push(player);
    });

    return columnMap;
  };

  const lastName = (name: string) => {
    const lastName = name.split(" ");

    return lastName[1];
  };

  // Render players dynamically based on the grouped columns
  const renderPlayersOnGrid = (
    groupedPlayers: Record<number, LineupPlayer[]>
  ) => {
    return Object.entries(groupedPlayers).map(([col, playersInColumn]) => (
      <div
        key={`column-${col}`}
        style={{
          gridColumn: Number(col),
          display: "grid",
          gridTemplateRows: `repeat(${playersInColumn.length}, 1fr)`,
          justifyItems: "center", // Center align players within each column
          alignItems: "center",
        }}
      >
        {playersInColumn.map((player) => {
          if (!player || !player.grid) {
            console.warn("Skipping invalid player during render:", player);
            return null;
          }

          return (
            <div
              key={player.id}
              style={{
                color: "white",
                height: "50px",
                width: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="bg-slate-400 p-2 w-10 rounded-full items-center">
                <p className="justify-self-center">{player.number}</p>
              </span>
              <p className="text-xs mt-2">{lastName(player.name)}</p>
            </div>
          );
        })}
      </div>
    ));
  };

  const groupedPlayersHome = groupPlayersByColumn(homeLineup.startXI);
  const groupedPlayersAway = groupPlayersByColumn(awayLineup.startXI);

  return (
    <>
      <div className="max-w-[1200px] h-[700px] justify-self-center w-11/12">
        {/* Header */}
        <div className="flex flex-col h-fit w-11/12 bg-gray-700 items-center justify-self-center">
          <div className="flex justify-between p-4 gap-20">
            <div className="flex items-center gap-4">
              <img
                src={fixture.fixture.teams.home.logo}
                alt=""
                className="h-8"
              />
              <p>{fixture.fixture.teams.home.name}</p>
              <p>{homeLineup.formation}</p>
            </div>
            <div className="flex items-center gap-4">
              <p>{fixture.lineups.away.formation}</p>
              <p>{fixture.fixture.teams.away.name}</p>
              <img
                src={fixture.fixture.teams.away.logo}
                alt=""
                className="h-8"
              />
            </div>
          </div>
        </div>

        {/* Field */}
        <div className="flex relative w-full h-full bg-zinc-900 justify-self-center">
          <img
            src={field}
            alt="Field"
            className="w-full h-full opacity-10 absolute"
          />
          <div
            className="relative grid"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Object.keys(groupedPlayersHome).length}, 1fr)`,
              width: "50%",
              height: "100%",
              padding: "30px",
            }}
          >
            {renderPlayersOnGrid(groupedPlayersHome)}
          </div>
          <div
            className="relative grid"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Object.keys(groupedPlayersHome).length}, 1fr)`,
              width: "50%",
              height: "100%",
              padding: "30px",
            }}
          >
            {renderPlayersOnGrid(groupedPlayersAway)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lineup;
