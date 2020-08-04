import React, { FC, createContext, useContext, useCallback } from 'react';

import type { AxiosRequestConfig } from 'axios';

import { useAppConfig } from '../app-config';

import type { Document } from '../../entity';
import type { RequestConfigProps } from './request-config.props';

export interface RequestConfigService {
  getMainMarkdownConfig(): AxiosRequestConfig;
  getEntriesConfig(path: string): AxiosRequestConfig;
  getMarkdownDocumentConfig(Document: Document): AxiosRequestConfig;
  getCsvDocumentConfig(Document: Document): AxiosRequestConfig;
  getJsonSchemaDocumentConfig(Document: Document): AxiosRequestConfig;
}

const RequestConfigContext = createContext<RequestConfigService | undefined>(undefined);

const RequestConfig: FC<RequestConfigProps> = ({ children, serviceUrl }) => {
  const { owner, branch, docsFolder, name } = useAppConfig().repo;
  const prependPath = useCallback((path?: string): string => (path ? `%2F${path}` : ''), []);

  const getMainMarkdownConfig = useCallback(
    (): AxiosRequestConfig => ({
      method: 'get',
      // Need a second slash before `README.md`
      url: `${serviceUrl}/entries/${owner}/${name}/${branch}//README.md`,
    }),
    []
  );

  const getEntriesConfig = useCallback(
    (path: string): AxiosRequestConfig => ({
      method: 'get',
      url: `${serviceUrl}/entries/${owner}/${name}/${branch}/${path.replace(/\//g, '%2F')}`,
    }),
    []
  );

  const getMarkdownDocumentConfig = useCallback(
    ({ path, docName }: Document): AxiosRequestConfig => ({
      method: 'get',
      url: `${serviceUrl}/entries/${owner}/${name}/${branch}/${encodeURI(docsFolder)}${prependPath(
        path
      )}/${docName}.md`,
    }),
    []
  );

  const getCsvDocumentConfig = useCallback(
    ({ path, docName }: Document): AxiosRequestConfig => ({
      method: 'get',
      url: `${serviceUrl}/entries/${owner}/${name}/${branch}/${path}/${docName}.csv`,
    }),
    []
  );

  const getJsonSchemaDocumentConfig = useCallback(
    ({ path, docName }: Document): AxiosRequestConfig => ({
      method: 'get',
      url: `${serviceUrl}/entries/${owner}/${name}/${branch}/${path}/${docName}.schema.json`,
    }),
    []
  );

  return (
    <RequestConfigContext.Provider
      value={{
        getMainMarkdownConfig,
        getEntriesConfig,
        getMarkdownDocumentConfig,
        getCsvDocumentConfig,
        getJsonSchemaDocumentConfig,
      }}
    >
      {children}
    </RequestConfigContext.Provider>
  );
};

export const useRequestConfig = (): RequestConfigService => {
  const service = useContext(RequestConfigContext);

  if (service === undefined) {
    throw new ReferenceError('Use RequestConfig inside its provider.');
  }

  return service;
};

export default RequestConfig;
