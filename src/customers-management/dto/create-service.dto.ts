import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

export class ServiceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
  

    @ApiProperty()
    @IsString()
    startDate: Date;
  

    @ApiProperty()
    @IsOptional()
    @IsString()
    endDate?: Date;


    @ApiProperty()
    @IsNumber()
    priceCUP: number;
  

    @ApiProperty()
    @IsNumber()
    priceUSD: number;
  

    @ApiProperty()
    @IsUUID()
    customerId: string;
  }



export class CreateServiceDto {
  @ApiProperty({ type: [ServiceDto], description: "Lista de servicios a crear" })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceDto)
  services: ServiceDto[];
}