export interface createNewUserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface JwtPayloadType {
  id: string;
  email: string;
}
