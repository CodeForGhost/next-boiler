export interface UserProfile {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  password?: string;
}
