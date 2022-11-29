import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AllService } from 'src/app/Services/all.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuItemList!: MenuItem[];
  menuNames: any[] = [];

  constructor(
    public translate: TranslateService,
    public currentLang: AllService
  ) {}

  ngOnInit(): void {
    this.getAllMenuNames();

  }
  getAllMenuNames() {
    this.getTranslatedMenuItem('headerHome');
    this.getTranslatedMenuItem('headerAbout');
    this.getTranslatedMenuItem('headerWork');
    this.getTranslatedMenuItem('headerContact');
  }
  getLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
    this.currentLang.setLang(lang);
    this.getAllMenuNames();
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
          // command: () => window.location.reload()
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
}
