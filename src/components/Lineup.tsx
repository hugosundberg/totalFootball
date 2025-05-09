import field from "../../assets/field.svg";
import fieldVertical from "../../assets/fieldVertical.svg";

const Lineup = ({ fixture }: LineupProps) => {
  if (fixture.lineups === undefined) return null;
  if (fixture.lineups.home === null) return null;
  if (fixture.lineups.away === null) return null;

  const homeLineup = fixture.lineups.home;
  const awayLineup = fixture.lineups.away;

  const groupPlayersByColumn = (
    players: LineupPlayer[],
    reverse: boolean = false,
    totalColumns: number = 0
  ) => {
    if (players[0].player.grid === null) return {};
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

  const playerPosition = (pos: string) => {
    switch (true) {
      case pos === "G":
        return "Goalkeeper";
      case pos === "D":
        return "Defender";
      case pos === "M":
        return "Midfielder";
      case pos === "F":
        return "Forward";
      default:
        return "Unknown";
    }
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

              <p className="text-xs mt-2 text-center w-20">
                {lastName(player.name)}
              </p>
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
      <div className="flex flex-col w-full h-full gap-12 p-4 sm:p-10 z-10">
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
                    {/* HOME TEAM */}
                    {!reverse && (
                      <div className="flex flex-col w-20 items-center">
                        <span className="bg-slate-700 p-2 w-10 rounded-full items-center">
                          <p className="justify-self-center">{player.number}</p>
                        </span>
                        <p className="text-xs mt-2">{lastName(player.name)}</p>
                      </div>
                    )}

                    {/* AWAY TEAM */}
                    {reverse && (
                      <div className="flex flex-col w-40 items-center">
                        <span className="bg-slate-400 p-2 w-10 rounded-full items-center">
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

  const renderPlayersLine = (players: LineupPlayer[], home: boolean) => {
    return players.map((player, index) => {
      const isLastPlayer = index === players.length - 1;
      if (home) {
        return (
          <div key={player.player.id} className="flex flex-col gap-2 px-6">
            <div className="flex flex-col sm:flex-row gap-3 items-center mt-2">
              <p className="w-5 h-5 p-5 bg-slate-700 rounded-full flex items-center justify-center text-white">
                {player.player.number || "?"}
              </p>
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-sm sm:text-base">{player.player.name}</p>
                {player.player.pos !== null && (
                  <p className="text-xs text-slate-400">
                    {playerPosition(player.player.pos)}
                  </p>
                )}
              </div>
            </div>
            {!isLastPlayer && <span className="h-0.5 w-full bg-slate-600" />}
          </div>
        );
      } else {
        return (
          <div key={player.player.id} className="flex flex-col gap-2 px-6">
            <div className="flex flex-col sm:flex-row gap-3 items-center mt-2">
              <p className="w-5 h-5 p-5 bg-slate-400 rounded-full flex items-center justify-center text-white">
                {player.player.number || "?"}
              </p>
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-sm sm:text-base">{player.player.name}</p>
                {player.player.pos !== null && (
                  <p className="text-xs text-slate-400">
                    {playerPosition(player.player.pos)}
                  </p>
                )}
              </div>
            </div>
            {!isLastPlayer && <span className="h-0.5 w-full bg-slate-600" />}
          </div>
        );
      }
    });
  };

  return (
    <>
      {homeLineup.startXI[0].player.grid !== null ? (
        <div className="max-w-[1200px] lg:h-[600px] justify-self-center w-full mt-8 shadow-lg rounded-2xl">
          {/* Header */}
          <div className="flex flex-col h-fit w-full bg-white dark:bg-gray-700 items-center justify-self-center rounded-t-2xl">
            <div className="flex lg:w-11/12 items-center lg:justify-between p-4 text-sm">
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

          <div className="flex flex-col shrink lg:flex-row relative w-full h-full bg-green-700 dark:bg-zinc-900 justify-self-center lg:rounded-b-3xl shadow-xl">
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

          <div className="flex flex-col h-fit w-full bg-white dark:bg-gray-700 items-center justify-self-center rounded-b-2xl lg:hidden">
            <div className="flex justify-between p-4 text-sm sm:text-base">
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
      ) : (
        <>
          <div className="max-w-[1200px] justify-self-center w-full mt-8 shadow-lg rounded-2xl">
            <div className="bg-white dark:bg-zinc-950 rounded-2xl overflow-auto mt-8">
              <div className="flex justify-between p-6 dark:bg-zinc-900 ">
                <img
                  src={fixture.fixture.teams.home.logo}
                  alt=""
                  className="h-10"
                />
                <p className="font-bold text-lg">Lineups</p>
                <img
                  src={fixture.fixture.teams.away.logo}
                  alt=""
                  className="h-10"
                />
              </div>
              <div className="flex justify-between pb-4">
                <div className="w-full">
                  {renderPlayersLine(homeLineup.startXI, true)}
                </div>
                <div className="w-full">
                  {renderPlayersLine(awayLineup.startXI, false)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* BENCH */}
      <div className="flex flex-col items-center bg-white dark:bg-zinc-800 h-fit w-full justify-self-center p-2 sm:p-8 mt-8 lg:mt-24 rounded-2xl max-w-[1200px] shadow-2xl">
        {fixture.lineups.home.coach.name !== null && (
          <>
            <p className="font-bold justify-self-center">Coach</p>
            <div className="flex w-full justify-between mt-2">
              <div className="flex gap-3 items-center">
                <img
                  src={fixture.lineups.home.coach.photo}
                  alt=""
                  className="h-10 rounded-full"
                />
                <p className="text-sm sm:text-base">
                  {fixture.lineups.home.coach.name}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <p className="text-sm sm:text-base">
                  {fixture.lineups.away.coach.name}
                </p>
                <img
                  src={fixture.lineups.away.coach.photo}
                  alt=""
                  className="h-10 rounded-full"
                />
              </div>
            </div>
          </>
        )}
        <p className="font-bold justify-self-center p-6">Substitutes</p>

        <div className="flex w-full gap-4">
          <div className="h-fit w-1/2">
            {fixture.lineups.home.substitutes?.length > 0 ? (
              fixture.lineups.home.substitutes.map((substitute, index) => {
                if (!fixture.lineups?.home.substitutes) return null;
                const isLastSubstitute =
                  index === fixture.lineups.home.substitutes.length - 1;
                return (
                  <div
                    key={substitute.player.id}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 items-center mt-2">
                      <p className="w-5 h-5 p-5 bg-slate-700 rounded-full flex items-center justify-center text-white">
                        {substitute.player.number}
                      </p>
                      <div className="flex flex-col items-center sm:items-start">
                        <p className="text-sm sm:text-base">
                          {substitute.player.name}
                        </p>
                        {substitute.player.pos !== null && (
                          <p className="text-xs text-slate-400">
                            {playerPosition(substitute.player.pos)}
                          </p>
                        )}
                      </div>
                    </div>
                    {!isLastSubstitute && (
                      <span className="h-0.5 w-full bg-slate-600" />
                    )}
                  </div>
                );
              })
            ) : (
              <p>No substitutes available</p>
            )}
          </div>
          <div className="h-fit w-1/2">
            {fixture.lineups.away.substitutes?.length > 0 ? (
              fixture.lineups.away.substitutes.map((substitute, index) => {
                if (!fixture.lineups?.away.substitutes) return null;
                const isLastSubstitute =
                  index === fixture.lineups.away.substitutes.length - 1;
                return (
                  <div
                    key={substitute.player.id}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 items-center mt-2">
                      <p className="w-5 h-5 p-5 bg-slate-400 rounded-full flex items-center justify-center">
                        {substitute.player.number}
                      </p>
                      <div className="flex flex-col items-center sm:items-start">
                        <p className="text-sm sm:text-base">
                          {substitute.player.name}
                        </p>
                        {substitute.player.pos !== null && (
                          <p className="text-xs text-slate-400">
                            {playerPosition(substitute.player.pos)}
                          </p>
                        )}
                      </div>
                    </div>
                    {!isLastSubstitute && (
                      <span className="h-0.5 w-full bg-slate-600" />
                    )}
                  </div>
                );
              })
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
