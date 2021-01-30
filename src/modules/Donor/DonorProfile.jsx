import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DonorCard from 'modules/Donor/DonorCard';
import { getDonorProfile } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';

const DonorProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDonorProfile({ donorId: id }));
  }, []);

  const stats = useSelector((state) => state.stats);
  const donor = stats?.donorProfile?.[0];

  return (
    <>
      <h1>Donor Statistics</h1>
      {donor && <DonorCard donor={donor} />}
    </>
  );
};

export default DonorProfile;
