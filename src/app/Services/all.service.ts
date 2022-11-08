import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllService {
  mySubject: Subject<any> = new Subject<any>();

  constructor() {}

  getLang(): any {
    return localStorage.getItem('lang') || 'sl';
  }
  
  setLang(lang: string) {
    localStorage.setItem('lang', lang);
    this.mySubject.next(lang);
  }
}
