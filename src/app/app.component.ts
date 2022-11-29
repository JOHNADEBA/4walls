import { Component } from '@angular/core';
// import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AllService } from './Services/all.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '4walls';
  constructor(public translate: TranslateService, 
    // public router: Router, 
    public  currentLang:AllService) {}

  ngOnInit(): void {
    // this.router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationEnd) {
    //     this.currentLocation = (<NavigationEnd>event).url
    //   }
    // });

    this.translate.addLangs(['sl', 'en', 'de']);
    // const lang = localStorage.getItem('lang') || 'sl';
    const lang = this.currentLang.getLang()
    this.translate.setDefaultLang(lang);
  }
}
