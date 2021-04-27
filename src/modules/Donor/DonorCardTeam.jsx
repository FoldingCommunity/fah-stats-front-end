import React from 'react';
import PropTypes from 'prop-types';
import { PrettyCount } from 'utils/format';
import { Link } from 'react-router-dom';

const DonorCardTeam = ({ team }) => (
  <>
    <h4>
      <Link to={`/team/${team.team}`}>
        {`${team.name} (${team.team})`}
      </Link>
    </h4>
    <p>
      <span>Earned </span>
      <strong><PrettyCount count={team.score} /></strong>
      <span> points by contributing </span>
      <strong><PrettyCount count={team.wus} /></strong>
      <span> work units</span>
    </p>
  </>
);
DonorCardTeam.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  team: PropTypes.object.isRequired,
};

export default DonorCardTeam;
