import { ApiProperty } from '@nestjs/swagger';
import { IAddress, ICompany, IGeo, IUser } from '../interfaces/user.interface';

export class Geo implements IGeo {
  @ApiProperty()
  lat: string;
  @ApiProperty()
  lng: string;
  constructor(lat: string, lng: string) {
    this.lat = lat;
    this.lng = lng;
  }
}
export class Address implements IAddress {
  @ApiProperty()
  street: string;
  @ApiProperty()
  suite: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  zipcode: string;
  @ApiProperty()
  geo: Geo;
  constructor(
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: IGeo,
  ) {
    this.street = street;
    this.suite = suite;
    this.city = city;
    this.zipcode = zipcode;
    this.geo = new Geo(geo?.lat, geo?.lng);
  }
}

export class Company implements ICompany {
  @ApiProperty()
  name: string;
  @ApiProperty()
  catchPhrase: string;
  @ApiProperty()
  bs: string;
  constructor(name: string, catchPhrase: string, bs: string) {
    this.name = name;
    this.catchPhrase = catchPhrase;
    this.bs = bs;
  }
}

export class User implements IUser {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  address: Address;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  website: string;
  @ApiProperty()
  company: Company;

  constructor(
    id: number,
    name: string,
    username: string,
    email: string,
    address: IAddress,
    phone: string,
    website: string,
    company: ICompany,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.address = new Address(
      address?.street,
      address?.suite,
      address?.city,
      address?.zipcode,
      address?.geo,
    );
    this.phone = phone;
    this.website = website;
    this.company = new Company(
      company?.name,
      company?.catchPhrase,
      company?.bs,
    );
  }
}
