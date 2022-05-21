import Link from 'next/link';
import styled from 'styled-components';
import { lighten, darken, rgba } from 'polished';

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
  height: 42px;
  background: ${({ theme }) => rgba(darken(0.06, theme.colors.primary), 0.9)};
  margin-bottom: 10px;
`;

const LogoImg = styled.img`
  height: 27px;
  width: 27px;
  margin-left: 18px;
  padding: 5px;
  cursor: pointer;
  background: ${({ theme }) => lighten(0.05, theme.colors.primary)};
  border-radius: 5px;
`;

const LogoTitle = styled.div`
  font-size: 13px;
  margin-left: 15px;
  color: ${({ theme }) => lighten(0.4, theme.colors.primary)};
  letter-spacing: 0.5px;
  font-weight: 500;
`;

export const LogoBox = () => {
  return (
    <Link href="/" passHref>
      <LogoLink>
        <LogoImg src={`/logo.svg`} />
        <LogoTitle>PepegaCom</LogoTitle>
      </LogoLink>
    </Link>
  );
};
