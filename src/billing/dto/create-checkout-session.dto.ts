import { ApiProperty } from '@nestjs/swagger';
import { ModuleName, UserTier } from '../billing.utils';
import { Type } from 'class-transformer';

export class CreateCheckoutSessionDto {
  @ApiProperty({
    description: 'List of modules to include in the checkout session',
    enum: ModuleName,
  })
  modules: ModuleName[];

  @ApiProperty({
    description: 'User tier for the checkout session',
    enum: Object.values(UserTier),
  })
  @Type(() => String)
  userTier: UserTier;

  @ApiProperty({
    description: 'Email address of the user',
    type: String,
  })
  email: string;
}
