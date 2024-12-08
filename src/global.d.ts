interface Team {
    id: number
    name: string
    country: string
    logo: string
    code: string
    venue: string
}

interface TeamStats {
    played: number;
}

interface Player {
  id: number
  age: number
  name: string
  squadNumber: number
  position: string
  photo: string
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

