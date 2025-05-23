import "../index.css";
import Table from "../components/Table";

const Home = ({ standing, setCurrentLeague, handleFetchTeam }: any) => {
  return (
    <div className="body flex relative pt-10 px-4 top-10 z-0 h-screen bg-slate-200 dark:bg-black w-full justify-center">
      <div className="content flex w-screen max-w-screen-xl">
        <div className="league-container hidden md:md:flex flex-col left-0 text-white bg-white dark:bg-zinc-900 w-60 h-fit rounded-2xl overflow-hidden shadow-lg">
          <h2 className="px-4 py-2 font-semibold text-black dark:text-white dark:bg-zinc-800">
            Top Leagues
          </h2>
          <div className="flex flex-col overflow-hidden">
            <button className="league-btn" onClick={() => setCurrentLeague(39)}>
              Premier League
            </button>
            <button
              className="league-btn"
              onClick={() => setCurrentLeague(140)}
            >
              La Liga
            </button>
            <button
              className="league-btn"
              onClick={() => setCurrentLeague(135)}
            >
              Serie A
            </button>
            <button className="league-btn" onClick={() => setCurrentLeague(78)}>
              Bundesliga
            </button>
            <button className="league-btn" onClick={() => setCurrentLeague(61)}>
              Ligue 1
            </button>
          </div>
        </div>
        <div className="flex justify-center md:md:ml-4 text-white bg-zinc-900 h-fit w-full rounded-2xl shadow-lg">
          <Table standing={standing} handleFetchTeam={handleFetchTeam} />
        </div>
        
      </div>
    </div>
  );
};

export default Home;
