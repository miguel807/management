import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomersManagementModule } from './customers-management/customers-management.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/infrastructure/user.module';
import { AuthModule } from './auth/infrastructure/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    CustomersManagementModule,
   ],
  controllers: [],
  providers: [],
})
export class AppModule {}
