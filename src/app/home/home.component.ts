import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newCourse = "";
  courseName;

  constructor() { }

  ngOnInit(): void {
  }

  addCourse() {
    return this.newCourse += "<li>" + this.courseName + "</li>"
  }
}
