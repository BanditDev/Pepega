import { XIcon } from '@heroicons/react/solid';
import { darken, lighten, rgba } from 'polished';
import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Portal } from './portal';

const BG = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  top: 0;
  left: 0;
  overflow: auto;
  z-index: 1000;
`;

const BGOut = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: ${({ theme }) => darken(0.05, '#1D1E31')};
  opacity: 0.95;
  z-index: 3000;
`;

const BoxW = styled.div`
  z-index: 3500;
  margin: auto;
  display: flex;

  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;

const BoxNav = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 60px;
  justify-content: center;
  color: ${({ theme }) => '#968A9D' && rgba('#968A9D', 0.5)};

  i {
    font-size: 40px;
  }

  :hover {
    color: ${({ theme }) => '#968A9D'};
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const Box = styled('div')<{
  minimal: boolean;
}>`
  min-width: 240px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin: auto;
  padding: 10px;
  z-index: 3500;
  display: flex;
  position: relative;
`;

const ModalB = styled('div')<{
  noBackgroud: boolean;
}>`
  background: ${({ theme, noBackgroud }) =>
    noBackgroud ? 'transparent' : '#262841' && lighten(0.01, '#262841')};
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const Header = styled('div')<{
  minimal: boolean;
}>`
  display: ${({ minimal }) => (minimal ? 'none' : 'flex')};
  align-items: center;
  height: 46px;
  background: ${({ theme }) => darken(0.1, '#6441A4')};
  border-radius: 4px 4px 0 0;

  @media (max-width: 700px) {
    border-radius: 0;
    display: flex;
  }
`;

const Title = styled.div`
  padding: 0 20px;
  font-size: 15px;
  color: ${({ theme }) => '#EEEEEE'};
`;

const CloseBox = styled.div`
  background: none;
  border: none;
  margin-left: auto;
  padding: 0 20px;
  font-size: 22px;
  color: ${({ theme }) => '#EEEEEE'};
  cursor: pointer;
  color: ${({ theme }) => lighten(0.3, '#6441A4')};

  :hover {
    color: ${({ theme }) => '#EEEEEE'};
  }

  @media (max-width: 700px) {
    top: 0;
    right: 0;
  }
`;

const CloseOut = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 0;
  background: none;
  border: none;
  margin-left: auto;
  width: 60px;
  justify-content: center;
  font-size: 30px;
  color: ${({ theme }) => '#968A9D' && rgba('#968A9D', 0.5)};
  cursor: pointer;

  :hover {
    color: ${({ theme }) => '#968A9D'};
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const Content = styled('div')<{
  minimal: boolean;
}>`
  padding: ${({ minimal }) => (minimal ? '0' : '15px')};
  display: flex;
`;

export type IModalProps = {
  onOpen: () => void;
  onClose: () => void;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  title?: string;
  visible: boolean;
  minimal: boolean;
  noBackgroud: boolean;
  children?: React.ReactNode;
};

export const Modal: FC<IModalProps> & {
  defaultProps: Partial<IModalProps>;
} = ({
  visible,
  children,
  title,
  onLeftClick,
  onRightClick,
  minimal,
  noBackgroud,
  onOpen,
  onClose,
}) => {
  const close = () => onClose();

  const escapeHandler = (e) => {
    if (e.keyCode === 27 && visible) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', escapeHandler);

    if (visible) {
      onOpen();
    }

    return () => {
      document.removeEventListener('keyup', escapeHandler);
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Portal selector="root-modal">
      <BG>
        <BGOut onClick={close} />
        <BoxW>
          <Box minimal={minimal}>
            {/* {minimal && (
              <BoxNav onClick={() => (onLeftClick ? onLeftClick() : close())}>
                {onLeftClick && <ChevronLeft />}
              </BoxNav>
            )} */}
            <ModalB noBackgroud={noBackgroud}>
              <Header minimal={minimal}>
                <Title>{title}</Title>
                <CloseBox onClick={close}>
                  <XIcon className="h-6" />
                </CloseBox>
              </Header>
              <Content minimal={minimal}>{children}</Content>
            </ModalB>
            {/* {minimal && (
              <BoxNav onClick={() => (onRightClick ? onRightClick() : close())}>
                {onRightClick && <ChevronRight />}
              </BoxNav>
            )} */}
          </Box>
          {minimal && (
            <CloseOut onClick={close}>
              <XIcon className="h-6" />
            </CloseOut>
          )}
        </BoxW>
      </BG>
    </Portal>
  );
};

Modal.defaultProps = {
  minimal: false,
  visible: false,
  noBackgroud: false,
  title: '',
  onOpen: () => undefined,
  onClose: () => undefined,
};