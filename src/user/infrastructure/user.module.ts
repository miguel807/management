import { Module } from '@nestjs/common';
import { UserService } from '../application/userUseCase.service';
import { UserController } from './user.controller';
import { UserPrismaRepository } from './user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserPrismaRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
