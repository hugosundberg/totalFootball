import field from "../../assets/field.svg";

const Lineup = ({ fixture }: LineupProps) => {
  console.log(fixture);

  const homeStartXI = fixture.lineups.home.startXI;
  console.log(homeStartXI[0]);

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
          <div>
            <p>{homeStartXI[0].name}</p>
            {homeStartXI[0].name}
            {homeStartXI[0].name}
            {homeStartXI[0].name}
            {homeStartXI[0].name}
          </div>
          <img src={field} alt="" className="w-full h-full opacity-10 z-0" />
        </div>
      </div>
    </>
  );
};

export default Lineup;
