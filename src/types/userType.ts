export interface UserPayload {
  name: string;
  role: string;
  login: string;
  password: string;
  locationID: number;
}
export interface CreateUserResponse {
  data: {
    message: string;
    userID: number;
  };
}
