export interface User {
  username: string;
  password: string;
}
export interface UserResponse {
  data: {
    token: string;
  };
}
