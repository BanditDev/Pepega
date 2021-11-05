import React from 'react';
import { MainLayout } from '@dream/layouts/main';
import { MainCommunities } from '@dream/community';

export function IndexPage() {
  return (
    <MainLayout>
      <MainCommunities />
    </MainLayout>
  );
}

export default IndexPage;
