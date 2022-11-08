import { Component, OnInit, HostListener, SimpleChanges } from '@angular/core';
import { AllService } from 'src/app/Services/all.service';
import { ourWorkItems } from '../../../assets/ourWork';
import { OurWorkInterface } from '../../interface/all-interface';
@Component({
  selector: 'app-our-work',
  templateUrl: './our-work.component.html',
  styleUrls: ['./our-work.component.scss'],
})
export class OurWorkComponent implements OnInit {
  ourWorkObj!: any; // OurWorkInterface[];
  isShow1: boolean = false;
  isShow2: boolean = false;
  isShow3: boolean = false;
  isShow4: boolean = false;
  isShow5: boolean = false;

  constructor(public currentLang: AllService) {}

  ngOnInit(): void {
    const lang = this.currentLang.getLang();
    this.currentLang.mySubject.subscribe((data) => {
      this.getWorkItemsLanguage(data);
    });

    this.getWorkItemsLanguage(lang);

    if (window.innerWidth > 450) {
      setTimeout(() => {
        this.isShow1 = true;
        this.isShow2 = true;
      }, 0.1);
    } else {
      setTimeout(() => {
        this.isShow1 = true;
      }, 0.1);
    }
  }

  @HostListener('document:scroll')
  scrollfunction() {
    if (window.innerWidth > 768) {
      if (
        document.body.scrollTop > 280 ||
        document.documentElement.scrollTop > 280
      ) {
        this.isShow3 = true;
      }

      if (
        document.body.scrollTop > 800 ||
        document.documentElement.scrollTop > 800
      ) {
        this.isShow4 = true;
      }
      if (
        document.body.scrollTop > 1400 ||
        document.documentElement.scrollTop > 1400
      ) {
        this.isShow5 = true;
      }
    } else {
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        this.isShow2 = true;
      }
      if (
        document.body.scrollTop > 1000 ||
        document.documentElement.scrollTop > 1000
      ) {
        this.isShow3 = true;
      }

      if (
        document.body.scrollTop > 1899 ||
        document.documentElement.scrollTop > 1899
      ) {
        this.isShow4 = true;
      }
      if (
        document.body.scrollTop > 2750 ||
        document.documentElement.scrollTop > 2750
      ) {
        this.isShow5 = true;
      }
    }
  }

  getWorkItemsLanguage(lang: string) {
    this.ourWorkObj = ourWorkItems.filter((items: any) => items.lang === lang);
  }
}
