const apiKey = import.meta.env.VITE_FOOTBALL_API_KEY;

// REPLACE WITH INPUT VALUES
const leagueID = 39;
const season = 2024;

const fetchCountryCode = async (
  countryName: string
): Promise<string | undefined> => {
  try {
    const response = await fetch("https://flagcdn.com/en/codes.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const countries = await response.json();
    const entries = Object.entries(countries) as [string, string][];

    const result = entries.find(
      ([, name]) => name.toLowerCase() === countryName.toLowerCase()
    );

    if (!result) {
      console.log(`Country not found: ${countryName}`);
      return undefined;
    }

    return result[0];
  } catch (error) {
    console.error("Error fetching country code: ", error);
    return undefined; // Handle the case where something goes wrong
  }
};

function getLatestValidTransfer(transfers: Transfer[]): Transfer {
  const today = new Date();

  const validTransfers = transfers.filter(
    (transfer) => new Date(transfer.date) <= today
  );

  validTransfers.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return validTransfers[0];
}

const fetchTeams = async (leagueID: number) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/teams?league=${leagueID}&season=${season}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const teams: Team[] = data.response.map((team: any) => ({
      id: team.team.id,
      name: team.team.name,
      country: team.team.country,
      logo: team.team.logo,
      code: team.team.code,
      venue: team.venue.name,
    }));

    return teams;
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};

const fetchTeam = async (teamID: number) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/teams?id=${teamID}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const team = data.response[0];

    const processedTeam: Team = {
      id: team.team.id,
      name: team.team.name,
      country: team.team.country,
      logo: team.team.logo,
      code: team.team.code,
      venue: team.venue.name,
    };

    return processedTeam;
  } catch (error) {
    console.error("Error fetching team: ", error);
  }
};

const fetchStandings = async (leagueID: number) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/standings?league=${leagueID}&season=${season}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const standings = data.response[0].league.standings[0];
    return standings;
  } catch (error) {
    console.error("Error fetching standings: ", error);
  }
};

const fetchTeamLeague = async (teamID: number) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/standings?team=${teamID}&season=${season}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    for (let i = 0; i < data.response.length; i++) {
      if (data.response[i].league.country !== "World") {
        return data.response[i].league.id;
      }
    }

    return leagueID;
  } catch (error) {
    console.error("Error fetching team standings: ", error);
  }
};

const fetchTeamCompetitions = async (teamID: number) => {

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/leagues?team=${teamID}&season=${season}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const teamLeague = await fetchTeamLeague(teamID);

    const comps: TeamCompetitions[] = data.response.map((comp: any) => ({
      competitions: {
        league: {
          id: comp.league.id,
          name: comp.league.name,
          type: comp.league.type,
          logo: comp.league.logo,
        },
        country: {
          name: comp.country.name,
          code: comp.country.code,
        }
      },
    }));

    comps.sort((a, b) => {
      if (a.competitions.league.id === teamLeague) {
        return -1;
      } else if (b.competitions.league.id === teamLeague) {
        return 1;
      } else {
        return 0;
      }
    });

    return comps;
  } catch (error) {
    console.error("Error fetching competitions: ", error);
  }
}

const fetchSquad = async (teamID: number) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/players/squads?team=${teamID}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const players: SquadPlayer[] = data.response[0].players.map(
      (player: any) => ({
        id: player.id,
        age: player.age,
        name: player.name,
        squadNumber: player.number,
        position: player.position,
        photo: player.photo,
      })
    );

    return players;
  } catch (error) {
    console.error("Error fetching squad: ", error);
  }
};

const fetchPlayer = async (playerID: number) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/players?id=${playerID}&season=${season}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    const response2 = await fetch(
      `https://v3.football.api-sports.io/players/profiles?player=${playerID}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const playerStatsData = await response.json();
    const playerProfileData = await response2.json();

    const playerStats = playerStatsData.response[0];
    const playerProfile = playerProfileData.response[0].player;

    const formattedPlayerStats: PlayerCurrentStats = {
      stats: playerStats.statistics,
    };

    const countryCode = await fetchCountryCode(playerProfile.nationality);

    const formattedPlayer: Player = {
      id: playerProfile.id,
      age: playerProfile.age,
      firstname: playerProfile.firstname,
      lastname: playerProfile.lastname,
      squadNumber: playerProfile.number,
      position: playerProfile.position,
      photo: playerProfile.photo,
      birth: {
        date: playerStats.player.birth.date,
        country: playerStats.player.birth.country,
      },
      height: playerProfile.height,
      weight: playerProfile.weight,
      nationality: playerProfile.nationality,
      countryCode: countryCode,
    };

    return { formattedPlayer, formattedPlayerStats };
  } catch (error) {
    console.error("Error fetching player: ", error);
  }
};

const fetchPlayerCurrentTeam = async (playerID: number) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/transfers?player=${playerID}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    const data = await response.json();

    if (data.response.length < 1) {
      return null;
    }

    const transfers = data.response[0].transfers;

    const latestTransfer = getLatestValidTransfer(transfers);

    let currentTeam: PlayerCurrentTeam = {
      currentTeamId: latestTransfer.teams.in.id,
      currentTeamName: latestTransfer.teams.in.name,
      currentTeamLogo: latestTransfer.teams.in.logo,
      formerTeamId: latestTransfer.teams.out.id,
      formerTeamName: latestTransfer.teams.out.name,
      formerTeamLogo: latestTransfer.teams.out.logo,
      type: latestTransfer.type,
    };

    return currentTeam;
  } catch (error) {
    console.error("Error fetching transfers: ", error);
  }
};

const fetchCurrentRound = async (leagueID: number) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures/rounds?league=${leagueID}&season=${season}&current=true`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    const data = await response.json();

    const currentRound = data.response[0];
    return currentRound;
  } catch (error) {
    console.error("Error fetching round: ", error);
  }
};

const fetchTeamFixtures = async (teamID: number) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (leagueID) {
    const currentRound = await fetchCurrentRound(leagueID);
  }

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=${teamID}&season=${season}&timezone=${timeZone}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    const data = await response.json();

    const fixtures: Fixture[] = data.response.map((fixture: any) => ({
      fixtureInfo: {
        id: fixture.fixture.id,
        referee: fixture.fixture.referee,
        date: fixture.fixture.date,
        venue: fixture.fixture.venue.name,
        status: {
          short: fixture.fixture.status.short,
          elapsed: fixture.fixture.status.elapsed,
          extra: fixture.fixture.status.extra,
        },
      },
      goals: {
        home: fixture.goals.home,
        away: fixture.goals.away,
      },
      teams: {
        home: {
          teamID: fixture.teams.home.id,
          name: fixture.teams.home.name,
          logo: fixture.teams.home.logo,
          winner: fixture.teams.home.winner,
        },
        away: {
          teamID: fixture.teams.away.id,
          name: fixture.teams.away.name,
          logo: fixture.teams.away.logo,
          winner: fixture.teams.away.winner,
        },
      },
      league: {
        id: fixture.league.id,
        name: fixture.league.name,
        logo: fixture.league.logo,
        round: fixture.league.round,
      },
    }));

    fixtures.sort(
      (a, b) =>
        new Date(a.fixtureInfo.date).getTime() -
        new Date(b.fixtureInfo.date).getTime()
    );

    return fixtures;
  } catch (error) {
    console.error("Error fetching team fixtures: ", error);
  }
};

const fetchMatch = async (matchID: number) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?id=${matchID}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    const data = await response.json();

    const fixture = data.response[0];

    // Check if the match has started
    const matchHasStarted =
      fixture.fixture.status.short !== "NS" &&
      fixture.fixture.status.short !== "PST" &&
      fixture.fixture.status.short !== "TBD";

    // Initialize statistics as empty arrays
    let homeTeamStats = [];
    let awayTeamStats = [];

    // Only assign statistics if the match has started and statistics are available
    if (
      matchHasStarted &&
      fixture.statistics &&
      fixture.statistics.length > 0
    ) {
      homeTeamStats = fixture.statistics[0].statistics;
      awayTeamStats = fixture.statistics[1].statistics;
    }

    if (matchHasStarted) {
      const formattedFixture: MatchFacts = {
        fixture: fixture,
        goals: {
          home: fixture.goals.home,
          away: fixture.goals.away,
        },
        league: {
          id: fixture.league.id,
          name: fixture.league.name,
          country: fixture.league.country,
          logo: fixture.league.logo,
          flag: fixture.league.flag,
          round: fixture.league.round,
        },
        lineups: matchHasStarted
          ? {
              home: fixture.lineups[0],
              away: fixture.lineups[1],
            }
          : {
              home: null,
              away: null,
            },
        fixtureInfo: {
          id: fixture.fixture.id,
          referee: fixture.fixture.referee,
          date: fixture.fixture.date,
          status: {
            short: fixture.fixture.status.short,
            elapsed: fixture.fixture.status.elapsed,
            extra: fixture.fixture.status.extra,
          },
          venue: fixture.fixture.venue.name,
        },

        statistics: {
          home: {
            shotsOn: homeTeamStats[0]?.value ?? null,
            shotsOff: homeTeamStats[1]?.value ?? null,
            shotsTotal: homeTeamStats[2]?.value ?? null,
            blockedShots: homeTeamStats[3]?.value ?? null,
            fouls: homeTeamStats[6]?.value ?? null,
            corners: homeTeamStats[7]?.value ?? null,
            offsides: homeTeamStats[8]?.value ?? null,
            possesion: homeTeamStats[9]?.value ?? null,
            yellowCards: homeTeamStats[10]?.value ?? null,
            redCards: homeTeamStats[11]?.value ?? null,
            saves: homeTeamStats[12]?.value ?? null,
            passesTotal: homeTeamStats[13]?.value ?? null,
            passesAccurate: homeTeamStats[14]?.value ?? null,
            passesPercentage: homeTeamStats[15]?.value ?? null,
            expectedGoals: homeTeamStats[16]?.value ?? null,
          },
          away: {
            shotsOn: awayTeamStats[0]?.value ?? null,
            shotsOff: awayTeamStats[1]?.value ?? null,
            shotsTotal: awayTeamStats[2]?.value ?? null,
            blockedShots: awayTeamStats[3]?.value ?? null,
            fouls: awayTeamStats[6]?.value ?? null,
            corners: awayTeamStats[7]?.value ?? null,
            offsides: awayTeamStats[8]?.value ?? null,
            possesion: awayTeamStats[9]?.value ?? null,
            yellowCards: awayTeamStats[10]?.value ?? null,
            redCards: awayTeamStats[11]?.value ?? null,
            saves: awayTeamStats[12]?.value ?? null,
            passesTotal: awayTeamStats[13]?.value ?? null,
            passesAccurate: awayTeamStats[14]?.value ?? null,
            passesPercentage: awayTeamStats[15]?.value ?? null,
            expectedGoals: awayTeamStats[16]?.value ?? null,
          },
        },

        penalties: {
          home: fixture.score.penalty.home,
          away: fixture.score.penalty.away,
        },
      };

      return formattedFixture;
    } else {
      const formattedFixture: MatchFacts = {
        fixture: fixture,
        league: {
          id: fixture.league.id,
          name: fixture.league.name,
          country: fixture.league.country,
          logo: fixture.league.logo,
          flag: fixture.league.flag,
          round: fixture.league.round,
        },
        lineups: matchHasStarted
          ? {
              home: fixture.lineups[0],
              away: fixture.lineups[1],
            }
          : {
              home: null,
              away: null,
            },
        fixtureInfo: {
          id: fixture.fixture.id,
          referee: fixture.fixture.referee,
          date: fixture.fixture.date,
          status: {
            short: fixture.fixture.status.short,
            elapsed: fixture.fixture.status.elapsed,
            extra: fixture.fixture.status.extra,
          },
          venue: fixture.fixture.venue.name,
        },
      };

      return formattedFixture;
    }
  } catch (error) {
    console.error("Error fetching match: ", error);
  }
};

const fetchMatchEvents = async (matchID: number) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures/events?fixture=${matchID}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    const data = await response.json();


    const matchEvents: MatchEvent[] = data.response.map((event: any) => ({
      id: event.id,
      time: {
        elapsed: event.time.elapsed,
        extra: event.time.extra,
      },
      team: {
        id: event.team.id,
        name: event.team.name,
        logo: event.team.logo,
      },
      player: {
        id: event.player.id,
        name: event.player.name,
      },
      assist: {
        id: event.assist.id,
        name: event.assist.name,
      },
      type: event.type,
      detail: event.detail,
      comments: event.comments,
    }));

    matchEvents.sort((a, b) => {
      // Calculate total time for each event
      const totalA = a.time.elapsed + (a.time.extra || 0);
      const totalB = b.time.elapsed + (b.time.extra || 0);

      // Handle transition between first half and second half
      if (a.time.elapsed <= 45 && b.time.elapsed > 45) {
        return -1;
      } else if (a.time.elapsed > 45 && b.time.elapsed <= 45) {
        return 1;
      }

      // Sort by total time
      return totalA - totalB;
    });

    for (let i = 0; i < matchEvents.length; i++) {
      if (matchEvents[i].detail === "Red Card") {
        if (
          matchEvents[i - 1].type === "Card" &&
          matchEvents[i - 1].player.id === matchEvents[i].player.id
        ) {
          matchEvents[i - 1].detail = "Second Yellow";
          matchEvents.splice(i, 1);
        } else if (
          matchEvents[i + 1].type === "Card" &&
          matchEvents[i + 1].player.id === matchEvents[i].player.id
        ) {
          matchEvents[i + 1].detail = "Second Yellow";
          matchEvents.splice(i, 1);
        }
      }
    }

    return matchEvents;
  } catch (error) {
    console.error("Error fetching match events: ", error);
  }
};

const fetchHeadToHead = async (team1ID: number, team2ID: number) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${team1ID}-${team2ID}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    const data = await response.json();

    const fixtures: Fixture[] = data.response.map((fixture: any) => ({
      fixtureInfo: {
        id: fixture.fixture.id,
        referee: fixture.fixture.referee,
        date: fixture.fixture.date,
        venue: fixture.fixture.venue.name,
        status: {
          short: fixture.fixture.status.short,
          elapsed: fixture.fixture.status.elapsed,
          extra: fixture.fixture.status.extra,
        },
      },
      goals: {
        home: fixture.goals.home,
        away: fixture.goals.away,
      },
      teams: {
        home: {
          teamID: fixture.teams.home.id,
          name: fixture.teams.home.name,
          logo: fixture.teams.home.logo,
          winner: fixture.teams.home.winner,
        },
        away: {
          teamID: fixture.teams.away.id,
          name: fixture.teams.away.name,
          logo: fixture.teams.away.logo,
          winner: fixture.teams.away.winner,
        },
      },
      league: {
        id: fixture.league.id,
        name: fixture.league.name,
        logo: fixture.league.logo,
        round: fixture.league.round,
      },
    }));

    {
      /* Sort fixtures by date */
    }
    fixtures.sort(
      (a, b) =>
        new Date(b.fixtureInfo.date).getTime() -
        new Date(a.fixtureInfo.date).getTime()
    );

    return fixtures;
  } catch (error) {
    console.error("Error fetching head to head: ", error);
  }
};

const fetchTeamSeasonStats = async (leagueID: number, teamID: number) => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/teams/statistics/?team=${teamID}&season=${season}&league=${leagueID}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey,
        },
      }
    );

    const data = await response.json();

    const teamStats = data.response;

    const teamSeasonStats: TeamSeasonStats = {
      form: teamStats.form,
      fixtures: {
        played: {
          home: teamStats.fixtures.played.home,
          away: teamStats.fixtures.played.away,
          total: teamStats.fixtures.played.total,
        },
        wins: {
          home: teamStats.fixtures.wins.home,
          away: teamStats.fixtures.wins.away,
          total: teamStats.fixtures.wins.total,
        },
        draws: {
          home: teamStats.fixtures.draws.home,
          away: teamStats.fixtures.draws.away,
          total: teamStats.fixtures.draws.total,
        },
        losses: {
          home: teamStats.fixtures.loses.home,
          away: teamStats.fixtures.loses.away,
          total: teamStats.fixtures.loses.total,
        },
      },

      goals: {
        for: {
          average: {
            home: teamStats.goals.for.average.home,
            away: teamStats.goals.for.average.away,
            total: teamStats.goals.for.average.total,
          },
          total: {
            home: teamStats.goals.for.total.home,
            away: teamStats.goals.for.total.away,
            total: teamStats.goals.for.total.total,
          },
        },
        against: {
          average: {
            home: teamStats.goals.against.average.home,
            away: teamStats.goals.against.average.away,
            total: teamStats.goals.against.average.total,
          },
          total: {
            home: teamStats.goals.against.total.home,
            away: teamStats.goals.against.total.away,
            total: teamStats.goals.against.total.total,
          },
        },
      },
    };

    return teamSeasonStats;
  } catch (error) {
    console.error("Error fetching team stats: ", error);
  }
};

export default {
  fetchTeams,
  fetchStandings,
  fetchTeam,
  fetchSquad,
  fetchPlayer,
  fetchPlayerCurrentTeam,
  fetchTeamFixtures,
  fetchMatch,
  fetchTeamSeasonStats,
  fetchHeadToHead,
  fetchMatchEvents,
  fetchTeamLeague,
  fetchTeamCompetitions,
};
