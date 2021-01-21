import slice from 'store/stats/slice';
import fetch from 'utils/fetch';

const statsHost = process.env.statsHost || 'https://stats.foldingathome.org';
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
  donor,
  team,
  teamMonthly,
  os,
} = slice.actions;
export const getTeamMonthly = ({
  year, month, teamId, teamName, teamNameSearchType,
}) => async (dispatch) => {
  try {
    const res = await fetch.get(`${apiHost}/team/monthly`, {
      name: teamName,
      search_type: teamNameSearchType,
      team: teamId,
      month,
      year,
    });
    dispatch(teamMonthly(formatList(res)));
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

export const getDonor = ({
  teamId, donorName, donorNameSearchType,
}) => async (dispatch) => {
  try {
    const res = await fetch.get(`${statsHost}/api/donors`, {
      name: donorName,
      search_type: donorNameSearchType,
      team: teamId,
    });
    const res2 = (res?.results?.constructor === Array ? res : []);
    dispatch(donor(res2));
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
