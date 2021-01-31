import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectCard from 'modules/Project/ProjectCard';
import { getProjectProfile } from 'store/stats/actions';
import { useDispatch, useSelector } from 'react-redux';

const ProjectProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProjectProfile({ projectId: id }));
  }, []);

  const stats = useSelector((state) => state.stats);
  const project = stats?.projectProfile?.[0];

  return (
    <>
      <h1>Project Statistics</h1>
      {project && <ProjectCard project={project} />}
    </>
  );
};

export default ProjectProfile;
