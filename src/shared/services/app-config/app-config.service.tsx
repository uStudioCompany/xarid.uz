import React, { FC, createContext, useContext } from 'react';
import { Config } from '../../entity';

export type AppConfigService = Config;

const AppConfigContext = createContext<AppConfigService | undefined>(undefined);

const AppConfig: FC<AppConfigService> = ({ children, ...config }) => {
  return <AppConfigContext.Provider value={config}>{children}</AppConfigContext.Provider>;
};

export const useAppConfig = (): AppConfigService => {
  const service = useContext(AppConfigContext);

  if (service === undefined) {
    throw new ReferenceError('Use AppConfig inside its provider.');
  }

  return service;
};

export default AppConfig;
