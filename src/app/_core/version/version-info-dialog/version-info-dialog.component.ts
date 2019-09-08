import { Component, OnInit } from '@angular/core';
import {version} from '../../../../environments/version';

@Component({
  selector: 'app-version-info-dialog',
  templateUrl: './version-info-dialog.component.html',
  styleUrls: ['./version-info-dialog.component.scss']
})
export class VersionInfoDialogComponent implements OnInit {

  version = version;

  constructor() { }

  ngOnInit() {
  }

}
