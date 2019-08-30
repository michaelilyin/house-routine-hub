import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PhotoUrlHolder} from './avatar-url-holder.model';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit, OnChanges {

  @Input()
  user?: PhotoUrlHolder;

  @HostBinding('style.background-image')
  url: SafeStyle;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      if (this.user != undefined) {
        this.url = this.sanitizer.bypassSecurityTrustStyle(`url(${this.user.photoURL})`);
      } else {
        this.url = undefined;
      }
    }
  }

}
