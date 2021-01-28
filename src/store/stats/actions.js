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
  team,
  teamMonthly,
  os,
  project,
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

export const getDonorByName = ({ donorName }) => async (dispatch) => {
  const computedDonorName = donorName || localStorage.getItem('donorName');

  if (!computedDonorName) {
    dispatch(myself([]));
    return;
  }
  try {
    const res = await fetch.get(`${apiHost}/user/find`, {
      name: computedDonorName,
    });
    const formattedRes = formatResult(res);
    if (formattedRes.length) {
      localStorage.setItem('donorName', computedDonorName);
    }
    dispatch(myself(formattedRes));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const clearDonorByName = () => async (dispatch) => {
  try {
    localStorage.removeItem('donorName');
    dispatch(myself());
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};
