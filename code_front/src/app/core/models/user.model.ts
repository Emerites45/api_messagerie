export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deleteAt: Date;
  lastLogin: Date;
  active: boolean;
  updatedBy: string;
  roles: string[];
}
