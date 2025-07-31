import { ModuleName, UserTier } from '../billing.utils';

export class CreateCheckoutSessionDto {
  modules: ModuleName[];
  userTier: UserTier;
  email: string;
}
