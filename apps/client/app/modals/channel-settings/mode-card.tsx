import React from 'react';
import clsx from 'clsx';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export const ChannelSettingsModeCard: React.FC = ({
  mode,
  active,
  openSettings,
  makeCurrent,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col shrink-0 overflow-hidden items-center justify-center cursor-pointer',
        'bg-background m-2 rounded-xl',
        'border-2 border-transparent',
        active && `${mode?.borderColor}`
      )}
    >
      <div className="w-full bg-background h-32 flex items-center justify-center text-center relative">
        <div className="flex flex-col">
          <span className="text-sm text-white font-medium mt-2">
            {mode?.title}
          </span>
          <span className="text-xs text-accent">{mode?.description}</span>
        </div>
        {active && (
          <CheckCircleIcon
            className={clsx('h-4 absolute right-2 top-2', mode?.color)}
          />
        )}
      </div>
      <div className="flex items-center justify-end w-full px-2 py-2">
        {active ? (
          <button
            className={clsx(
              'btn w-full',
              mode?.bgColor,
              `hover:${mode?.bgColorLight}`
            )}
            onClick={openSettings}
          >
            Settings
          </button>
        ) : (
          <>
            <button className="btn w-full mr-2" onClick={openSettings}>
              Settings
            </button>
            <button
              className={clsx(
                'btn w-full',
                mode?.bgColor,
                `hover:${mode?.bgColorLight}`
              )}
              onClick={makeCurrent}
            >
              Make Current
            </button>
          </>
        )}
      </div>
    </div>
  );
};
