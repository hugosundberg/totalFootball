import "../index.css";
import logo from "../../assets/premierLeague.webp";

const League = () => {
  return (
    <>
      <div className="bg-blue-200 h-screen">
        <div className="relative pt-20 bg-black h-full w-full">
          <div className="bg-zinc-900 h-48 p-10 flex">
            <div className="flex text-white">
              <img src={logo} alt="" className="h-14" />
              <div className="ml-4">
                <h2 className="text-white text-2xl">Premier League</h2>
                <p>England</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default League;
