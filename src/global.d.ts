interface Team {
    id: number
    name: string
    country: string
    logo: string
    code: string
    venue: string
}

interface TeamProps {
  team?: Team;
  handleFetchTeam: (id: number) => void;
  standing?: TeamStanding[];
  squad?: SquadPlayer[];
  handleFetchPlayer: (playerID: number) => void;
  fixtures?: Fixture[];
  handleMatchClick: (matchID: number) => void;
}

interface Fixture {
  fixtureInfo: {
    id: number
    referee: string
    date: string
    venue: string
    status: {
      short: string
      elapsed: number
      extra: number
    }
  }
  goals: {
    home: number
    away: number
  }
  teams: {
    home: {
      teamID: number
      name: string
      logo: string
      winner: boolean
    }
    away: {
      teamID: number
      name: string
      logo: string
      winner: boolean
    }
  }
  league: {
    id: number
    name: string
    logo: string
  }
}

interface FixtureListProps {
  fixtures: Fixture[] | undefined
  teamID: number
  handleMatchClick: (matchID: number) => void;
}

interface TeamStats {
    played: number;
}

interface SquadPlayer {
  id: number
  age: number
  name: string
  squadNumber: number
  position: string
  photo: string
}

interface Transfer {
  date: string;
  type: string;
  teams: {
      in: {
          id: number;
          name: string;
          logo: string;
      };
      out: {
          id: number;
          name: string;
          logo: string;
      };
  };
};

interface Player {
  id: number
  age: number
  birth: {
    date: string
    country: string
  }
  firstname: string
  lastname: string
  squadNumber: number
  position: string
  photo: string
  height: number
  weight: number
  nationality: string
  countryCode: string | undefined
}

interface PlayerCurrentStats {
  stats: PlayerCompetitionStats[]
}

interface PlayerStatsProps {
  currentStats: PlayerCurrentStats | undefined
  player: Player
}

interface PlayerCompetitionStats {
  cards: Array
  dribbles: Array
  duels: Array
  fouls: Array
  games: Array
  goals: Array
  league: Array
  passes: Array
  penalty: Array
  shots: Array
  substitutes: Array
  tackles: Array
  team: Array
}

interface PlayerCurrentTeam {
  currentTeamId: number
  currentTeamName: string
  currentTeamLogo: string
  formerTeamId: number
  formerTeamName: string
  formerTeamLogo: string
  type: string
}

interface PlayerProps {
  player?: Player
  handleFetchPlayer: (playerID: number) => void
  currentTeam?: PlayerCurrentTeam | null
  currentStats?: PlayerCurrentStats
}
  

interface TeamStanding {
  rank: number;
  team: {
    name: string;
    id: number;
    logo: string;
  };
  all: TeamStats;
  goalsDiff: number;
  points: number;
  form: string;
}