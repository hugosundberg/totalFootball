import "../index.css";

const Home = () => {
  return (
    <>
      <div className="body flex relative pt-10 px-4 top-10 z-0 h-screen bg-black w-full justify-center">
        <div className="content flex w-screen bg-black max-w-screen-xl">
          <div className="league-container hidden md:md:flex flex-col left-0 text-white bg-zinc-900 w-60 h-fit rounded-2xl overflow-hidden">
            <h2 className="p-4 bg-zinc-800">Top Leagues</h2>
            <div className="flex flex-col gap-4 overflow-hidden">
              <button className="league-btn">Premier League</button>
              <button className="league-btn">La Liga</button>
              <button className="league-btn">Serie A</button>
              <button className="league-btn">Bundesliga</button>
              <button className="league-btn">Ligue 1</button>
            </div>
          </div>
          <div className="flex justify-center ml-4 text-white bg-zinc-900 h-1/2 w-full p-10 rounded-2xl">
            Today
          </div>
          <div className="hidden md:lg:flex gap-4 h-fit ml-4 text-white bg-zinc-900 w-1/4 rounded-2xl flex-col overflow-hidden">
            <h2 className="bg-zinc-800 p-4">Premier League</h2>
            <div className="flex flex-col gap-3 ml-4 pb-3">
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
              <p>Team 1</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
