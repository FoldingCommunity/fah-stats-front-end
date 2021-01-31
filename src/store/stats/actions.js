import slice from 'store/stats/slice';
import fetch from 'utils/fetch';

const apiHost = process.env.apiHost || 'https://api2.foldingathome.org';
const formatList = (list) => {
  const kvList = [];
  let keys;
  list?.forEach((item, i) => {
    if (i === 0) {
      keys = item;
    } else {
      const listItem = {};
      keys.forEach((key, j) => {
        listItem[key] = item?.[j];
      });
      kvList.push(listItem);
    }
  });
  return kvList;
};
const formatResult = (res) => {
  let kvList = [];

  switch (res.constructor) {
    case Array: kvList = res; break;
    case Object: kvList = [res]; break;
    default:
  }
  if (res?.status === 'error') { kvList = []; }
  return kvList;
};
const formatServers = (res) => {
  const ws = {};

  Object.keys(res).forEach((domain) => {
    let ip;
    let cloned;

    (res[domain]?.ws || []).forEach((server) => {
      cloned = { ...server };
      ip = cloned.address;
      cloned.type = (cloned.is_cs && !cloned?.jobs?.total ? 'CS' : 'WS');

      ws[ip] = { ...ws[ip], ...cloned };
    });

    cloned = { ...res[domain] };
    delete cloned.ws;
    ip = cloned.address;
    cloned.type = 'AS';
    ws[ip] = { ...cloned, ...ws[ip] };
  });

  return Object.values(ws);
};

// Actions
const {
  myself,
  donor,
  donorMonthly,
  donorProfile,
  team,
  teamMonthly,
  teamProfile,
  os,
  project,
  projectProfile,
  server,
} = slice.actions;

export const getTeamMonthly = ({ year, month }) => async (dispatch) => {
  try {
    const res = await fetch.get(`${apiHost}/team/monthly`, {
      month,
      year,
    });
    dispatch(teamMonthly(formatResult(res)));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const getTeam = ({ teamName }) => async (dispatch) => {
  try {
    const url = (teamName ? `${apiHost}/team/find` : `${apiHost}/team`);
    const res = await fetch.get(url, {
      name: teamName,
    });

    dispatch(team(formatResult(res)));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const getDonorMonthly = ({ year, month }) => async (dispatch) => {
  try {
    const res = await fetch.get(`${apiHost}/user/monthly`, {
      month,
      year,
    });
    dispatch(donorMonthly(formatResult(res)));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const getDonor = ({ donorName }) => async (dispatch) => {
  try {
    const url = (donorName ? `${apiHost}/user/find` : `${apiHost}/user`);
    const res = await fetch.get(url, {
      name: donorName,
    });
    dispatch(donor(formatResult(res)));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const getOs = () => async (dispatch) => {
  try {
    const res = await fetch.get(`${apiHost}/os`);
    dispatch(os(formatList(res)));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const getProject = () => async (dispatch) => {
  try {
    const resAs = await fetch.get(`${apiHost}/as`);
    if (resAs?.[0]) {
      const res = await fetch.get(`https://${resAs?.[0]}/api/project/summary`);
      dispatch(project(formatResult(res)));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const getServer = () => async (dispatch) => {
  try {
    const res = {};
    const domains = await fetch.get(`${apiHost}/as`);

    await Promise.all(domains.map(async (domain) => {
      res[domain] = await fetch.get(`https://${domain}/api/ws/summary`);
    }));
    dispatch(server(formatServers(res)));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

const getDonorByNameId = ({
  donorName, donorId, action, isMyself,
}) => async (dispatch) => {
  try {
    dispatch(action([]));

    const computedDonorName = donorName || (isMyself && localStorage.getItem('donorName'));
    const computedDonorId = donorId || (isMyself && localStorage.getItem('donorId'));
    if (!computedDonorName && !computedDonorId) {
      return;
    }

    let res;
    if (computedDonorId) {
      res = await fetch.get(`${apiHost}/uid/${computedDonorId}`);
    } else if (computedDonorName) {
      res = await fetch.get(`${apiHost}/user/find`, { name: computedDonorName });
    }

    const formattedRes = formatResult(res);
    if (isMyself && formattedRes.length) {
      localStorage.setItem('donorName', formattedRes?.[0]?.name);
      localStorage.setItem('donorId', formattedRes?.[0]?.id);
    }
    dispatch(action(formattedRes));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const getDonorProfile = ({ donorName, donorId }) => async (dispatch) => {
  dispatch(getDonorByNameId({
    donorName, donorId, action: donorProfile,
  }));
};

export const getDonorMyself = ({ donorName, donorId }) => async (dispatch) => {
  dispatch(getDonorByNameId({
    donorName, donorId, action: myself, isMyself: true,
  }));
};

export const clearDonorMyself = () => async (dispatch) => {
  try {
    localStorage.removeItem('donorName');
    dispatch(myself());
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const getTeamProfile = ({
  teamName, teamId,
}) => async (dispatch) => {
  try {
    dispatch(teamProfile([]));

    const computedTeamName = teamName;
    const computedTeamId = teamId;
    if (!computedTeamName && !computedTeamId) {
      return;
    }

    let res;
    if (computedTeamId) {
      res = await fetch.get(`${apiHost}/team/${computedTeamId}`);
    } else if (computedTeamName) {
      res = await fetch.get(`${apiHost}/team/find`, { name: computedTeamName });
    }

    const formattedRes = formatResult(res);
    dispatch(teamProfile(formattedRes));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const getProjectProfile = ({
  projectId,
}) => async (dispatch) => {
  try {
    dispatch(projectProfile([]));

    const computedProjectId = projectId;
    if (!computedProjectId) {
      return;
    }

    let res;
    if (computedProjectId) {
      res = await fetch.get(`${apiHost}/project/${computedProjectId}`);
      const formattedRes = formatResult(res);
      dispatch(projectProfile(formattedRes));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};
