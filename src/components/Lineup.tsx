import field from "../../assets/field.svg";
import fieldVertical from "../../assets/fieldVertical.svg";

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

  const renderPlayersFlex = (
    groupedPlayers: Record<number, LineupPlayer[]>,
    reverse: boolean
  ) => {
    return (
      <div className="flex flex-col w-full h-full gap-16 p-6 z-50">
        {Object.entries(groupedPlayers).map(([col, playersInColumn]) => {
          return (
            <div
              key={`column-${col}`}
              className="flex flex-row justify-around w-full h-1/2 "
            >
              {playersInColumn.map((player) => {
                if (!player || !player.grid) {
                  console.warn(
                    "Skipping invalid player during render:",
                    player
                  );
                  return null;
                }

                let [, gridRow] = player.grid.split(":").map(Number);

                if (!reverse)
                  gridRow = reverseNumber(gridRow, playersInColumn.length);

                return (
                  <div
                    key={player.id}
                    className="p-2 rounded-full items-center w-full"
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
                      <div className="flex flex-col items-center">
                        <span className="bg-slate-400 p-2 w-10 rounded-full items-center">
                          <p className="justify-self-center">{player.number}</p>
                        </span>
                        <p className="text-xs mt-2">{lastName(player.name)}</p>
                      </div>
                    )}

                    {!reverse && (
                      <div className="flex flex-col w-40 items-center">
                        <span className="bg-slate-700 p-2 w-10 rounded-full items-center">
                          <p className="justify-self-center">{player.number}</p>
                        </span>
                        <p className="text-xs mt-2">{lastName(player.name)}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
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
      <div className="max-w-[1200px] lg:h-[600px] justify-self-center w-full mt-8">
        {/* Header */}
        <div className="flex flex-col h-fit w-full bg-gray-700 items-center justify-self-center rounded-t-2xl">
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
            <div className="items-center gap-4 hidden lg:flex">
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
        <div className="flex flex-col shrink lg:flex-row relative w-full h-full bg-zinc-900 justify-self-center lg:rounded-b-3xl">
          <div
            className="absolute inset-0 bg-center lg:hidden opacity-10 z-0"
            style={{
              backgroundImage: `url(${fieldVertical})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <img
            src={field}
            alt="Field"
            className="absolute opacity-10 w-full h-full hidden lg:block"
          />
          <img
            src={fieldVertical}
            alt="Field"
            className="absolute opacity-10 w-auto h-[800px] mt-20 hidden lg:hidden"
          />

          {/* Home Team */}

          <div
            className="relative w-1/2 hidden lg:grid"
            style={{
              gridTemplateColumns: `repeat(${Object.keys(groupedPlayersHome).length}, 1fr)`,
              height: "100%",
              padding: "30px",
            }}
          >
            {renderPlayersOnGrid(groupedPlayersHome, false)}
          </div>

          <div className="flex w-full h-1/2 lg:hidden">
            {renderPlayersFlex(groupedPlayersHome, false)}
          </div>

          {/* Away Team */}
          <div
            className="relative w-1/2 hidden lg:grid"
            style={{
              gridTemplateColumns: `repeat(${totalColumnsAway}, 1fr)`,
              height: "100%",
              padding: "30px",
            }}
          >
            {renderPlayersOnGrid(groupedPlayersAway, true)}
          </div>

          <div className="flex w-full h-1/2 lg:hidden">
            {renderPlayersFlex(groupedPlayersAway, true)}
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col h-fit w-full bg-gray-700 items-center justify-self-center rounded-b-2xl lg:hidden">
          <div className="flex justify-between p-4 gap-20">
            <div className="flex items-center gap-4">
              <img
                src={fixture.fixture.teams.away.logo}
                alt=""
                className="h-8"
              />
              <p>{fixture.fixture.teams.away.name}</p>
              <p>{awayLineup.formation}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center bg-green-800 h-fit w-4/6 justify-self-center p-4 mt-24 rounded-2xl">
        <div className="grid grid-cols-3 w-full">
          <p>{fixture.lineups.home.coach.name}</p>
          <p className="font-bold justify-self-center">Coach</p>
          <p className="justify-self-end">{fixture.lineups.away.coach.name}</p>
        </div>
        <p className="font-bold justify-self-center mt-8">Substitutes</p>
        <div className="flex justify-between w-full">
          <div className="h-fit">
            {fixture.lineups.home.substitutes?.length > 0 ? (
              fixture.lineups.home.substitutes.map((substitute) => (
                <div key={substitute.player.id} className="flex gap-2">
                  <p>{substitute.player.number}</p>
                  <p>{substitute.player.name}</p>
                  <p>{substitute.player.pos}</p>
                </div>
              ))
            ) : (
              <p>No substitutes available</p>
            )}
          </div>
          <div className="h-fit">
            {fixture.lineups.away.substitutes?.length > 0 ? (
              fixture.lineups.away.substitutes.map((substitute) => (
                <div
                  key={substitute.player.id}
                  className="flex justify-end gap-2"
                >
                  <p>{substitute.player.name}</p>
                  <p>{substitute.player.pos}</p>
                  <p>{substitute.player.number}</p>
                </div>
              ))
            ) : (
              <p>No substitutes available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lineup;
