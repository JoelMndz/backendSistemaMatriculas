import { Role } from "src/types";

export class UserCreatedEvent{
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public role: Role
  ){}
}