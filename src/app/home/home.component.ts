import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  importanceStatesCounterForFindInput = 0;
  importanceStatesForFindInput: string = "All";
  importanceStatesClassForFindInput = "btn btn-secondary";
  cardClass = "card text-white bg-primary mb-3 d-inline-block m-2";
  selectedImportanceForAddingCourse: string = "Choose...";
  incorrectCourse = false;
  findOrNo = false;
  findCourseList: SubjectModel[] = [];
  findCourseInput;

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

    if (existing || this.courseName == '' || this.selectedImportanceForAddingCourse == "Choose...") {
      // If coursename is valid and there is not an importance selected
      // user will know that there is a mistake
      this.incorrectCourse = true;
    }
    else {
      let course = new SubjectModel(this.courseName, this.selectedImportanceForAddingCourse);
      this.courseList.push(course);
      this.courseName = '';
    }
  }

  closeModal() {
    this.selectedImportanceForAddingCourse = 'Choose...';
    this.incorrectCourse = false;
  }

  addCardClass(importannce) {
    if(importannce == "Unimportant") {
      return "card text-white bg-dark mb-3 d-inline-block m-2"
    }
    else if(importannce == "Very useful") {
      return "card text-white bg-dark mb-3 d-inline-block m-2";
    }
    else if(importannce == "Fundamental") {
      return "card text-white bg-danger mb-3 d-inline-block m-2"
    }
  }

  changeImportanceOfCourseAndFindFromImportance() {
    this.importanceStatesCounterForFindInput++;
    if(this.importanceStatesCounterForFindInput == 0) {
      this.importanceStatesForFindInput = "All"
      this.importanceStatesClassForFindInput = "btn btn-secondary";
      this.findOrNo = false;
    }
    else if(this.importanceStatesCounterForFindInput == 1) {
      this.importanceStatesForFindInput = "Unimportant"
      this.importanceStatesClassForFindInput = "btn btn-primary";
      this.findOrNo = true;
      this.findCourseList = this.courseList.filter(x => x.importance == this.importanceStatesForFindInput);
    }
    else if(this.importanceStatesCounterForFindInput == 2) {
      this.importanceStatesForFindInput = "Very useful"
      this.importanceStatesClassForFindInput = "btn btn-warning";
      this.findOrNo = true;
      this.findCourseList = this.courseList.filter(x => x.importance == this.importanceStatesForFindInput);
    }
    else if(this.importanceStatesCounterForFindInput == 3) {
      this.importanceStatesCounterForFindInput = -1;
      this.importanceStatesForFindInput = "Fundamental"
      this.importanceStatesClassForFindInput = "btn btn-danger";
      this.findOrNo = true;
      this.findCourseList = this.courseList.filter(x => x.importance == this.importanceStatesForFindInput);
    }
  }

  find(courseToFind, importance) {
    if(this.findCourseInput == '') {
      this.findOrNo = false;
    }
    else if(this.findCourseInput != '' && importance == "All") {
      this.findOrNo = true;
      this.findCourseList = this.courseList.filter(x => x.title == this.findCourseInput);
    }
    else if(this.findCourseInput != '' && importance == 'Unimportant') {
      this.findOrNo = true;
      this.findCourseList = this.courseList.filter(x => x.title == this.findCourseInput && x.importance == 'Unimportant');
    }
    else if(this.findCourseInput != '' && importance == 'Very useful') {
      this.findOrNo = true;
      this.findCourseList = this.courseList.filter(x => x.title == this.findCourseInput && x.importance == 'Very useful');
    }
    else if(this.findCourseInput != '' && importance == 'Fundamental') {
      this.findOrNo = true;
      this.findCourseList = this.courseList.filter(x => x.title == this.findCourseInput && x.importance == 'Fundamental');
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

  // add finded course in findCourseList[]
  // findCourse(courseToFind) {
  //   let course: SubjectModel = this.courseList.find(x => x.title == courseToFind);
  //   this.findCourseList.push(course);
  //   this.findOrNo = true;
  // }

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
