import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { EnabledModuleDto } from './modules-entity.dto';

export class TenantDto {
  @Expose()
  @IsUUID()
  tenantId: string;

  @Expose()
  @IsString()
  companyName: string;

  @Expose()
  @IsString()
  slug: string;

  @Expose()
  @IsString()
  backendUrl: string;

  @Expose()
  @IsEnum(['active', 'inactive', 'trialing', 'suspended'] as const)
  status: string;

  @Expose()
  @IsDate()
  trialStartedAt: Date;

  @Expose()
  @IsDate()
  trialEndsAt: Date;

  @Expose()
  @IsNumber()
  @IsPositive()
  maxEmployees: number;

  @Expose()
  @IsString()
  billingCustomerId: string;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;

  @Expose()
  @Type(() => EnabledModuleDto)
  enabledModules: EnabledModuleDto[];
}
