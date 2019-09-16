import {ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {LockerService} from './locker.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-locker',
  templateUrl: './locker.component.html',
  styleUrls: ['./locker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockerComponent implements OnInit, OnDestroy {

  readonly locked$ = this.locker.locked$;

  @HostBinding('style.display')
  display: string;

  @HostBinding('class')
  class = 'cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing';

  private sub = Subscription.EMPTY;

  constructor(private locker: LockerService) { }

  ngOnInit() {
    this.sub = this.locker.locked$.subscribe(locked => {
      if (locked) {
        this.display = 'inherit';
      } else {
        this.display = 'none';
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
