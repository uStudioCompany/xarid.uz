import { AxiosRequestConfig } from 'axios';

import { repo } from '../../config.json';

const { owner, name, branch, docsFolder } = repo;
const serviceUrl = `http://185.25.116.133:3535`;

export const getMainMarkdownConfig = (): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${owner}/${name}/${branch}//README.md`
});

export const getEntriesConfig = (path: string): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${owner}/${name}/${branch}/${path.replace(/\//g, '%2F')}`,
});

export const getMarkdownDocumentConfig = ({
  path,
  docName,
}: {
  path: string;
  docName: string;
}): AxiosRequestConfig => ({
  method: 'get',
  url: `${serviceUrl}/entries/${owner}/${name}/${branch}/${encodeURI(docsFolder)}${
    path ? `%2F${path}` : ''
  }/${docName}.md`,
});
