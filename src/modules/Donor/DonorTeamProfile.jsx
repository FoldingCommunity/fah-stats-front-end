import React from 'react';
import PropTypes from 'prop-types';
import { PrettyCount } from 'utils/format';

const DonorTeamProfile = ({ team }) => (
  <>
    <h4>{`${team.name} (${team.team})`}</h4>
    <p>
      <span>Earned </span>
      <strong><PrettyCount count={team.score} /></strong>
      <span> points by contributing </span>
      <strong><PrettyCount count={team.wus} /></strong>
      <span> work units</span>
    </p>
  </>
);
DonorTeamProfile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  team: PropTypes.object.isRequired,
};

export default DonorTeamProfile;
