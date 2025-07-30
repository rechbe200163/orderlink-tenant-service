import { Module } from '@nestjs/common';
import { ModuleEnum } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';

export class EnabledModuleDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @Expose()
  @IsEnum(ModuleEnum)
  moduleName: ModuleEnum;

  @Expose()
  @IsDate()
  enabledAt: Date;
}
