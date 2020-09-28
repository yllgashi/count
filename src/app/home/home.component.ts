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
  mySidenav = "width:0%";
  importanceStatesCounter = 0;
  ImportanceStates: string = "Unimportant";
  ImportanceStatesClass = "btn btn-secondary";
  cardClass = "card text-white bg-primary mb-3 d-inline-block m-2";
  playOrPause = true;

  constructor() { }


  ngOnInit(): void {
  }

  openNav() {
    this.mySidenav = "width:30%";
  }

  closeNav() {
    this.mySidenav = "width:0%";
  }

  changeImportanceBadge(importance) {
    if(importance == "Unimportant")
      return "badge badge-pill badge-primary mx-1";
    else if(importance == "Very useful")
      return "badge badge-pill badge-warning mx-1"
    else if(importance == "Fundamental")
      return "badge badge-pill badge-dark mx-1"
  }

  // add course in courseList (this will show course on viewport)
  addCourse() {
    this.courseName = this.courseName.trim();
    let existing = this.courseList.find(x => x.title == this.courseName.trim());

    if (existing) {
      alert('Exists');
    }
    else if(this.courseName == '') {
      alert('Null');
    }
    else {
      let course = new SubjectModel(this.courseName, this.ImportanceStates);
      this.courseList.push(course);
      this.courseName = '';
    }
  }

  addCardClass(importannce) {
    if(importannce == "Unimportant") {
      return "card text-white bg-secondary mb-3 d-inline-block m-2"
    }
    else if(importannce == "Very useful") {
      return "card text-white bg-dark mb-3 d-inline-block m-2";
    }
    else if(importannce == "Fundamental") {
      return "card text-white bg-danger mb-3 d-inline-block m-2"
    }
  }

  changeImportanceOfCourse() {
    this.importanceStatesCounter++;
    if(this.importanceStatesCounter == 0) {
      this.ImportanceStates = "Unimportant"
      this.ImportanceStatesClass = "btn btn-secondary";
    }
    else if(this.importanceStatesCounter == 1) {
      this.ImportanceStates = "Very useful"
      this.ImportanceStatesClass = "btn btn-dark";
    }
    else if(this.importanceStatesCounter == 2) {
      this.importanceStatesCounter = -1;
      this.ImportanceStates = "Fundamental"
      this.ImportanceStatesClass = "btn btn-danger";
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

      if(courseObject.seconds < 60) {
        courseObject.seconds++;
      }

      if(courseObject.seconds == 59 && courseObject.minutes < 60) {
      courseObject.minutes++;
      courseObject.seconds = 0;
      }

      if(courseObject.hours < 24 && courseObject.minutes == 59 && courseObject.seconds == 59) {
        courseObject.hours++;
        courseObject.minutes = 0;
        courseObject.seconds = 0;
      }

      if(courseObject.hours == 23 && courseObject.minutes == 59 && courseObject.seconds == 59) {
        courseObject.days++;
        courseObject.hours = 0;
        courseObject.minutes = 0;
        courseObject.seconds = 0;
      }
      courseObject.totalCountDown = courseObject.days.toString() + 'days, ' + courseObject.hours.toString()
      + 'h, ' + courseObject.minutes + 'min, ' + courseObject.seconds + 'sec';
    });
  }
}
