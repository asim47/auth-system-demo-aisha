export interface UserStore {
  isAuth: boolean;
  userData: UserInterface | null;
  token: string | null;
  adminsUsers: UserInterface[];
}

export interface LoginUserResponse {
  Error: boolean;
  Msg: string;
  AdminUser: UserInterface;
  Token: string;
  Exception: any;
  ExecptionString: string;
}

export interface UserInterface {
  ContactNo: string;
  UserType: string;
  IsActive: boolean;
  ProfilePicture: string;
  _id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetUsersResponse {
  Error: boolean;
  TotalPages: number;
  TotalRecords: number;
  RecordsFound: number;
  Msg: string;
  AdminUsers: UserInterface[];
  Exception: any;
  ExecptionString: string;
}
