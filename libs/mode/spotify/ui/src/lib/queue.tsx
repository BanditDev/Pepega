import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  useSpotifyModeQueueQuery,
  useSpotifyModeQueueUpdatedSubscription,
} from '@dream/types';
import { TrackFromList } from './components/track-from-list';
import { ViewListIcon } from '@heroicons/react/solid';
import { useCommunityChannel } from '@dream/community';

export const ChannelSpotifyModeQueue = ({ hidden = false, addTrackAccent }) => {
  const router = useRouter();
  const { channelId } = useCommunityChannel();

  const queueQuery = useSpotifyModeQueueQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  useSpotifyModeQueueUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onSubscriptionData: () => {
      queueQuery.refetch();
    },
  });

  const queueItems = queueQuery?.data?.spotifyModeQueue?.items || [];

  return (
    <div
      className={clsx(
        'flex flex-col shrink-0 justify-start py-2 overflow-hidden',
        !hidden && 'flex-1'
      )}
    >
      <div className="flex text-xs text-accent font-medium px-4 py-2 items-center">
        <ViewListIcon className="h-4 text-accent mr-2 opacity-50" />
        <span>Queue</span>
        <span className="opacity-50 ml-2">{queueItems?.length}/50</span>
        <Link
          href={{
            pathname: router.route,
            query: {
              ...router.query,
              spotifyModeAddTrack: 1,
            },
          }}
          passHref
        >
          <button
            className={clsx(
              'btn text-xs h-6 ml-auto',
              addTrackAccent ? 'btn-primary' : 'btn-secondary bg-surface'
            )}
          >
            Add Track
          </button>
        </Link>
      </div>
      {!hidden &&
        queueItems.map((item) => (
          <div key={item.data.id}>
            <TrackFromList
              cover={item.data.cover}
              artists={item.data.artists}
              title={item.data.title}
              avatar={item.data.author.avatar}
              info={item.data.author.name}
            />
          </div>
        ))}
    </div>
  );
};
