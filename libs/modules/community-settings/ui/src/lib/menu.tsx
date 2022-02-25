import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ItemLink = ({ title, selected = false, query = (r) => ({}) }) => {
  const router = useRouter();

  return (
    <div>
      <Link href={{ pathname: router.pathname, query: query(router) }} passHref>
        <a
          href="replace"
          className={clsx(
            'btn w-full justify-start my-0.5',
            selected ? 'bg-surface text-white' : 'text-accent'
          )}
        >
          {title}
        </a>
      </Link>
    </div>
  );
};

const Divider = () => <div className="border-b border-surface-light m-1.5" />;

export const CommunitySettingsMenu: React.FC = () => {
  const router = useRouter();
  const section = router.query['communitySettings'];

  return (
    <div className="px-2">
      <div className="text-accent text-xs px-3 mb-2 font-medium uppercase opacity-75">
        Community Settings
      </div>
      <ItemLink
        title="Overview"
        selected={section === 'overview'}
        query={({ query }) => ({ ...query, communitySettings: 'overview' })}
      />
      <ItemLink
        title="Emoji"
        selected={section === 'emoji'}
        query={({ query }) => ({ ...query, communitySettings: 'emoji' })}
      />
      <Divider />
      <ItemLink
        title="Delete Community"
        query={({ query }) => {
          const { communitySettings, ...q } = query;
          return { ...q, deleteCommunity: 1 };
        }}
      />
    </div>
  );
};
