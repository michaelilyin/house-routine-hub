import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {House} from '../../../_features/house/_models/house.model';
import {first, map, shareReplay} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {HouseService} from '../../../_features/house/_services/house.service';

@Component({
  selector: 'app-house-settings',
  templateUrl: './house-settings.component.html',
  styleUrls: ['./house-settings.component.scss']
})
export class HouseSettingsComponent implements OnInit {

  readonly house$: Observable<House> = this.route.data.pipe(
    map(data => data.house as House | undefined),
    shareReplay(1)
  );

  constructor(private route: ActivatedRoute,
              private houseService: HouseService,
              private router: Router) { }

  ngOnInit() {
  }

  delete() {
    const uid = this.route.snapshot.paramMap.get('id');
    this.houseService.deleteHouse(uid).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
