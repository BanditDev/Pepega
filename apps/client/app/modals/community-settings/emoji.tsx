import axios from 'axios';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { TrashIcon } from '@heroicons/react/20/solid';
import {
  useEmojisQuery,
  useDeleteEmojiMutation,
  useUpdateEmojiAliasMutation,
} from './emoji.api';
import { useCommunityChannel } from '@dream/mono-use-community-channel';

const EmojiAliasInput: React.FC<{
  emoji: { id: string; alias: string };
  onChange: (id: string, alias: string) => void;
}> = ({ emoji, onChange }) => {
  const [alias, setAlias] = useState(emoji.alias);

  return (
    <input
      className="bg-transparent focus:outline-none focus:bg-background group-hover:bg-background"
      value={alias}
      onChange={(e) => {
        const newAlias = e.target.value || emoji.alias;
        setAlias(newAlias);
        onChange(emoji.id, newAlias);
      }}
    />
  );
};

export const CommunitySettingsEmoji = () => {
  const { communityId } = useCommunityChannel();

  const emojisQuery = useEmojisQuery({
    variables: { communityId },
    skip: !communityId,
  });

  const [updateEmojiAlias] = useUpdateEmojiAliasMutation({
    onCompleted: () => emojisQuery.refetch(),
  });

  const [deleteEmoji] = useDeleteEmojiMutation({
    onCompleted: () => emojisQuery.refetch(),
  });

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    onDropAccepted: async (files) => {
      const token = await fetch('/api/auth/token')
        .then((res) => res.json())
        .then((data) => data?.token);

      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('communityId', communityId);

      await axios.post(
        `${process.env['NEXT_PUBLIC_MONO_API']}/emoji/upload`,
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      emojisQuery.refetch();
    },
    accept: {
      'image/*': ['.jpeg', '.png', '.gif'],
    },
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  const emojis = emojisQuery?.data?.emojis || [];
  const emojiCount = emojis.length;
  const availbleSlots = 50 - emojiCount;

  return (
    <div className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <button className="btn btn-primary" onClick={open}>
          Upload Emoji
        </button>
      </div>

      <div className="mt-8">
        <div className="py-2 text-accent text-xs uppercase">
          Emoji - {availbleSlots} slots availble
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th className="text-xs text-accent font-normal py-2">Emoji</th>
              <th className="text-xs text-accent font-normal py-2">Alias</th>
              <th className="text-xs text-accent font-normal py-2">
                Uploaded By
              </th>
            </tr>
          </thead>
          <tbody>
            {emojis.map((emoji) => (
              <tr key={emoji.id} className="group hover:bg-surface-light">
                <td className="p-2">
                  <img
                    alt=""
                    className="w-6 h-6 object-contain"
                    src={`https://cdn.sgmn.dev/emojis/${emoji.id}.${
                      emoji.type.split('/')[1]
                    }`}
                  />
                </td>
                <td>
                  <div className="px-2 text-sm">
                    <EmojiAliasInput
                      emoji={emoji}
                      onChange={(emojiId, alias) =>
                        updateEmojiAlias({
                          variables: { emojiId, alias },
                        })
                      }
                    />
                  </div>
                </td>
                <td>
                  <div className="px-2 flex items-center">
                    <div>
                      <img
                        alt=""
                        src={emoji.author?.avatar || ''}
                        className="h-6 w-6 rounded-full overflow"
                      />
                    </div>
                    <div className="px-2 text-xs text-accent">
                      {emoji.author?.name}
                    </div>
                  </div>
                </td>
                <td className="w-8">
                  <button
                    className="hidden group-hover:block"
                    onClick={() =>
                      deleteEmoji({ variables: { emojiId: emoji.id } })
                    }
                  >
                    <TrashIcon className="h-4 text-accent hover:text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
