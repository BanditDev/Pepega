import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useCreateChannelMutation } from '@dream/types';
import { urlNameRegExp } from '@dream/utils/regexp';
import { useCommunityChannel } from '../use-community-channel';

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(urlNameRegExp)
    .lowercase()
    .required('Required'),
});

export const NewChannel = () => {
  const router = useRouter();
  const origin = typeof window !== 'undefined' ? window?.location?.origin : '';

  const { community, communityId } = useCommunityChannel();

  const [createChannel] = useCreateChannelMutation({
    onCompleted: (data) => {
      router.push(
        `/${community?.name}/${data.createChannel.name}?channelSettings=mode`
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      title: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      createChannel({
        variables: { input: { ...values, communityId } },
      });
    },
  });

  const isError = Object.keys(formik.errors).length > 0;

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title" className="text-accent text-xs">
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        autoFocus
        minLength={1}
        maxLength={50}
        placeholder="Awesome Channel"
        onChange={formik.handleChange}
        value={formik.values.title}
        className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <div className="flex items-center mb-2">
        <label htmlFor="name" className="text-accent text-xs">
          {origin}/{community?.name}/
        </label>
        <input
          id="name"
          name="name"
          type="text"
          minLength={1}
          maxLength={50}
          placeholder="awesome"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1"
        />
      </div>

      <div className="flex w-full justify-end mt-2">
        <button
          type="submit"
          disabled={isError}
          className={clsx('btn btn-primary', isError && 'cursor-not-allowed')}
        >
          Create
        </button>
      </div>
    </form>
  );
};
