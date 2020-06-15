import { AxiosRequestConfig } from 'axios';

import { repo } from '../../config.json';

const { owner, name, branch, docsFolder } = repo;
const serviceUrl = `https://udoc.eprocurement.systems`;

export interface DocProps {
  path: string;
  docName: string;
}

const prependPath = (path?: string): string => (path ? `%2F${path}` : '');

export const getMainMarkdownConfig = (): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${owner}/${name}/${branch}//README.md`,
});

export const getEntriesConfig = (path: string): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${owner}/${name}/${branch}/${path.replace(/\//g, '%2F')}`,
});

export const getMarkdownDocumentConfig = ({ path, docName }: DocProps): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${owner}/${name}/${branch}/${encodeURI(docsFolder)}${prependPath(path)}/${docName}.md`,
});

export const getCsvDocumentConfig = ({ path, docName }: DocProps): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${owner}/${name}/${branch}/${path}/${docName}.csv`,
});

export const getJsonSchemaDocumentConfig = ({ path, docName }: DocProps): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${owner}/${name}/${branch}/${path}/${docName}.schema.json`,
});
