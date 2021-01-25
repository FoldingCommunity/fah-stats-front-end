import React from 'react';
import { css } from '@emotion/react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

const { TabPane } = Tabs;
const styles = {
  container: css`
    margin: 2rem 1rem;
  `,
  mye: css`
    line-height: 3.75rem;
  `,
  maximize: css`
    font-family: Oswald;
    font-size: 5rem;
    font-weight: 700;
    display: block;
  `,
  ye: css`
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
  flex: css`
    display: flex;
    flex-wrap: wrap;
  `,
  tabbedContent: css`
    flex-grow: 1;
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
    <div css={styles.flex}>
      <div style={{ width: '25rem', padding: '1rem' }}>
        <p>
          On this page you will find access to statistics for individuals
          and teams who have joined together to earn points and compete
          with other teams. Some of us are quite intense in our approach
          to folding. We have team websites, we supe up our computers,
          and we drive the technology forward by reporting bugs and making
          suggestions about how to improve the software.
        </p>
        <h2 css={styles.mye}>
          <span css={styles.maximize}>MAXIMIZE</span>
          <span css={styles.ye}>
            <span css={styles.your}>your</span>
            <span css={styles.effort}>EFFORT</span>
          </span>
        </h2>
        <h2>Set up your team</h2>
        <p>
          One of the best ways to help Folding@home is by recruiting
          your friends and family. Start by sharing our project with
          them. Then join a team or even start your own team. The more
          points your team earns, the closer we come to finding cures.
        </p>
        <p>If you are interested in setting up a team of your own, you can get started here.</p>
      </div>
      <Tabs type="card" css={styles.tabbedContent}>
        <TabPane tab="Me & My Team" key="1" />
        <TabPane tab="Start a Team" key="2">
          <Iframe title="" src="https://apps.foldingathome.org/team" height="500" width="100%" />
        </TabPane>
        <TabPane tab="Modify my Team" key="3">
          <Iframe title="" src="https://apps.foldingathome.org/team" height="500" width="100%" />
        </TabPane>
      </Tabs>
    </div>
  </div>
);

export default Home;
