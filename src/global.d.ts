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

interface SquadPlayer {
  id: number
  age: number
  name: string
  squadNumber: number
  position: string
  photo: string
}

interface Player {
  id: number
  age: number
  birth: {
    date: Date
    country: string
  }
  firstname: string
  lastname: string
  squadNumber: number
  position: string
  photo: string
  height: number
  weight: number

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