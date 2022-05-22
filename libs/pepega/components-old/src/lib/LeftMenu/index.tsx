import { lighten } from 'polished';
import styled from 'styled-components';
export { MenuItem as Item } from './Item';
export { SubItemMenu as SubItem } from './SubItem';
export { SubItemMenuSkeleton as SubItemSkeleton } from './SubItemSkeleton';

export const Box = styled.div``;

export const Divider = styled.div`
  margin: 8px 0;
  height: 1px;
  background: ${({ theme }) => '#1D1E31'};
`;

export const LoadMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  font-size: 13px;
  color: ${({ theme }) => '#968A9D'};
  background: ${({ theme }) => lighten(0.001, '#262841')};
  cursor: pointer;

  :hover {
    background: ${({ theme }) => lighten(0.01, '#262841')};
  }

  i {
    font-size: 18px;
  }
`;
