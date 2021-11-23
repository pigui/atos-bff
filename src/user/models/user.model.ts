import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;

  constructor(id: number, name: string, username: string, email: string) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
  }
}
