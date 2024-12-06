import "../index.css";
import logo from "../../assets/premierLeague.webp";

const League = () => {
  return (
    <>
      <div className="flex bg-black h-screen justify-center ">
        <div className="relative pt-16 bg-black h-full w-full md:lg:max-w-screen-xl">
          <div className="bg-zinc-800 mt-4 h-48 p-10 flex flex-row rounded-lg">
            <div className="text-white flex flex-col">
              <div className="flex">
                <img src={logo} alt="" className="h-14" />
                <div className="ml-4">
                  <h2 className="text-white text-2xl">Premier League</h2>
                  <p>England</p>
                </div>
              </div>
              <div className="text-white top-0 flex gap-10 pt-10">
                <button>Table</button>
                <button>Teams</button>
                <button>Matches</button>
                <button>Stats</button>
              </div>
            </div>
          </div>
          <div className="bg-zinc-800 mt-4 h-48 p-10 flex flex-row rounded-lg text-white">
            <p>Matches</p>
            <div className="text-white top-0 flex gap-10 pt-10">
              <button>Table</button>
              <button>Teams</button>
              <button>Matches</button>
              <button>Stats</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default League;
