
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

export enum ContentTypes{
  imageJPEG = 'image/jpeg',
  pdf = 'application/pdf'
}