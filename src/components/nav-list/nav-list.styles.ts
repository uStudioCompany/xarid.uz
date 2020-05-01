import styled from 'styled-components';
import { Mixin } from 'ustudio-ui/theme';

const Button = styled.button`
  ${Mixin.Font.bodyRegular()};

  margin-top: var(--i-medium);
`;

export default { Button };
