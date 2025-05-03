import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject.asObservable();
  show() {
    console.log('[SpinnerService] SHOW');
    this.loadingSubject.next(true);
  }
  
  hide() {
    console.log('[SpinnerService] HIDE');
    this.loadingSubject.next(false);
  }
}
