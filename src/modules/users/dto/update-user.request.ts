export interface IUpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  isActive?: boolean;
  currentUserId: string;
}
