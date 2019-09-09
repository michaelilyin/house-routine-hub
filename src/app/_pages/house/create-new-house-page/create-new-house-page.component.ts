import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {House} from '../../../_features/house/_models/house.model';
import {HouseService} from '../../../_features/house/_services/house.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-new-house-page',
  templateUrl: './create-new-house-page.component.html',
  styleUrls: ['./create-new-house-page.component.scss']
})
export class CreateNewHousePageComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private houseService: HouseService,
              private location: Location) {
    this.formGroup = fb.group({
      'name': fb.control('', Validators.required)
    });
  }

  ngOnInit() {
  }

  create(house: House) {
    this.houseService.createHouse(house).subscribe(() => {
      this.location.back();
    });
  }
}
