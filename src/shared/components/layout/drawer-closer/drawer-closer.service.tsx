import React, { FC, createContext, useContext } from 'react';

export interface DrawerCloserService {
  close(): void;
}

const DrawerCloserContext = createContext<DrawerCloserService | undefined>(undefined);

const DrawerCloser: FC<DrawerCloserService> = ({ children, close }) => {
  return <DrawerCloserContext.Provider value={{ close }}>{children}</DrawerCloserContext.Provider>;
};

export const useDrawerState = () => {
  const service = useContext(DrawerCloserContext);

  if (service === undefined) {
    throw new ReferenceError('Use DrawerCloser inside its provider.');
  }

  return service;
};

export default DrawerCloser;
