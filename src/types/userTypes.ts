export interface IUser {
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  refreshToken: string;
  token: string;
  username: string;
}

export type TUserResponse = {
  data: IUser;
  isLoading: boolean;
  error: {
    data: { message: string };
    status: number|string|undefined;
  };
};
