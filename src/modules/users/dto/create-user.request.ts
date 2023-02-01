export interface ICreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
  isActive?: boolean;
}
