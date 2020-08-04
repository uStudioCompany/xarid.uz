import styled from 'styled-components';

const NavList = styled.nav`
  a {
    position: relative;

    &:before {
      content: '';
      display: block;

      position: absolute;
      left: 0;
      top: calc(50% - (var(--i-medium) / 2));

      width: var(--i-medium);
      height: var(--i-medium);

      border-radius: var(--i-medium);
      background-image: radial-gradient(circle,var(--c-dark) 0%,var(--c-neutral) 50%,var(--c-dark) 0%);
      opacity: 0;

      transition: var(--transition);
    }
  }

  a.current-page {
    padding-left: var(--i-regular);

    color: var(--c-dark);

    pointer-events: none;
    user-select: none;

    &:focus {
      &:after {
        content: none;
      }
    }

    &:before {
      opacity: 1;
    }
  }
`;

export default { NavList };
