import { Inject, Injectable } from '@nestjs/common';
import { UserInterface } from '../domain/user.entity';
import { UserRepositoryInterface } from '../domain/user.repository';
import { UserValue } from '../domain/user.value';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRespository: UserRepositoryInterface,
  ) {}

  public async create(user: UserInterface) {
    const user_parsed = new UserValue(user);
    await user_parsed.encodePassword(); 
    console.log(user_parsed);
    return this.userRespository.create(user_parsed);
}

  findAll() {
    return this.userRespository.findAll();
  }

  findOneById(id: string) {
    return this.userRespository.findById(id);
  }
  findOneByUserName(username: string) {
    return this.userRespository.findByUsername(username);
  }

  findOneByUsername(username: string) {
    return this.userRespository.findByUsername(username);
  }

  editUser(id: string, userUpdate: any) {
    return this.userRespository.editUser(id, userUpdate);
  }
  login(payload: any) {
    return this.userRespository.login(payload);
  }
}
