export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export type RegisterType = {
  firstName: string;
  lastName: string;
  gender: Gender;
  dob: string | null;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
};

export type LoginType = {
  username: string;
  password: string;
};

export type RegisterResponse = {
  status: number;
  message: string;
};

export type LoginResponse = {
  status: number;
  message: string;
  data: any; // access token
};
