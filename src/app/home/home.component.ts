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
  courseName: string; // Course name to add in courseList
  courseList: SubjectModel[] = []; // All courses
  mySidenav = "width:0%"; // Side-nav style
  importanceStatesCounterForFindInput = 0; // Count the clicks at find button
  importanceStatesForFindInput: string = "All"; // Text in find button
  importanceStatesClassForFindInput = "btn btn-secondary"; // Find button class
  cardClass = "card text-white bg-primary mb-3 d-inline-block m-2"; // Courses card class
  selectedImportanceForAddingCourse: string = "Choose..."; // Text in 'select' tag, at adding courses modal
  incorrectCourse = false; // If is true, the warning span is shown at adding courses modal
  findOrNo = false; // Tells which array of courses are shown in viewport, courseList[] or findCourseList[]
  findCourseList: SubjectModel[] = []; // There are courses the client searched at find input
  findCourseInput; // Find courses input

  constructor() { }


  ngOnInit(): void {
  }

  // For opening side-nav
  openNav() {
    this.mySidenav = "width:30%";
  }

  // For closing side-nav
  closeNav() {
    this.mySidenav = "width:0%";
  }

  // Change course badge class
  changeImportanceBadge(importance) {
    if(importance == "Unimportant") return "badge badge-pill badge-primary mx-1";
    else if(importance == "Very useful") return "badge badge-pill badge-warning mx-1"
    else if(importance == "Fundamental") return "badge badge-pill badge-dark mx-1"
  }

  // Add course in courseList (this will show course on viewport)
  addCourse() {
    // Check if new course already exists
    this.courseName = this.courseName.trim();
    let existing = this.courseList.find(x => x.title == this.courseName);

    // If course already exists, or if name of course is null, or if user may have not choose the importance of course,
    // course won't be added
    if (existing || this.courseName == '' || this.selectedImportanceForAddingCourse == "Choose...") {
      // User will know that there is a mistake
      this.incorrectCourse = true;
    }
    // Else add course, and show at viewport
    else {
      let course = new SubjectModel(this.courseName, this.selectedImportanceForAddingCourse);
      this.courseList.push(course);
      this.courseName = '';
    }
  }

  // Prevent a mistake, and remove "incorrect course" warning span
  closeModal() {
    this.selectedImportanceForAddingCourse = 'Choose...';
    this.incorrectCourse = false;
  }

  // Add card class based on importance of course
  addCardClass(importannce) {
    if(importannce == "Unimportant") return "card text-white bg-dark mb-3 d-inline-block m-2";
    else if(importannce == "Very useful") return "card text-white bg-dark mb-3 d-inline-block m-2";
    else if(importannce == "Fundamental") return "card text-white bg-danger mb-3 d-inline-block m-2";
  }

  // Change find button colors, and find courses based on importance
  findBasedOnImportance() {
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

  // Find course with search input
  findCourseWithSearchInput(courseToFind, importance) {
    // If client is not searching a course, don't show courses from findCourseList array
    if(this.findCourseInput == '')  this.findOrNo = false;

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

  // Start course learning counter
  startCourseCountDown(courseObject: SubjectModel) {
    // If user click play button, this attribute of courseObject becomes 'true'
    // If user click pause button, this attribute of courseObject becomes 'false'
    courseObject.startOrPause = true;

    // If start counting time for the first time
    if(courseObject.minutes == 0 && courseObject.seconds == 0) this.countingTime(courseObject);
  }

  // Pause course learning counter
  pauseCourseCountDown(courseObject: SubjectModel) {
    courseObject.startOrPause = false;
  }

  // Delete course from courseList and from viewport
  deleteCourse(courseObject: SubjectModel) {
    // Find course, and delete
    let courseIndex = this.courseList.findIndex(x => x.title == courseObject.title);
    this.courseList.splice(courseIndex, 1);
  }

  // Counting time method for all SubjectModel objects
  countingTime(courseObject: SubjectModel) {
    timer(0, 1000).subscribe(ellapsedCycles => {
      // Return 0, for ending method loop
      if(courseObject.startOrPause == false) return 0;

      // If seconds are <60, continue to add seconds after 1000 milliseconds
      if(courseObject.seconds < 60) courseObject.seconds++;

      // If seconds are == 59, and if minutes are < 60, next second increment minutes
      if(courseObject.seconds == 59 && courseObject.minutes < 60) {
      courseObject.minutes++;
      courseObject.seconds = 0;
      }

      // If seconds are == 59, and if minutes are == 59, and if hours are <= 23, next second increment hours
      if(courseObject.seconds == 59 && courseObject.minutes == 59 && courseObject.hours <= 23) {
        courseObject.hours++;
        courseObject.minutes = 0;
        courseObject.seconds = 0;
      }

      // If seconds are == 59, and if minutes are == 59, and if hours are == 23, next second increment days
      if(courseObject.seconds == 59 && courseObject.minutes == 59 && courseObject.hours == 23) {
        courseObject.days++;
        courseObject.hours = 0;
        courseObject.minutes = 0;
        courseObject.seconds = 0;
      }

      // Set totalCountDown time in string format
      courseObject.totalCountDown = courseObject.days.toString() + 'days, ' + courseObject.hours.toString()
      + 'h, ' + courseObject.minutes + 'min, ' + courseObject.seconds + 'sec';
    });
  }
}
