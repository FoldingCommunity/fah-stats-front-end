import React from 'react';
import { PageHeader } from 'antd';
import { css } from '@emotion/react';
import { NavLink } from 'react-router-dom';

const styles = {
  header: css`
    padding: 0.5rem 2rem 0.5rem 0;
    background: #383838 none repeat scroll 0% 0%;
    box-shadow: #000000 0px 0px 8px 0px;
    vertical-align: bottom;
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
        <img alt="FOLDING@HOME" src="./logo-2.png" height="50" />
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
