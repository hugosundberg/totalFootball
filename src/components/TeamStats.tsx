const TeamStats = ({seasonStats}: TeamStats) => {

  console.log("Team season statistics " + seasonStats);
  


  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black">
      <div className="bg-zinc-800 h-20 w-full">Team Stats</div>
      {seasonStats !== undefined && (
        <div>
          <p>Season stats available</p>
          <p>{seasonStats.form}</p>
        </div>
      )}
    </div>
  );
};

export default TeamStats;
