const MatchEvents = ({ matchEvents, fixture } : MatchEventProps) => {
    if (!matchEvents) return null;
    return (
      <div className="flex flex-col items-center gap-4 h-fit p-4 bg-red-800 my-4">
        <h2>Events</h2>
       
        <div className="w-full">
          {matchEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-4">
                {event.team.id === fixture.fixture.teams.home.id ? (
                    <div className="flex items-center gap-4">
                        <p>{event.time.elapsed + "'"}</p>
                        <p>{event.player.name}</p>
                        <p>{event.type}</p>
                        <p>{event.detail}</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-4 flex-row-reverse">
                        <p>{event.time.elapsed + "'"}</p>
                        <p>{event.team.name}</p>
                        <p>{event.player.name}</p>
                        <p>{event.type}</p>
                        <p>{event.detail}</p>
                    </div>
                )}
            </div>
          ))}
        </div>
      </div>
    )
}

export default MatchEvents;