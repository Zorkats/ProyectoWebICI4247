import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {

  private isOpenSubject = new BehaviorSubject<boolean>(false);

  public isOpen$: Observable<boolean> = this.isOpenSubject.asObservable();

  constructor() {}

  toggleSidebar() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  openSidebar() {
    this.isOpenSubject.next(true);
  }

  closeSidebar() {
    this.isOpenSubject.next(false);
  }

  get isOpen(): boolean {
    return this.isOpenSubject.value;
  }
}
