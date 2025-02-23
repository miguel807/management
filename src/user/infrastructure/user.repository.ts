import { PrismaService } from "src/prisma/prisma.service";
import { UserRepositoryInterface } from "../domain/user.repository";
import { UserInterface } from "../domain/user.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserValue } from "../domain/user.value";


@Injectable()
export class UserPrismaRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
 

  public async create(data: UserValue): Promise<UserInterface> {
    return this.prisma.user.create({ 
        data: { 
            username: data.username, 
            password: data.password 
        } 
    });
}

  public async findById(id: string): Promise<UserInterface> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  public async findByUsername(username: string): Promise<UserInterface> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  public async findAll(): Promise<UserInterface[]> {
    const users = await this.prisma.user.findMany();
    if (!users.length) throw new NotFoundException("There are no users");
    return users;
  }

  public async editUser(
    username: string,
    userUpdated: Partial<UserInterface>,
  ): Promise<UserInterface> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new NotFoundException("User not found");

    return this.prisma.user.update({
      where: { username },
      data: userUpdated,
    });
  }

  public async login(payload: { username: string; password: string }): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { username: payload.username },
    });

    return user ? user.password === payload.password : false;
  }
}
