import { FC, ReactNode } from 'react';
import { useAccess } from '@pepega/hooks/useAccess';
import * as LeftMenu from '@pepega/components/LeftMenu';
import BaseLayout from './Base';
import { LogoBox } from '@pepega/containers/Nav/Left/Logo';
import { InsertChart } from 'styled-icons/material';

interface IProps {
  fixedTopContent?: ReactNode;
}

const ManageLayout: FC<IProps> = ({ children, fixedTopContent }) => {
  const [{ allow: isAllow }] = useAccess();

  if (!isAllow) {
    return null;
  }

  return (
    <BaseLayout
      fixedTopContent={fixedTopContent}
      leftMenu={
        <LeftMenu.Box>
          <LogoBox />
          <LeftMenu.Item
            route="/manage"
            equal
            icon={<InsertChart size="18px" />}
            title="Dashboard"
          />
        </LeftMenu.Box>
      }
    >
      {children}
    </BaseLayout>
  );
};

export default ManageLayout;
