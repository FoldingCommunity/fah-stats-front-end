import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeamCard from 'modules/Team/TeamCard';
import TeamMembers from 'modules/Team/TeamMembers';
import { getTeamProfile, getTeamMembers } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';

const TeamProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getTeamProfile({ teamId: id }));
    dispatch(getTeamMembers({ teamId: id }));
  }, []);

  const stats = useSelector((state) => state.stats);
  const team = stats?.teamProfile?.[0];

  return (
    <>
      <h1>Team Statistics</h1>
      {team && (
        <>
          <TeamCard team={team} />
          <br />
          <h2>Team Donors</h2>
          <TeamMembers />
        </>
      )}
    </>
  );
};

export default TeamProfile;
