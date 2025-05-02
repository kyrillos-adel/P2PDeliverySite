import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filtersSubject = new BehaviorSubject<any>(null);
  filters$ = this.filtersSubject.asObservable();


  constructor() {}

  updateFilters(filters: any) {
    this.filtersSubject.next(filters);
  }

}
