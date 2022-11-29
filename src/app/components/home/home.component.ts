import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { homeItems } from '../../../assets/homePageDetails';

import { HomePageInterface } from '../../interface/all-interface';
import { TranslateService } from '@ngx-translate/core';
import { AllService } from 'src/app/Services/all.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  menuItemList!: MenuItem[];
  menuNames: any[] = [];
  snippetData!: any; // HomePageInterface[];
  isShow1: boolean = false;
  isShow2: boolean = false;
  isShow3: boolean = false;
  isShow4: boolean = false;

  constructor(
    public translate: TranslateService,
    public currentLang: AllService
  ) {}

  ngOnInit(): void {
    const lang = this.currentLang.getLang();

    this.menuItemList = [
      {
        label: 'Home',
        routerLink: [''],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'About Us',
        routerLink: ['/about'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Our Work',
        routerLink: ['/our-work'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Contact',
        routerLink: ['/contact'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: '',
        icon: 'flag-icon flag-icon-gb',
        command: () => this.getLanguage('en'),
      },
      {
        label: '',
        icon: 'flag-icon flag-icon-de',
        command: () => this.getLanguage('de'),
      },
      {
        label: '',
        icon: 'flag-icon flag-icon-si',
        command: () => this.getLanguage('sl'),
      },
    ];

    this.getAllMenuNames();
    this.getHomeSnippetLanguage(lang);
  }

  @HostListener('document:scroll')
  scrollfunction() {
    console.log(document.documentElement.scrollTop);
// console.log(window.innerWidth);

    if (window.innerWidth < 1152) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        this.isShow1 = true;
      }
      if (
        document.body.scrollTop > 450 ||
        document.documentElement.scrollTop > 450
      ) {
        this.isShow2 = true;
      }
      if (
        document.body.scrollTop > 800 ||
        document.documentElement.scrollTop > 800
      ) {
        this.isShow3 = true;
      }
      if (
        document.body.scrollTop > 1500 ||
        document.documentElement.scrollTop > 1500
      ) {
        this.isShow4 = true;
      }
    }else{
        if (
          document.body.scrollTop > 120 ||
          document.documentElement.scrollTop > 120
        ) {
          this.isShow1 = true;
        }
        if (
          document.body.scrollTop > 700 ||
          document.documentElement.scrollTop > 700
        ) {
          this.isShow2 = true;
        }
        if (
          document.body.scrollTop > 1600 ||
          document.documentElement.scrollTop > 1600
        ) {
          this.isShow3 = true;
        }
        if (
          document.body.scrollTop > 2100 ||
          document.documentElement.scrollTop > 2100
        ) {
          this.isShow4 = true;
        }
    
    }
  }

  getLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
    this.currentLang.setLang(lang);
    this.getHomeSnippetLanguage(lang);
    this.getAllMenuNames();
  }
  getHomeSnippetLanguage(lang: string) {
    this.snippetData = homeItems.filter((items: any) => items.lang === lang);
  }

  getTranslatedMenuItem(phrase: string) {
    this.translate.get(phrase).subscribe((res: string) => {
      if (phrase === 'headerHome') this.menuNames[0] = res;

      if (phrase === 'headerAbout') this.menuNames[1] = res;

      if (phrase === 'headerWork') this.menuNames[2] = res;

      if (phrase === 'headerContact') this.menuNames[3] = res;

      this.menuItemList = [
        {
          label: this.menuNames[0],
          routerLink: [''],
          routerLinkActiveOptions: { exact: true },
        },
        {
          label: this.menuNames[1],
          routerLink: ['/about'],
          routerLinkActiveOptions: { exact: true },
        },
        {
          label: this.menuNames[2],
          routerLink: ['/our-work'],
          routerLinkActiveOptions: { exact: true },
        },
        {
          label: this.menuNames[3],
          routerLink: ['/contact'],
          routerLinkActiveOptions: { exact: true },
        },
        {
          label: '',
          icon: 'flag-icon flag-icon-gb',
          command: () => this.getLanguage('en'),
        },
        {
          label: '',
          icon: 'flag-icon flag-icon-de',
          command: () => this.getLanguage('de'),
        },
        {
          label: '',
          icon: 'flag-icon flag-icon-si',
          command: () => this.getLanguage('sl'),
        },
      ];
    });

    return this.menuNames;
  }

  getAllMenuNames() {
    this.getTranslatedMenuItem('headerHome');
    this.getTranslatedMenuItem('headerAbout');
    this.getTranslatedMenuItem('headerWork');
    this.getTranslatedMenuItem('headerContact');
  }
}
