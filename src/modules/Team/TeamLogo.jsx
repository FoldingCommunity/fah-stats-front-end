import React, { useState } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const styles = {
  dLogo: css`
    img {
      width: 2rem;
      height: 2rem;
      margin-right: 0.5rem;
    }
    .anticon {
      margin: 0 0.75rem 0 0.35rem;
      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  `,
};
const imageLoad = (logo) => (logo?.replace('http:', 'https:'));
const isDefaultImage = (logo) => (!logo || (logo && logo.includes('foldingathome.org')));
const TeamLogo = ({ logo, overrideStyles }) => {
  const [defaultLogo, setDefaultLogo] = useState(isDefaultImage(logo));

  return (
    <span css={[styles.dLogo, overrideStyles]}>
      {
        defaultLogo
          ? <TeamOutlined />
          : <img alt="" src={imageLoad(logo)} onError={() => setDefaultLogo(true)} />
      }
    </span>
  );
};

TeamLogo.propTypes = {
  logo: PropTypes.string, // eslint-disable-line
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  overrideStyles: PropTypes.object,
};
export default TeamLogo;
