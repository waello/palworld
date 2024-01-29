type PalType =
    | 'Neutral'
    | 'Water'
    | 'Fire'
    | 'Grass'
    | 'Ice'
    | 'Dark'
    | 'Ground'
    | 'Dragon'
    | 'Electric';

interface Skill {
  level: number;
  name: string;
  type: string;
  cooldown: number;
  power: number;
  description: string;
}

interface Aura {
  name: string;
  description: string;
}

interface Stats {
  [key: string]: number | string;
}

interface Pal {
  name: string;
  paldeckNumber: number;
  breedingPower: number;
  type: PalType[];
  skills: Skill[];
  aura: Aura;
  drops: string[];
  description: string;
  stats: Stats;
}

class PalClass implements Pal {
  name: string;
  paldeckNumber: number;
  breedingPower: number;
  type: PalType[];
  skills: Skill[];
  aura: Aura;
  drops: string[];
  description: string;
  stats: Stats; // Ensure this matches the interface name

  constructor(data: any) {
    this.name = data.name;
    this.paldeckNumber = data.id; // Assuming 'id' corresponds to 'paldeckNumber'
    this.breedingPower = data.stats.find((stat: any) => stat.hasOwnProperty('BreedPWR'))?.BreedPWR || 0;
    this.type = Array.isArray(data.types) ?
        data.types.map((t: string) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()) as PalType[] :
        [];
    this.skills = data.skills;
    this.aura = data.aura;
    this.drops = data.drops;
    this.description = data.description;
    this.stats = this.mapStats(data.stats);
  }

  private mapStats(statsArray: any[]): Stats { // Ensure this uses the 'Stats' interface
    const stats: Stats = {};
    statsArray.forEach(stat => {
      Object.keys(stat).forEach(key => {
        stats[key] = stat[key];
      });
    });
    return stats;
  }
}

export { Pal, PalType, PalClass };
