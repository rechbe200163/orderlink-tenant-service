import { ApiProperty } from '@nestjs/swagger';
import { ModuleName, UserTier } from '../billing.utils';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateCheckoutSessionDto {
  @ApiProperty({
    description: 'List of modules to include in the checkout session',
    enum: ModuleName,
  })
  @IsOptional()
  modules?: ModuleName[];

  @ApiProperty({
    description: 'User tier for the checkout session',
    enum: Object.values(UserTier),
  })
  @Type(() => String)
  @IsOptional()
  @IsEnum(UserTier, {
    message: `User tier must be one of: ${Object.values(UserTier).join(', ')}`,
  })
  userTier?: UserTier;

  @ApiProperty({
    description: 'Email address of the user',
    type: String,
  })
  email: string;
}
