// export default
export const menuItems = [
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

export const menuListName = [
  {
    type: "en",
    headerHome: "Home",
    headerAbout: "About Us",
    headerWork: "Our Work",
    headerContact: "Contact",
  },
  {
    type: "sl",
    headerHome: "Dom",
    headerAbout: "O Nas",
    headerWork: "Naše Delo",
    headerContact: "Kontakt",
  },
  {
    type: "de",
    headerHome: "Heimat",
    headerAbout: "Über Uns",
    headerWork: "Unsere Arbeit",
    headerContact: "Kontakt",
  },
];

export const getLanguage = (data) => {
  console.log(data);
};
