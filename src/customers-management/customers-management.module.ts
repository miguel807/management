import { Module } from '@nestjs/common';
import { CustomersManagementService } from './customers-management.service';
import { CustomersManagementController } from './customers-management.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule,JwtModule],
  controllers: [CustomersManagementController],
  providers: [CustomersManagementService],
})
export class CustomersManagementModule {}
