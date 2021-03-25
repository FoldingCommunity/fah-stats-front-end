import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import MeAndTeams from 'modules/Home/MeAndTeams';
import DonorMonthlyMini from 'modules/Donor/Monthly/DonorMonthlyMini';
import TeamMonthlyMini from 'modules/Team/Monthly/TeamMonthlyMini';
import { Row, Col } from 'antd';

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
    padding: 0 1rem;
    > div {
      transform: scale(0.9);
      width: 33%;
    }
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
          Help Folding@home study proteins at the smallest scales by recruiting your friends and family.
          Tell them about the Folding@home project, and then join or start your own team.
          The more points your team earns, the more we can progress research on diseases like COVID-19, Alzheimer&apos;s disease, and cancers!
          If you are interested in setting up a team of your own, you can get started
          <a href="/team">here</a>
          .
        </p>
      </div>
    </div>
    <Row css={styles.tabPaneContent}>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        <h2>My Donor Profile</h2>
        <MeAndTeams />
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        <h2>Top Donors</h2>
        <DonorMonthlyMini />
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        <h2>Top Teams</h2>
        <TeamMonthlyMini />
      </Col>
    </Row>
  </div>
);

export default Home;
