import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class CustomersManagementService {
  constructor(private readonly prisma: PrismaService) {}


  //!! Customer
  
  async createCustomer(data: CreateCustomerDto) {
    return this.prisma.customer.create({ data });
  }

  async findAllCustomers() {
    return this.prisma.customer.findMany({ include: { services: true } });
  }

  async findOneCustomers(id: string) {
    const customer = await this.prisma.customer.findUnique({ where: { id }, include: { services: true } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async updateCustomer(id: string, data: UpdateCustomerDto) {
    return this.prisma.customer.update({ where: { id }, data });
  }

  async removeCustomer(id: string) {
    return this.prisma.customer.delete({ where: { id } });
  }




  // !! Services 
  async createService(data: CreateServiceDto) {
    const formattedData = data.services.map(service => ({
      ...service,
      startDate: new Date(service.startDate),
      endDate: service.endDate ? new Date(service.endDate) : null,
    }));
  
    return this.prisma.service.createMany({
      data: formattedData,
    });
  }
  async findAllServices() {
    return this.prisma.service.findMany({ include: { customer: true } });
  }

  async findOneService(id: string) {
    const service = await this.prisma.service.findUnique({ where: { id }, include: { customer: true } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  /*
  async updateService(id: string, data: UpdateServiceDto) {
    return this.prisma.service.update({ where: { id }, data });
  }
*/
  async removeService(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }
}
