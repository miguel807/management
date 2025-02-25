import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCustomerDto {

   @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ip: string;
  
    @ApiProperty()
    @IsOptional()
    @IsString()
    paymentDate?: Date;


    @ApiProperty()
    @IsNumber()
    dataAmount: number;
  

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    paid?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    read?: boolean;
  
    @ApiProperty()
    @IsUUID()
    registeredById: string;
  }
  