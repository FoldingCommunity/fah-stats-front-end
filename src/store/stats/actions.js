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

// Actions
const {
  myself,
  donor,
  donorMonthly,
  team,
  teamMonthly,
  os,
} = slice.actions;
export const getTeamMonthly = ({
  year, month,
}) => async (dispatch) => {
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

export const getTeam = ({
  teamName,
}) => async (dispatch) => {
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

export const getDonorMonthly = ({
  year, month,
}) => async (dispatch) => {
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

export const getDonor = ({
  donorName,
}) => async (dispatch) => {
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

export const getDonorByName = ({
  donorName,
}) => async (dispatch) => {
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
