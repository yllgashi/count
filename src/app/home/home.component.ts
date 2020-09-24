import { Component, OnInit } from '@angular/core';
import { Subject, timer } from "rxjs";
import { SubjectModel } from 'src/models/subject.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courseName: string;
  courseList: SubjectModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  // add course in courseList (this will show course on viewport)
  addCourse() {
    let existing = this.courseList.find(x => x.title == this.courseName.trim());

    if (existing) {
      alert('Exists');
    }
    else {
      let course = new SubjectModel(this.courseName);
      this.courseList.push(course);
      this.courseName = '';
    }
  }

  // start course learning time
  startCourseCountDown(courseObject: SubjectModel) {
    courseObject.startOrPause = true; // Bohet true kur mat kohe ndersa bohet false kur don me stopu

    // Nese bohet start heren e par, se pastaj
    if(courseObject.minutes == 0 && courseObject.seconds == 0)
      this.countingTime(courseObject);
  }

  // pause course learning time
  pauseCourseCountDown(courseObject: SubjectModel) {
    courseObject.startOrPause = false;
  }

  // delete course from courseList and from viewport
  deleteCourse(courseObject: SubjectModel) {
    let courseIndex = this.courseList.findIndex(x => x.title == courseObject.title);
    this.courseList.splice(courseIndex, 1);
  }

  // counting time for SubjectModel objects
  countingTime(courseObject: SubjectModel) {
    timer(0, 1000).subscribe(ellapsedCycles => {
      if(courseObject.startOrPause == false) {
        return 0;  // Bohet return veq shkaku qe me mbaru metoda
      }
      else if(courseObject.seconds == 59)
      {
        courseObject.minutes++;
        courseObject.seconds = 0;
      }
      else {
        courseObject.seconds++;
      }
      courseObject.totalCountDown = courseObject.minutes.toString() + ' : ' + courseObject.seconds.toString();
    });
  }
}
