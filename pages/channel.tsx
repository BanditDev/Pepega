import Channel from '../components/Channel';
import Layout from '../layouts/Main';
import useRouter from '../hooks/useRouter';
import { Access } from '../helpers/Access';

const ChannelPage = () => {
  const router = useRouter();

  return (
    <Layout streams>
      <Access>
        <Channel userId={router.query.id} />
      </Access>
    </Layout>
  );
};

export default ChannelPage;