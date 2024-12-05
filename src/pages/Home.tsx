import "../index.css";

const Home = () => {
  return (
    <>
      <div className="flex bg-gray-900 h-screen w-full content-center justify-center">
        <div className="bg-black mt-32 max-w-7xl w-full mx-2 h-1/2 justify-center">
          <div className=" text-white bg-zinc-900 w-80 rounded-2xl">
            <h2 className="p-4">Top Leagues</h2>
            <div className="flex flex-col gap-4 overflow-hidden">
              <button className="league-btn">Leage 1</button>
              <button className="league-btn">Leage 2</button>
              <button className="league-btn">Leage 3</button>
              <button className="league-btn">Leage 4</button>
              <button className="league-btn">Leage 5</button>
              <button className="league-btn">Leage 6</button>
              <button className="league-btn">Leage 7</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
