

import { PartialType } from '@nestjs/swagger';
import { ServiceDto } from './create-service.dto';


export class UpdateServiceDto extends PartialType(ServiceDto) {}
