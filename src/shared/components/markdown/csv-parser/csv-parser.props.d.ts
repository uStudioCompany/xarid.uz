export interface CsvParserProps {
  patterns: {
    queryStringPattern: RegExp;
    numberQuery: RegExp;
    rangeQuery: RegExp;
  };
}
