import React, { FC } from 'react';

import Styled from './centered-container.styles';

export const CenteredContainer: FC = ({ children }) => (
  <Styled.CenteredContainer alignment={{ horizontal: 'center', vertical: 'center' }}>
    {children}
  </Styled.CenteredContainer>
);
