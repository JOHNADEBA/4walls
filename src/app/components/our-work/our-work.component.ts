import { Component, OnInit, HostListener, SimpleChanges, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { AllService } from 'src/app/Services/all.service';
import { ourWorkItems } from '../../../assets/ourWork';
import { OurWorkInterface } from '../../interface/all-interface';
@Component({
  selector: 'app-our-work',
  templateUrl: './our-work.component.html',
  styleUrls: ['./our-work.component.scss'],
})
export class OurWorkComponent implements OnInit {
  @ViewChildren("subContainer") subContainers!: QueryList<ElementRef>;

  ourWorkObj!: any; // OurWorkInterface[];
  

  constructor(public currentLang: AllService) {}

  ngOnInit(): void {
    const lang = this.currentLang.getLang();
    this.currentLang.mySubject.subscribe((data) => {
      this.getWorkItemsLanguage(data);
    });

    this.getWorkItemsLanguage(lang);

    // if (window.innerWidth > 450) {
    //   setTimeout(() => {
    //     this.isShow1 = true;
    //     this.isShow2 = true;
    //   }, 0.1);
    // } else {
    //   setTimeout(() => {
    //     this.isShow1 = true;
    //   }, 0.1);
    // }
  }

  isSnippetVisible: boolean[] = [];

  // Rest of your component code

  @HostListener("window:scroll")
  checkSnippetVisibility() {
    const windowHeight = window.innerHeight;
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    this.isSnippetVisible = this.ourWorkObj[0].details.map(
      (_: any, index: any) => {
        const snippetSubContainer = document.getElementsByClassName(
          "snippet-sub-container"
        )[index] as HTMLElement;
        const snippetPosition = snippetSubContainer.offsetTop;

        return scrollPosition + windowHeight >= snippetPosition;
      }
    );
  }

  getWorkItemsLanguage(lang: string) {
    this.ourWorkObj = ourWorkItems.filter((items: any) => items.lang === lang);
  }
}
