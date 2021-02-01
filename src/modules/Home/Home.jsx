import React from 'react';
import { css } from '@emotion/react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import MeAndTeams from 'modules/Home/MeAndTeams';

const { TabPane } = Tabs;
const myeStyles = {
  mye: css`
  line-height: 3.75rem;
`,
  ye: css`
    display: block;
  `,
  maximize: css`
    font-family: Oswald;
    font-size: 5rem;
    font-weight: 700;
    display: block;
  `,
  your: css`
    font-family: SaintEliaRough;
    font-size: 4.5rem;
    font-weight: 700;
    color: #fe6215;
    margin-right: 1rem;
  `,
  effort: css`
    font-family: Oswald;
    font-size: 3rem;
    font-weight: 700;
  `,
};
const styles = {
  container: css`
    margin-top: 1rem;
  `,
  intro: css`
    display: flex;
    flex-wrap: wrap;
    > h2 {
      width: 350px;
    }
    > div {
      flex: 1;
      vertical-align:top;
    }
  `,
  tabbedContent: css`
    .ant-tabs-nav {
      margin: 0;
      padding: 0;
    }
  `,
  tabPaneContent: css`
    background-color: white;
    padding: 1rem;
  `,
};
const Iframe = ({
  title, src, height, width,
}) => (
  <iframe title={title} src={src} height={height} width={width} />
);
Iframe.propTypes = {
  title: PropTypes.string, // eslint-disable-line
  src: PropTypes.string, // eslint-disable-line
  height: PropTypes.string, // eslint-disable-line
  width: PropTypes.string, // eslint-disable-line
};
const Home = () => (
  <div css={styles.container}>
    <p>
      On this page you will find access to statistics for individuals
      and teams who have joined together to earn points and compete
      with other teams. Some of us are quite intense in our approach
      to folding. We have team websites, we supe up our computers,
      and we drive the technology forward by reporting bugs and making
      suggestions about how to improve the software.
    </p>
    <div css={styles.intro}>
      <h2 css={myeStyles.mye}>
        <span css={myeStyles.maximize}>MAXIMIZE</span>
        <span css={myeStyles.ye}>
          <span css={myeStyles.your}>your</span>
          <span css={myeStyles.effort}>EFFORT</span>
        </span>
      </h2>
      <div>
        <h2>Set up your team</h2>
        <p>
          One of the best ways to help Folding@home is by recruiting
          your friends and family. Start by sharing our project with
          them. Then join a team or even start your own team. The more
          points your team earns, the closer we come to finding cures.
          If you are interested in setting up a team of your own, you can get started here.
        </p>
      </div>
    </div>
    <Tabs type="card" css={styles.tabbedContent}>
      <TabPane tab="Me & My Teams" key="1" css={styles.tabPaneContent}>
        <MeAndTeams />
      </TabPane>
      <TabPane tab="Create / Modify a Team" key="2" css={styles.tabPaneContent}>
        <Iframe title="" src="https://apps.foldingathome.org/team" height="400" width="100%" />
      </TabPane>
    </Tabs>
  </div>
);

export default Home;
