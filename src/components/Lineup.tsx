import field from "../../assets/field.svg";

const Lineup = ({ fixture }: LineupProps) => {
  console.log(fixture);

  const homeLineup = fixture.lineups.home;
  const awayLineup = fixture.lineups.away;

  const renderPlayers = (players: LineupPlayer[]) => {
    return players.map((player) => <p>{player.name}</p>);
  };

  function largestDigitInString(input: string): number {
    if (!/^\d+$/.test(input)) {
      throw new Error("Input must be a string of digits.");
    }

    return Math.max(...input.split("").map(Number));
  }

  const calculateGrid = (linenup: string) => {
    const formattedLinup = linenup.replace(/-/g, "");
    const columns = formattedLinup.length;

    const rows = largestDigitInString(formattedLinup);

    return { columns, rows };
  };

  calculateGrid(homeLineup.formation);
  calculateGrid(awayLineup.formation);

  return (
    <>
      <div className="flex flex-col h-fit w-11/12 bg-gray-700 items-center justify-self-center">
        <div className="flex p-4 justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={fixture.fixture.teams.home.logo} alt="" className="h-8" />
            <p>{fixture.fixture.teams.home.name}</p>
            <p>{fixture.lineups.home.formation}</p>
          </div>
          <div className="flex items-center gap-4">
            <p>{fixture.lineups.away.formation}</p>
            <p>{fixture.fixture.teams.away.name}</p>
            <img src={fixture.fixture.teams.away.logo} alt="" className="h-8" />
          </div>
        </div>
        <div className="h-fit flex justify-center items-center bg-zinc-900">
          <img src={field} alt="" className="w-full h-full opacity-10 z-0" />
        </div>

        {renderPlayers(fixture.lineups.home.startXI)}
      </div>

      <div className="bg-slate-600 w-full h-fit p-5">
        <div
          className={`grid grid-cols-${calculateGrid(homeLineup.formation).columns + 1} grid-rows-1 gap-2`}
        >
          <span className="h-5 w-5 rounded-full bg-white" />
          <span className="h-5 w-5 rounded-full bg-white" />
          <span className="h-5 w-5 rounded-full bg-white" />
          <span className="h-5 w-5 rounded-full bg-white" />
          <span className="h-5 w-5 rounded-full bg-white" />
          <span className="h-5 w-5 rounded-full bg-white" />
          <span className="h-5 w-5 rounded-full bg-white" />
        </div>
      </div>
    </>
  );
};

export default Lineup;
