export interface UserStore {
  isAuth: boolean;
  userData: UserInterface | null;
  token: string | null;
}

export interface LoginUserResponse {
  Error: boolean;
  Msg: string;
  Customer: UserInterface;
  Token: string;
  Exception: any;
  ExecptionString: string;
}

export interface UserInterface {
  ContactNo: string;
  ProfilePicture: string;
  City: string;
  PostalCode: string;
  Gender: string;
  IsActive: boolean;
  UserType: string;
  _id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
