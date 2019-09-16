import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LockerService {
  private _locked$ = new BehaviorSubject(false);
  private locks: number = 0;

  readonly locked$ = this._locked$.pipe(
    debounceTime(100),
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor() { }

  lock() {
    this.locks += 1;
    this._locked$.next(this.locks > 0);
  }

  unlock() {
    this.locks -= 1;
    this._locked$.next(this.locks > 0);
  }
}
