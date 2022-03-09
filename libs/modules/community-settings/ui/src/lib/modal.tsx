import React from 'react';
import { SettingsLayout } from '@dream/layouts/settings';
import { CommunitySettingsOverview } from './overview';
import { CommunitySettingsEmoji } from './emoji';

export const CommunitySettingsModal: React.FC = () => {
  return (
    <SettingsLayout
      id="communitySettings"
      menu={[
        {
          label: 'Channel Settings',
          items: [
            {
              key: 'overview',
              label: 'Overview',
              content: <CommunitySettingsOverview />,
            },
            {
              key: 'emoji',
              label: 'Emoji',
              content: <CommunitySettingsEmoji />,
            },
          ],
        },
        {
          items: [
            {
              key: 'delete-community',
              label: 'Delete Community',
              query: ({ query }) => {
                const { communitySettings, ...q } = query;
                return { ...q, deleteCommunity: 1 };
              },
            },
          ],
        },
      ]}
    />
  );
};