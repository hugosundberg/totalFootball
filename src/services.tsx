const apiKey = import.meta.env.VITE_FOOTBALL_API_KEY;

// REPLACE WITH INPUT VALUES
const leagueID = 39;
const season = 2024;

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

    const playerStats = playerStatsData.response[0].player;
    const playerProfile = playerProfileData.response[0].player;

    console.log("Player stats: ", playerStats);
    console.log("Player profile: ", playerProfile);

    const formattedPlayer: Player = {
      id: playerProfile.id,
      age: playerProfile.age,
      firstname: playerProfile.firstname,
      lastname: playerProfile.lastname,
      squadNumber: playerProfile.number,
      position: playerProfile.position,
      photo: playerProfile.photo,
      birth: {
        date: playerStats.birth.date,
        country: playerStats.birth.country,
      },
      height: playerProfile.height,
      weight: playerProfile.weight,
      nationality: playerProfile.nationality,
    };

    console.log("Formatted player: ", formattedPlayer);

    return formattedPlayer;
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

export default {
  fetchTeams,
  fetchStandings,
  fetchTeam,
  fetchSquad,
  fetchPlayer,
  fetchPlayerCurrentTeam,
};
