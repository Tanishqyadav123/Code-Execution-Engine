export interface LoggedInUserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: null | string;
  password: string;
  createdAt: string;
  updatdAt: string;
  RoleDetails: {
        id: number;
        roleName: string;
    };
}
