import { ChannelMode } from '@dream/mono-types';
import {
  useMakeTwitchStreamModeCurrentMutation,
  useMakeSpotifyModeCurrentMutation,
  useMakeWaitlistYoutubeModeCurrentMutation,
} from './channel-settings.api';

export const useMakeModeCurrent = () => {
  const [makeTwitchStreamModeCurrentMutation] =
    useMakeTwitchStreamModeCurrentMutation();
  const [makeSpotifyModeCurrentMutation] = useMakeSpotifyModeCurrentMutation();
  const [makeMakeWaitlistYoutubeModeCurrentMutation] =
    useMakeWaitlistYoutubeModeCurrentMutation();

  return {
    makeModeCurrent: (mode: ChannelMode, channelId: string) => {
      console.log('setChannelMode', { mode, channelId });

      switch (mode) {
        case ChannelMode.Twitch:
          return makeTwitchStreamModeCurrentMutation({
            variables: { channelId },
          });
        case ChannelMode.Spotify:
          return makeSpotifyModeCurrentMutation({
            variables: { channelId },
          });
        case ChannelMode.Youtube:
          return makeMakeWaitlistYoutubeModeCurrentMutation({
            variables: { channelId },
          });
      }
    },
  };
};
