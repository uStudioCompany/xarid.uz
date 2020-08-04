import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useRequest } from 'honks';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';
import { useRequestConfig } from '../../shared/services/request-config';

import { encodePath } from '../../shared/utils';

import { Markdown } from '../../shared/components/markdown';
import { CenteredContainer } from '../../shared/components/centered-container';
import { FadeIn } from '../../shared/components/fade-in';

export const DocsPage: React.FC = () => {
  const { path, docName } = useParams();
  const { getMarkdownDocumentConfig } = useRequestConfig();

  const { sendRequest, onSuccess, onFail, onPending } = useRequest(
    async (): Promise<string> => {
      const {
        data: { content: source },
      } = await axios(getMarkdownDocumentConfig({ path: encodePath(path), docName }));

      return source;
    }
  );

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
