export interface AccountLevelOverridesValue {
  target: string;
  threshold: string;
}

export interface AccountLevelOverrides {
  [key: string]: AccountLevelOverridesValue
}