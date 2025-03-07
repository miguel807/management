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
    await this.prisma.service.deleteMany({ where: { customerId: id } });
    return this.prisma.customer.delete({ where: { id } }); 
  }




  // !! Services 
  async createService(data: CreateServiceDto) {
    const formattedData = data.services.map(service => ({
      ...service,
      startDate: new Date(service.startDate),
      endDate: service.endDate ? new Date(service.endDate) : null,
    }));
  
    const a= this.prisma.service.createMany({
      data: formattedData,
    });
     console.log(a)
    return a
  }
  async findAllServices() {
    return this.prisma.service.findMany({ include: { customer: true } });
  }

  async findOneService(id: string) {
    const service = await this.prisma.service.findUnique({ where: { id }, include: { customer: true } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  
  async updateService(id: string, data: UpdateServiceDto) {
    return this.prisma.service.update({ where: { id }, data });
  }

  async removeService(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }

  async getServiceSummary() {
    return this.prisma.service.groupBy({
      by: ['name'],
      _sum: {
        priceUSD: true,
        priceCUP: true
      }
    });
  }

  async getServiceSummaryByMonth() {
    const services = await this.prisma.service.findMany({
      select: {
        name: true,
        priceCUP: true,
        priceUSD: true,
        startDate: true
      }
    });
  
    return services.reduce((acc, service) => {
      const month = service.startDate.toISOString().slice(0, 7); 
      const key = `${month}-${service.name}`;
  
      if (!acc[key]) {
        acc[key] = { month, type: service.name, total_price_usd: 0, total_price_cup: 0 };
      }
  
      acc[key].total_price_usd += service.priceUSD;
      acc[key].total_price_cup += service.priceCUP;
  
      return acc;
    }, {});
  }
  
}
