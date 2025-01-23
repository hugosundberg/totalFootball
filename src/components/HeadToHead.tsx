const HeadToHead = ({ fixture }: HeadToHeadProps) => {
  return (
    <div className="justify-self-center w-11/12 bg-slate-800 p-4 rounded-2xl mt-5">
      <h1 className="justify-self-center">Head To Head</h1>
      <div>
        <div className="flex justify-between">
          {fixture.teams.home.id}
          <p>{fixture.teams.home.name}</p>
          <p>{fixture.teams.away.name}</p>
        </div>
      </div>
      <p>{}</p>
    </div>
  );
};
export default HeadToHead;
