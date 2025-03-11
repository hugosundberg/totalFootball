const PlayerMatchStats = ({ stats }: PlayerMatchStatsProps) => {

  if (!stats) {
    return <div>Loading...</div>;
  }

  console.log("PlayerMatchStats: ", stats);

  return (
    <div className="bg-red-500 w-full h-20">
      <div> hello </div>
    </div>
  );
};

export default PlayerMatchStats;
