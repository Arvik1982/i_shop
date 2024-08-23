export interface IUser {
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  refreshToken: string | undefined;
  token: string | undefined;
  username: string;
  commonError: string;
}

export type TUserResponse = {
  data: IUser;
  isLoading: boolean;
  error: {
    data: { message: string };
    status: number | string | undefined;
  };
};
