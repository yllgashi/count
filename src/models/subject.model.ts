export class SubjectModel {
  title: string;
  minutes: number = 0;
  seconds: number = 0;
  hours: number = 0;
  days: number = 0;
  totalCountDown: string = "0days, 0h, 0min, 0sec";
  importance: string;
  startOrPause: boolean;
  firstDescription: string = "....";
  secondDescription: string = "...";
  thirdDescription: string = "..";

  constructor(title, importance) {
    this.title = title;
    this.importance = importance;
  }
}
