import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isAbout:boolean = false

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isAbout = true
    }, 0.1);
  }

}
