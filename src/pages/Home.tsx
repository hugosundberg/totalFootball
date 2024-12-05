import "../index.css";

const Home = () => {
  return (
    <>
      <div className="body flex relative pt-10 px-4 top-10 z-0 h-screen bg-black w-full justify-center">
        <div className="content flex w-screen bg-blue-400">
          <div className="league-container left-0 text-white bg-zinc-900 w-60 rounded-2xl overflow-hidden">
            <h2 className="p-4 bg-zinc-800">Top Leagues</h2>
            <div className="flex flex-col gap-4 overflow-hidden">
              <button className="league-btn">Premier League</button>
              <button className="league-btn">La Liga</button>
              <button className="league-btn">Serie A</button>
              <button className="league-btn">Bundesliga</button>
              <button className="league-btn">Ligue 1</button>
            </div>
          </div>
          <div className="flex justify-center ml-4 text-white bg-zinc-900 h-1/2 w-1/2 p-10 rounded-2xl">
            Today
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
