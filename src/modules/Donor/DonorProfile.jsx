import React, { useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import DonorCard from 'modules/Donor/DonorCard';
import { getDonorProfile } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';

const DonorProfile = () => {
  const dispatch = useDispatch();
  const { id, name } = useParams();
  const reg = new RegExp('^[0-9]+$');
  const { path } = useRouteMatch();
  const isOldPath = path === '/donor/:id';

  useEffect(() => {
    if (!isOldPath) {
      dispatch(getDonorProfile({ donorId: id, donorName: name }));
    } else if (id && !reg.test(id)) {
      dispatch(getDonorProfile({ donorId: undefined, donorName: id }));
    } else {
      dispatch(getDonorProfile({ donorId: id, donorName: name }));
    }
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
