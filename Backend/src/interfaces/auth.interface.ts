export interface createNewUserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
}

export interface JwtPayloadType {
  id: string;
  email: string;
  roleId: number;
  roleName: string;
}
