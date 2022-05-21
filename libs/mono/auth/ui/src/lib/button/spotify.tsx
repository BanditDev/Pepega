import React from 'react';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { SocialButton } from './social-button';

export const AuthButtonSpotify = () => (
  <SocialButton
    className="btn-social-spotify"
    provider="spotify"
    icon={faSpotify}
  />
);
