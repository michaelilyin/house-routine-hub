import {User} from '../../users/_models/user.model';

export interface House {
  uid: string;
  name: string;
}

export interface HouseInfra extends House {
  _users: string[];
  _admins: string[];
}

export interface PrimaryHouseSettings {
  houseUid: string | undefined;
}
