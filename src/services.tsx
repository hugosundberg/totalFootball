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

const fetchTeams = async () => {
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

const fetchStandings = async () => {
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
    console.log(currentRound);
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

    console.log(fixture.league.round);

    const homeTeamStats = fixture.statistics[0].statistics;
    const awayTeamStats = fixture.statistics[1].statistics;

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

      statistics: {
        home: {
          shotsOn: homeTeamStats[0].value,
          shotsOff: homeTeamStats[1].value,
          shotsTotal: homeTeamStats[2].value,
          blockedShots: homeTeamStats[3].value,
          fouls: homeTeamStats[6].value,
          corners: homeTeamStats[7].value,
          offsides: homeTeamStats[8].value,
          possesion: homeTeamStats[9].value,
          yellowCards: homeTeamStats[10].value,
          redCards: homeTeamStats[11].value,
          saves: homeTeamStats[12].value,
          passesTotal: homeTeamStats[13].value,
          passesAccurate: homeTeamStats[14].value,
          expectedGoals: homeTeamStats[16].value,
        },
        away: {
          shotsOn: awayTeamStats[0].value,
          shotsOff: awayTeamStats[1].value,
          shotsTotal: awayTeamStats[2].value,
          blockedShots: awayTeamStats[3].value,
          fouls: awayTeamStats[6].value,
          corners: awayTeamStats[7].value,
          offsides: awayTeamStats[8].value,
          possesion: awayTeamStats[9].value,
          yellowCards: awayTeamStats[10].value,
          redCards: awayTeamStats[11].value,
          saves: awayTeamStats[12].value,
          passesTotal: awayTeamStats[13].value,
          passesAccurate: awayTeamStats[14].value,
          expectedGoals: awayTeamStats[16].value,
        },
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
      },
    };

    console.log("Formatted fixture: ", formattedFixture);

    return formattedFixture;
  } catch (error) {
    console.error("Error fetching match: ", error);
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
};
