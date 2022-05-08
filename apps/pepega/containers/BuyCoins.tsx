import { darken, lighten } from 'polished';
import styled from 'styled-components';
import getConfig from 'next/config';
import { Button, CoinIconGreen } from '@pepega/components';
import { humanNumbers } from '@pepega/utils/count';
const { publicRuntimeConfig } = getConfig();

const Box = styled.div`
  max-width: 500px;
  width: 500px;
`;

const PercentComment = styled.div`
  font-size: 12.5px;
  padding: 10px 5px;
  color: ${({ theme }) => lighten(0.5, theme.colors.surface)};
`;

const CoinPackBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin: 8px 0;
  background: ${({ theme }) => darken(0.04, theme.colors.surface)};
  border-radius: 8px;
`;

const Amount = styled.div`
  font-size: 13px;
  padding: 0 4px;
  flex: 1;
`;

const Sale = styled.div`
  font-size: 12px;
  padding: 0 16px;
  color: ${({ theme }) => lighten(0.5, theme.colors.surface)};
`;

const BuyLink = styled.a`
  margin-left: auto;
`;

const realCoinPacks = {
  10: 0,
  100: 10,
  500: 15,
  1000: 20,
  5000: 30,
  10000: 40,
  25000: 60
};

const BuyCoinsPack = ({ packKey }) => {
  const amount = parseInt(packKey, 10);
  const sale = realCoinPacks[amount];
  const link = `${publicRuntimeConfig.apiUrl}robokassa/buy/real/${amount}`;
  const sum = amount - (amount / 100) * realCoinPacks[amount];

  return (
    <CoinPackBox key={amount}>
      <CoinIconGreen />
      <Amount>{humanNumbers(amount)}</Amount>
      <Sale>{sale > 0 && `Скидка ${sale}%`}</Sale>
      <BuyLink href={link}>
        <Button>{humanNumbers(sum)} ₽</Button>
      </BuyLink>
    </CoinPackBox>
  );
};

export const BuyCoins = () => (
  <Box>
    <PercentComment>
      * Цены указаны без учета комиссий платежных систем
    </PercentComment>
    {Object.keys(realCoinPacks).map(packKey => (
      <BuyCoinsPack key={packKey} packKey={packKey} />
    ))}
  </Box>
);
