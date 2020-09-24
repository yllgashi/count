export class SubjectModel {
  title: string;
  minutes: number = 0;
  seconds: number = 0;
  totalCountDown: string;
  startOrPause: boolean;

  constructor(title) {
    this.title = title;
  }
}
