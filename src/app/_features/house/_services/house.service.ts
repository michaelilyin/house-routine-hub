import { Injectable } from '@angular/core';
import {HouseModule} from '../house.module';

@Injectable({
  providedIn: HouseModule
})
export class HouseService {

  constructor() { }
}
