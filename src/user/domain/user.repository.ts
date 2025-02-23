import { UserInterface } from './user.entity';

export interface UserRepositoryInterface {
  create(user: UserInterface): Promise<UserInterface>;
  findById(id: string): Promise<UserInterface>;
  findByUsername(username: string): Promise<UserInterface>;
  findAll(): Promise<UserInterface[]>;
  editUser(id: string, userUpdated: any): Promise<UserInterface>;
  login(payload: any): Promise<boolean>;
}
