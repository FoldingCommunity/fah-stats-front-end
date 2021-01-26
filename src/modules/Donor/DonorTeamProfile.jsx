import React from 'react';
import PropTypes from 'prop-types';

const DonorTeamProfile = ({ team }) => (
  <>
    <h4>{`${team.name} (${team.team})`}</h4>
    <div>{`Score: ${team.score}`}</div>
    <div>{`WUs: ${team.wus}`}</div>
  </>
);
DonorTeamProfile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  team: PropTypes.object.isRequired,
};

export default DonorTeamProfile;
