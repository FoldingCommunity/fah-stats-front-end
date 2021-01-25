import React from 'react';
import { PageHeader } from 'antd';
import { css } from '@emotion/react';
import { NavLink } from 'react-router-dom';

const styles = {
  header: css`
    padding: 0.5rem 2rem 0.5rem 0;
    vertical-align: bottom;
    margin: 0 auto;
  `,
  logo: css`
    margin: 0;
    font-family: Oswald;
    > img {
      margin-right: 1rem;
      padding-right: 1rem;
      border-right: 1px solid #fe6215;
    }
    > span {
      font-family: Oswald;
      font-size: 2rem;
      color: white;
      text-transform: uppercase;
      vertical-align: middle;
    }
  `,
  link: css`
    display: inline-block;
    font-family: Raleway;
    font-weight: 400;
    font-size: 1.1rem;
    color: white;
    border-bottom: 2px solid transparent;
    padding: .5rem 1rem;
    transition: border-color .25s ease-in-out;
    &:hover, &.active {
      color: white;
      border-bottom-color: #fe6215;
    }
  `,
};
const Header = () => (
  <PageHeader
    css={styles.header}
    title={(
      <NavLink to="/">
        <span css={styles.logo}>
          <img alt="FOLDING@HOME" src="./logo-2.png" height="50" />
          <span>Statistics</span>
        </span>
      </NavLink>
      )}
    extra={[
      <NavLink key="0" to="/" css={styles.link} exact>Home</NavLink>,
      <NavLink key="1" to="/team-monthly" css={styles.link}>Team Monthly</NavLink>,
      <NavLink key="2" to="/team" css={styles.link}>Team</NavLink>,
      <NavLink key="3" to="/donor" css={styles.link}>Donor</NavLink>,
      <NavLink key="4" to="/os" css={styles.link}>OS</NavLink>,
    ]}
  />
);

export default Header;
