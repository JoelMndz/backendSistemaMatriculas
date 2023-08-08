
export enum Role {
  Admin = "admin",
  Secretary = "secretary"
}

export interface IAuthGuardPayload{
  user:{
    _id:string, 
    role:Role
  }
}