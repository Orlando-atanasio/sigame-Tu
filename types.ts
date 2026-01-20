
export enum Screen {
  LOGIN = 'login',
  REGISTER = 'register',
  OVERVIEW = 'overview',
  WALLET = 'wallet',
  ANALYSIS = 'analysis',
  PROFILE = 'profile',
  ADD_ASSET = 'add_asset',
  ASSET_DETAILS_REPLACEMENT = 'asset_details_replacement',
  ASSET_DETAILS_MAINTAIN = 'asset_details_maintain',
  ASSET_DETAILS_ACTIVE = 'asset_details_active',
  ACTION_PLAN = 'action_plan',
  IMPACT_ANALYSIS = 'impact_analysis',
  RISK_ANALYSIS = 'risk_analysis',
  IDEAL_PORTFOLIO = 'ideal_portfolio',
  MONTHLY_REPORT = 'monthly_report'
}

export interface Recommendation {
  id: string;
  type: 'buy' | 'sell' | 'info';
  ticker: string;
  description: string;
  risk: string;
  status: string;
}
