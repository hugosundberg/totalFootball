const FixtureList = ({ fixtures }: FixtureListProps) => {
  if (!fixtures) return;

  return (
    <div className="bg-slate-500 w-full h-10">
      {fixtures.map((fixture, index) => (
        <div key={index}>
          {fixture.fixtureInfo?.referee || "Referee not available"}
        </div>
      ))}
    </div>
  );
};

export default FixtureList;
