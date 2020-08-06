import React, { FC } from 'react';
import coy from 'react-syntax-highlighter/dist/cjs/styles/prism/coy';
import CodeHighlighter from 'react-syntax-highlighter/dist/cjs/prism';

export const Code: FC<{ language: string; value: string }> = ({ language, value }) => {
  return (
    <CodeHighlighter
      language={language}
      style={coy}
      customStyle={{
        padding: 'var(--i-regular) 0',
        marginBottom: '0',
        marginTop: '0',
      }}
      codeTagProps={{
        style: {
          whiteSpace: 'pre-wrap',
        },
      }}
    >
      {value}
    </CodeHighlighter>
  );
};
