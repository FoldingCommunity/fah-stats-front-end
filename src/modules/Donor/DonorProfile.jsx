import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { PrettyDate, CertificateLink } from 'utils/format';
import DonorTeamProfile from 'modules/Donor/DonorTeamProfile';

const styles = {
  container: css`
    margin: 1rem 0;
  `,
  width5: css`
    width: 5rem;
  `,
  width10: css`
    width: 10rem;
  `,
  width15: css`
    width: 15rem;
  `,
  searchInput: css`
    position: relative;
  `,
  clearIcon: css`
    position: absolute;
    right: 0;
    padding: 0.5rem;
    cursor: pointer;
  `,
  teams: css`
    > div {
      margin-bottom: 1rem;
    }
  `,
  CertificateLink: css`
    margin-left: 0.5rem;
  `,
};
const DonorProfile = ({ donor }) => (
  <>
    <h2>{`${donor.name} (${donor.id})`}</h2>
    <div>{`Rank: ${donor.rank || donor.users} of ${donor.users}`}</div>
    <div>
      {`Score: ${donor.score}`}
      <span css={styles.CertificateLink}>
        <CertificateLink id={donor.id} type="score" text="My Score Certificate" />
      </span>
    </div>
    <div>
      {`WUs: ${donor.wus}`}
      <span css={styles.CertificateLink}>
        <CertificateLink id={donor.id} type="wus" text="My WUs Certificate" />
      </span>
    </div>
    <div>{`Active clients (within 50 days): ${donor.active_50}`}</div>
    <div>{`Active clients (within 7 days): ${donor.active_7}`}</div>
    { donor?.last && (
      <div>
        <span>Date of last Work Unit: </span>
        <PrettyDate date={donor.last} />
      </div>
    ) }
    <br />
    <h2>Teams</h2>
    <div css={styles.teams}>
      {donor?.teams?.map((team) => (<div><DonorTeamProfile team={team} /></div>))}
    </div>
    <br />
  </>
);
DonorProfile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  donor: PropTypes.object.isRequired,
};

export default DonorProfile;
