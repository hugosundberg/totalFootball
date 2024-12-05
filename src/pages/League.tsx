import "../index.css";
import logo from "../../assets/premierLeague.webp";

const League = () => {
  return (
    <>
      <div className="bg-blue-200 h-screen">
        <div className="relative pt-20 bg-black h-full w-full">
          <div className="bg-zinc-900 h-48 p-10">
            <div className="bg-white h-fit w-fit">
              <img src={logo} alt="" className="h-10" />
            </div>
            <h2 className="text-white">Premier League</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default League;
