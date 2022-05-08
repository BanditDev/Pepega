import Link from 'next/link';
import { darken } from 'polished';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { Grid } from '../../components';
import ClipGridView from './GridView';

const SectionBox = styled.div`
  padding: 40px 5px 10px;
`;

const SectionTitle = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;

  a {
    cursor: pointer;
  }
`;

const SectionDescription = styled.div`
  display: flex;
  width: 100%;
  font-size: 12px;
  color: ${({ theme }) => darken(0.4, theme.colors.text)};
`;

const PostContainer = styled.div`
  margin: 6px;
`;

interface IProps {
  clips: any;
  loading: boolean;
  hasMore: boolean;
  title?: string;
  description?: string;
  titleLink?: string;
  rows?: number;
  loadMore: () => Promise<any>;
  onPlay: (id: string) => void;
}

interface IState {
  layoutInLoadArea: boolean;
}

interface IProcess {
  browser: boolean;
}

declare let process: IProcess;

export class ClipsView extends PureComponent<IProps, IState> {
  public loadLock = false;

  constructor(props) {
    super(props);

    this.state = {
      layoutInLoadArea: false,
    };
  }

  scrollHandler = (e) => {
    const el = e.target;
    const offset = el.scrollHeight - el.scrollTop - el.clientHeight;
    const layoutInLoadArea = offset <= 250;

    if (this.state.layoutInLoadArea !== layoutInLoadArea) {
      this.setState({ layoutInLoadArea });
    }
  };

  componentDidMount() {
    if (process.browser && document) {
      const mainScroll = document.getElementById('mainScroll');

      if (mainScroll) {
        mainScroll.addEventListener('scroll', this.scrollHandler);
      }
    }
  }

  componentWillUnmount() {
    if (process.browser && document) {
      const mainScroll = document.getElementById('mainScroll');

      if (mainScroll) {
        mainScroll.removeEventListener('scroll', this.scrollHandler);
      }
    }
  }

  public componentDidUpdate() {
    const { loading, hasMore, loadMore } = this.props;
    const { layoutInLoadArea } = this.state;

    if (!this.loadLock && layoutInLoadArea && !loading && hasMore) {
      this.loadLock = true;

      loadMore().then(() => {
        this.loadLock = false;
      });
    }
  }

  public render() {
    const { clips, onPlay, title, description, rows, titleLink } = this.props;

    return (
      <Grid
        beforeRender={
          <>
            {title && !titleLink && (
              <SectionBox>
                <SectionTitle>{title}</SectionTitle>
                {description && (
                  <SectionDescription>{description}</SectionDescription>
                )}
              </SectionBox>
            )}
            {title && titleLink && (
              <SectionBox>
                <SectionTitle>
                  <Link href={titleLink} passHref>
                    <a>{title}</a>
                  </Link>
                </SectionTitle>
                {description && (
                  <SectionDescription>{description}</SectionDescription>
                )}
              </SectionBox>
            )}
          </>
        }
        maxRows={rows}
        items={clips}
        elementWidth={320}
        itemRender={(clip) => (
          <PostContainer key={clip.id}>
            <ClipGridView clip={clip} onPlay={() => onPlay(clip.id)} />
          </PostContainer>
        )}
      />
    );
  }
}
