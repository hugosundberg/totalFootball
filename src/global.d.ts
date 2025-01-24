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
  seasonStats?: TeamStats;  
}

interface TeamOverviewProps {
  team: Team
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
      id: number
      name: string
      logo: string
      winner: boolean
    }
    away: {
      id: number
      name: string
      logo: string
      winner: boolean
    }
  }
  league: {
    id: number
    name: string
    logo: string
    round: string
  }
}

interface HeadToHead {
  fixtures: Fixture[];
}

interface HeadToHeadProps {
  fixture: Fixture;
  headToHead?: Fixture[];
  handleMatchClick: (matchID: number) => void;
}

interface MatchFacts {
  fixture: Fixture

  fixtureInfo: {
    id: number
    referee: string
    date: string
    status: {
      short: string
      elapsed: number
      extra: number
    }
    venue: string
  }
  goals?: {
    home: number
    away: number
  }
  lineups?: {
    home: Lineup
    away: Lineup
  }

  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    round: string
  }

  statistics?: {
    home: TeamMatchStatistics
    away: TeamMatchStatistics
  }

  penalties?: {
    home: number | null
    away: number | null
  }
}

interface LineupProps {
  fixture: MatchFacts
}

interface Lineup {
  coach: {
    id: number
    name: string
    photo: string
  }
  formation: string
  startXI: LineupPlayer[]
  substitutes: LineupPlayer[]
  
}

interface LineupPlayer {
  player: any
  id: number
  name: string
  number: number
  pos: string
  grid: string
}

interface TeamMatchStatistics {
  shotsOn?: number | null
  shotsOff?: number | null
  shotsTotal?: number | null
  blockedShots?: number | null
  fouls?: number | null
  corners?: number | null
  offsides?: number | null
  possesion?: number | null
  yellowCards?: number | null
  redCards?: number | null
  saves?: number | null
  passesTotal?: number | null
  passesAccurate?: number | null
  passesPercentage?: number | null
  expectedGoals?: number | null
}

interface FixtureListProps {
  fixtures: Fixture[] | undefined
  teamID: number
  handleMatchClick: (matchID: number) => void;
}

interface MatchProps {
  fixture?: MatchFacts
  handleFetchMatch: (matchID: number) => void;
  headToHead?: Fixture[]
  handleFetchTeam: (teamID: number) => void
}

interface MatchStatsProps {
  fixture: MatchFacts
}

interface TeamStats {
  played: number
  seasonStats: TeamSeasonStats
}

interface TeamSeasonStats {
  form: string
  goals: {
    for: {
      avarage: {
        home: number
        away: number
        total: number
      }
      total: {
        home: number
        away: number
        total: number
      }
    }
    against: {
      avarage: {
        home: number
        away: number
        total: number
      }
      total: {
        home: number
        away: number
        total: number
      }
    }
  }
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