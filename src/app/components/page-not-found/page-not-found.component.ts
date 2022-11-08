import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(private router: Router) {}
  time: number = 10;
  countDown: any;
  ngOnInit(): void {
    this.countDown = setInterval(() => {
      this.time = this.time - 1;
      this.time === 0 && this.router.navigate(['/']);
     
    }, 1000);
  }
  ngOnDestroy() {
    if (this.countDown) {
      clearInterval(this.countDown);
    }
  }
}
