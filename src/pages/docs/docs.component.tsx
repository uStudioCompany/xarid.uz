import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { useRequest } from 'honks';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { encodePath } from '../../utils';

import { Markdown } from '../../components/markdown';
import { CenteredContainer } from '../../components/centered-container';
import { FadeIn } from '../../components/fade-in';

import { getMarkdownDocument } from './docs.module';

export const DocsPage: React.FC = () => {
  const { path, docName } = useParams();

  const getSource = (): Promise<string> => {
    return getMarkdownDocument({
      path: encodePath(path),
      docName,
    });
  };

  const { sendRequest, onSuccess, onFail, onPending } = useRequest(getSource);

  useEffect(
    function getSourceDataOnMount() {
      sendRequest();
    },
    [path, docName]
  );

  return (
    <>
      <Helmet>
        <title>{docName}</title>
      </Helmet>
      <FadeIn>
        {onPending(() => {
          return (
            <CenteredContainer>
              <Flex alignment={{ horizontal: 'center' }}>
                <Spinner delay={500} appearance={{ size: 48 }} />
              </Flex>
            </CenteredContainer>
          );
        })}

        {onSuccess((data) => {
          return <Markdown source={data} />;
        })}

        {onFail((error) => {
          return (
            <CenteredContainer>
              <Text color="var(--c-negative)" align="center">
                {`${error.message} ☹️`}
              </Text>
            </CenteredContainer>
          );
        })}
      </FadeIn>
    </>
  );
};
