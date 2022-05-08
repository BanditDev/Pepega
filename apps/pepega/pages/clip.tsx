import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Clip } from '../containers/Clip/Clip';
import Layout from '../layouts/Main';
import { TopStreams } from '../containers/TopStreams';

const Box = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  max-width: 1200px;
`;

const Left = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const Right = styled.div`
  width: 320px;
  margin-right: 10px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const ClipPage = () => {
  const router = useRouter();
  const clipId = router.query.id;

  if (typeof clipId !== 'string') {
    return null;
  }

  return (
    <Layout>
      <Box>
        <Left>
          <Clip clipId={clipId} />
        </Left>
        <Right>
          <TopStreams position="column" max={3} />
        </Right>
      </Box>
    </Layout>
  );
};

export default ClipPage;
