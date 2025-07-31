export type ModuleName = 'INSIGHT' | 'FLOW' | 'ACCESS';
export type UserTier = 'CORE' | 'TEAM' | 'PRO' | 'ENTERPRISE';

const modulePrices: Record<ModuleName, number> = {
  // pro Module
  INSIGHT: 10, // Statistiken
  FLOW: 15, // Navigation
  ACCESS: 5, // Custom Roles
};

const userPrices: Record<UserTier, number> = {
  CORE: 0, // bis 3 Nutzer
  TEAM: 5, // bis 5 Nutzer
  PRO: 10, // bis 7 Nutzer
  ENTERPRISE: 0, // wird separat verhandelt
};

const setupFee = 49;

export function calculateOrderLinkPricing(
  modules: ModuleName[],
  userTier: UserTier
): {
  netMonthly: number;
  setupFee: number;
  vat: number;
  grossFirstMonth: number;
} {
  const moduleSum = modules.reduce((sum, mod) => sum + modulePrices[mod], 0);
  const userFee = userPrices[userTier];
  const netMonthly = moduleSum + userFee;
  const vat = +(netMonthly + setupFee) * 0.2;
  const gross = +(netMonthly + setupFee + vat);

  return {
    netMonthly,
    setupFee,
    vat: Math.round(vat * 100) / 100,
    grossFirstMonth: Math.round(gross * 100) / 100,
  };
}
