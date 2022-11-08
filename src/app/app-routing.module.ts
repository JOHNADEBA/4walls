import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { OurWorkComponent } from './components/our-work/our-work.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'titles.home' } },
  { path: 'about', component: AboutComponent, data: { title: 'titles.about' } },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'titles.contact' },
  },
  {
    path: 'our-work',
    component: OurWorkComponent,
    data: { title: 'titles.ourWork' },
  },
  { path: '', pathMatch: 'full', redirectTo: 'HomeComponent' },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
