import football from "../../assets/football.webp";
import sub from "../../assets/sub.png";

const MatchEvents = ({ matchEvents, fixture }: MatchEventProps) => {
  if (!matchEvents) return null;
  return (
    <div className="flex flex-col items-center gap-4 h-fit p-4 bg-zinc-900 my-4 w-11/12 max-w-[1200px] justify-self-center rounded-2xl">
      <h2>Events</h2>

      <div className="w-full">
        {matchEvents.map((event) => (
          <div key={event.id}>
            <div
              className={`flex items-center gap-4 p-2 ${event.team.id !== fixture.fixture.teams.home.id ? "flex-row-reverse ml-auto" : ""}`}
            >
              <div className="bg-zinc-700 w-10 h-10 rounded-full flex items-center justify-center">
                <p>{event.time.elapsed + "'"}</p>
              </div>

              {event.type === "Goal" && (
                <div className={`flex items-center gap-3 ${event.team.id !== fixture.fixture.teams.home.id ? "flex-row-reverse" : ""}`}>
                  <div className="p-2 border-2 rounded-full border-zinc-700">
                    <img src={football} alt="" className="h-4 w-4" />
                  </div>
                  <div className={`${event.team.id !== fixture.fixture.teams.home.id ? "flex flex-col items-end" : ""}`}>
                    <p>{event.player.name}</p>
                    <p className="text-xs text-slate-400">
                       {event.assist.name !== null ? `Assist: ${event.assist.name}` : ""}                    
                    </p>
                  </div>
                </div>
              )}
              {event.type === "Card" && (
                <div className={`flex items-center gap-3 ${event.team.id !== fixture.fixture.teams.home.id ? "flex-row-reverse" : ""}`}>
                  <div className="p-2 h-10 w-10 border-2 rounded-full border-zinc-700">
                    <div
                      className={`flex items-center h-5 w-4 rounded-sm justify-self-center ${event.detail === "Yellow Card" ? "bg-yellow-500" : "bg-red-600"} `}
                    />
                  </div>
                  <p>{event.player.name}</p>
                </div>
              )}

              {event.type === "subst" && (
                <div className={`flex items-center gap-3 ${event.team.id !== fixture.fixture.teams.home.id ? "flex-row-reverse" : ""}`}>
                  <div className="p-2 border-2 rounded-full border-zinc-700">
                    <img src={sub} alt="" className="h-5" />
                  </div>
                  <div className={`${event.team.id !== fixture.fixture.teams.home.id ? "flex flex-col items-end" : ""}`}>
                    <p className="text-green-600">{event.assist.name}</p>
                    <p className="text-xs text-red-700">{event.player.name}</p>
                  </div>
                </div>
              )}


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchEvents;
