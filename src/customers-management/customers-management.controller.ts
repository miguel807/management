import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { CustomersManagementService } from './customers-management.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiTags,ApiOperation,ApiResponse,ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/infrastructure/auth.guard';


@Controller('customers-management')
@ApiTags('Management')
export class CustomersManagementController {
  constructor(private readonly customersManagementService: CustomersManagementService) {}


  //!! Customer
  @UseGuards(AuthGuard)
  @Post('customer')
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersManagementService.createCustomer(createCustomerDto);
  }

  @UseGuards(AuthGuard)
  @Get('customer')
  @ApiOperation({ summary: 'Retrieve all customers' })
  @ApiResponse({ status: 200, description: 'List of customers retrieved successfully.' })
  findAllCustomer() {
    return this.customersManagementService.findAllCustomers();
  }

  @UseGuards(AuthGuard)
  @Get('customer/:id')
  @ApiOperation({ summary: 'Retrieve a specific customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Customer retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  findOneCustomer(@Param('id') id: string) {
    return this.customersManagementService.findOneCustomers(id);
  }

  @UseGuards(AuthGuard)
  @Patch('customer/:id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Customer updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  updateCustomer(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersManagementService.updateCustomer(id, updateCustomerDto);
  }

  @UseGuards(AuthGuard)
  @Delete('customer/:id')
  @ApiOperation({ summary: 'Delete a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Customer deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  removeCustomer(@Param('id') id: string) {
    return this.customersManagementService.removeCustomer(id);
  }

  //!! Services
  @UseGuards(AuthGuard)
  @Post('services')
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse({ status: 201, description: 'Service successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  createService(@Body() createServiceDto: CreateServiceDto) {
    return this.customersManagementService.createService(createServiceDto);
  }

  @UseGuards(AuthGuard)
  @Get('services')
  @ApiOperation({ summary: 'Retrieve all services' })
  @ApiResponse({ status: 200, description: 'List of services retrieved successfully.' })
  findAllServices() {
    return this.customersManagementService.findAllServices();
  }

  @UseGuards(AuthGuard)
  @Get('services/:id')
  @ApiOperation({ summary: 'Retrieve a specific service by ID' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({ status: 200, description: 'Service retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  findOneService(@Param('id') id: string) {
    return this.customersManagementService.findOneService(id);
  }


  /*
  @Patch('services/:id')
  @ApiOperation({ summary: 'Update a service by ID' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({ status: 200, description: 'Service updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  updateService(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.customersManagementService.updateService(id, updateServiceDto);
  }
*/

  @UseGuards(AuthGuard)
  @Delete('services/:id')
  @ApiOperation({ summary: 'Delete a service by ID' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({ status: 200, description: 'Service deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  removeService(@Param('id') id: string) {
    return this.customersManagementService.removeService(id);
  }
}
