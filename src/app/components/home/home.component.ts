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
  snippetData!: any; // HomePageInterface[];
  isShow1: boolean = false;
  isShow2: boolean = false;
  isShow3: boolean = false;
  isShow4: boolean = false;
  constructor(public translate: TranslateService, public  currentLang:AllService) {}

  ngOnInit(): void {
    const lang = this.currentLang.getLang()

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


    this.getHomeSnippetLanguage(lang);
  }

  @HostListener('document:scroll')
  scrollfunction() {

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
  }

  getLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
    // localStorage.setItem('lang', lang);
    this.currentLang.setLang(lang)
    this.getHomeSnippetLanguage(lang);
  }
  getHomeSnippetLanguage(lang: string) {
    this.snippetData = homeItems.filter((items: any) => items.lang === lang);
  }
}
