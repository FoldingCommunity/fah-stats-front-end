import slice from 'store/stats/slice';
import fetch from 'utils/fetch';

const statsHost = process.env.statsHost || '/stats';
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

// Actions
const {
  donor,
  team,
  teamMonthly,
  os,
} = slice.actions;
export const getTeamMonthly = ({
  teamId, teamName, teamNameSearchType, year, month,
}) => async (dispatch) => {
  try {
    const res = await fetch.get(`${apiHost}/team/monthly?month=7&year=2019`, {
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
  teamId, teamName, teamNameSearchType,
}) => async (dispatch) => {
  try {
    const res = await fetch.get(`${apiHost}/team`, {
      name: teamName,
      search_type: teamNameSearchType,
      team: teamId,
    });
    dispatch(team(res));
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
    dispatch(donor(res));
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
