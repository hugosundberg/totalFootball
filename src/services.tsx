const apiKey = import.meta.env.VITE_FOOTBALL_API_KEY;

// REPLACE WITH INPUT VALUES
const leagueID = 39;
const season = 2024;

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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const player = data.response[0].player;
    const playerStats = data.response[0].statistics;

    console.log(player);
    console.log(playerStats);

    const formattedPlayer: Player = {
      id: player.id,
      age: player.age,
      firstname: player.firstname,
      lastname: player.lastname,
      squadNumber: player.number,
      position: player.position,
      photo: player.photo,
      birth: {
        date: player.birth.date,
        country: player.birth.country,
      },
      height: player.height,
      weight: player.weight,
      nationality: player.nationality,
    };

    console.log("Formatted player: ", formattedPlayer);
    return formattedPlayer;
  } catch (error) {
    console.error("Error fetching player: ", error);
  }
};

export default {
  fetchTeams,
  fetchStandings,
  fetchTeam,
  fetchSquad,
  fetchPlayer,
};
