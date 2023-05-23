import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChildren,
  QueryList,
} from "@angular/core";
import { MenuItem } from "primeng/api";
import { homeItems } from "../../../assets/homePageDetails";

import { HomePageInterface } from "../../interface/all-interface";
import { TranslateService } from "@ngx-translate/core";
import { AllService } from "src/app/Services/all.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChildren("subContainer") subContainers!: QueryList<ElementRef>;

  menuItemList!: MenuItem[];
  menuNames: any[] = [];
  snippetData!: any; // HomePageInterface[];

  constructor(
    public translate: TranslateService,
    public currentLang: AllService,
  ) {}

  ngOnInit(): void {
    const lang = this.currentLang.getLang();

    this.menuItemList = [
      {
        label: "Home",
        routerLink: [""],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: "About Us",
        routerLink: ["/about"],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: "Our Work",
        routerLink: ["/our-work"],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: "Contact",
        routerLink: ["/contact"],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: "",
        icon: "flag-icon flag-icon-gb",
        command: () => this.getLanguage("en"),
      },
      {
        label: "",
        icon: "flag-icon flag-icon-de",
        command: () => this.getLanguage("de"),
      },
      {
        label: "",
        icon: "flag-icon flag-icon-si",
        command: () => this.getLanguage("sl"),
      },
    ];

    this.getHomeSnippetLanguage(lang);
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

    this.isSnippetVisible = this.snippetData[0].details.map(
      (_: any, index: any) => {
        const snippetSubContainer = document.getElementsByClassName(
          "snippet-sub-container"
        )[index] as HTMLElement;
        const snippetPosition = snippetSubContainer.offsetTop;

        return scrollPosition + windowHeight >= snippetPosition;
      }
    );
  }

  getLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
    this.currentLang.setLang(lang);
    this.getHomeSnippetLanguage(lang);
  }
  getHomeSnippetLanguage(lang: string) {
    this.snippetData = homeItems.filter((items: any) => items.lang === lang);
  }
}
