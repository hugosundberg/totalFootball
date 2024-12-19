import field from "../../assets/field.svg";

const Lineup = ({ fixture }: LineupProps) => {
  const homeLineup = fixture.lineups.home;
  const awayLineup = fixture.lineups.away;

  const groupPlayersByColumn = (
    players: LineupPlayer[],
    reverse: boolean = false,
    totalColumns: number = 0
  ) => {
    const columnMap: Record<number, LineupPlayer[]> = {};

    players.forEach(({ player }: any) => {
      if (!player || !player.grid) {
        console.warn("Skipping invalid player:", player);
        return;
      }

      const [col] = player.grid.split(":").map(Number);

      const effectiveColumn =
        reverse && totalColumns > 0 ? totalColumns + 1 - col : col;

      if (!columnMap[effectiveColumn]) {
        columnMap[effectiveColumn] = [];
      }
      columnMap[effectiveColumn].push(player);
    });

    return columnMap;
  };

  const lastName = (name: string) => {
    const nameParts = name.split(" ");
    return nameParts.slice(1).join(" ") || name;
  };

  const reverseNumber = (number: number, rows: number) => {
    let reverseNumber = number;

    if (number === rows) {
      reverseNumber = 1;
    } else if (number === rows - 1) {
      reverseNumber = 2;
    } else if (number === rows - 2) {
      reverseNumber = 3;
    } else if (number === rows - 3) {
      reverseNumber = 4;
    } else if (number === rows - 4) {
      reverseNumber = 5;
    }

    return reverseNumber;
  };

  reverseNumber(1, 5);

  const renderPlayersOnGrid = (
    groupedPlayers: Record<number, LineupPlayer[]>,
    reverse: boolean
  ) => {
    const columns = Object.entries(groupedPlayers);

    return columns.map(([col, playersInColumn]) => (
      <div
        key={`column-${col}`}
        style={{
          gridColumn: Number(col),
          display: "grid",
          gridTemplateRows: `repeat(${playersInColumn.length}, 1fr)`,
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        {playersInColumn.reverse().map((player) => {
          if (!player || !player.grid) {
            console.warn("Skipping invalid player during render:", player);
            return null;
          }

          let [, gridRow] = player.grid.split(":").map(Number);

          if (reverse) gridRow = reverseNumber(gridRow, playersInColumn.length);

          return (
            <div
              key={player.id}
              style={{
                gridRow,
                color: "white",
                height: "50px",
                width: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {reverse && (
                <span className="bg-slate-400 p-2 w-10 rounded-full items-center">
                  <p className="justify-self-center">{player.number}</p>
                </span>
              )}

              {!reverse && (
                <span className="bg-slate-700 p-2 w-10 rounded-full items-center">
                  <p className="justify-self-center">{player.number}</p>
                </span>
              )}

              <p className="text-xs mt-2">{lastName(player.name)}</p>
            </div>
          );
        })}
      </div>
    ));
  };

  const groupedPlayersHome = groupPlayersByColumn(homeLineup.startXI);

  const totalColumnsAway = Object.keys(
    groupPlayersByColumn(awayLineup.startXI)
  ).length;
  const groupedPlayersAway = groupPlayersByColumn(
    awayLineup.startXI,
    true,
    totalColumnsAway
  );

  return (
    <>
      <div className="max-w-[1200px] h-[700px] justify-self-center w-11/12">
        {/* Header */}
        <div className="flex flex-col h-fit w-full bg-gray-700 items-center justify-self-center">
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
            className="w-full h-full object-cover opacity-10 absolute"
          />
          {/* Home Team */}
          <div
            className="relative grid"
            style={{
              gridTemplateColumns: `repeat(${Object.keys(groupedPlayersHome).length}, 1fr)`,
              width: "50%",
              height: "100%",
              padding: "30px",
            }}
          >
            {renderPlayersOnGrid(groupedPlayersHome, false)}
          </div>
          {/* Away Team */}
          <div
            className="relative grid"
            style={{
              gridTemplateColumns: `repeat(${totalColumnsAway}, 1fr)`,
              width: "50%",
              height: "100%",
              padding: "30px",
            }}
          >
            {renderPlayersOnGrid(groupedPlayersAway, true)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lineup;
