import PapaParse from 'papaparse';
import axios from 'axios';

import { getCsvDocumentConfig } from '../../lib';
import { parseDocPath } from '../../utils';

export const getQueryFromHref = (href: string): string => {
  const matchedPath = href.match(/(?:\.csv).+$/) as [string] | null;

  if (matchedPath) {
    return matchedPath[0].slice(4);
  }

  return '';
};

const queryStringPattern = /\?([rc])=\d+((,\d+)*(-\d+)?)*(&([rc])=\d+((,\d+)*(-\d+)?)*)?/;
const numberQuery = /^\d+$/;
const rangeQuery = /^\d+-\d+$/;

const fillWithFilteredData = <E, D extends E[]>({
  query,
  newData,
  data,
}: {
  query: string[];
  newData: D;
  data: D;
}): void => {
  query.forEach((queryElement) => {
    if (numberQuery.test(queryElement)) {
      newData.push(data[+queryElement - 1]);
    }

    if (rangeQuery.test(queryElement)) {
      const [minValue, maxValue] = queryElement.split('-');

      newData.push(...data.filter((_, index) => index + 1 >= +minValue && index + 1 <= +maxValue));
    }
  });
};

const queryEngine = (data: string[][], queryString: string) => {
  const normalizedQueryString = queryString.toLowerCase().trim().replace(/ /g, '');

  if (!queryStringPattern.test(normalizedQueryString)) {
    console.error('Bad query string');

    return data;
  }

  let newData = /r/.test(normalizedQueryString) ? [] : data;
  const queryGroups = normalizedQueryString
    .replace(/\?/, '')
    .split('&')
    .sort((group) => (group[0] === 'c' ? 1 : -1));

  queryGroups.forEach((queryGroup) => {
    if (queryGroup[0] === 'r') {
      const rowsQuery = queryGroup.replace('r=', '').split(',');

      fillWithFilteredData({ query: rowsQuery, newData, data });
    }

    if (queryGroup[0] === 'c') {
      const colsQuery = queryGroup.replace('c=', '').split(',');

      newData = [
        ...newData.map((row) => {
          const newRow: string[] = [];

          fillWithFilteredData({ query: colsQuery, newData: newRow, data: row });

          return newRow;
        }),
      ];
    }
  });

  return newData;
};

export const csvFilter = ({ csvString, queryString = '' }: { csvString: string; queryString?: string }): string => {
  if (typeof csvString !== 'string') {
    throw new TypeError('CSV string not transferred as argument or it type is not "string"');
  }

  const normalizedCsvString = csvString.replace(/,(?=([^"]*"[^"]*")*[^"]*$)/gm, ';');

  if (!queryString) {
    return normalizedCsvString;
  }

  const { data: csvModel } = PapaParse.parse(normalizedCsvString, {
    delimiter: ';',
  });

  const filteredModel = queryEngine(csvModel, queryString);

  return PapaParse.unparse(filteredModel, {
    delimiter: ';',
  });
};

export const getCsvDocument = async (href: string): Promise<string> => {
  const {
    data: { content: source },
  } = await axios(getCsvDocumentConfig(parseDocPath(href, 'csv')));

  return csvFilter({ csvString: source, queryString: getQueryFromHref(href) });
};
