import { Subjection } from '../shared/subjection.model';

export class Security {
  public name: string;
  public description: string;
  public imagePath: string;
  public subjections: Subjection[];

  constructor(name: string, desc: string, imagePath: string, subjections: Subjection[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.subjections = subjections;
  }
}
