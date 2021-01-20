import slice from 'store/stats/slice';
import fetch from 'utils/fetch';

const statsHost = process.env.statsHost || '/stats';
const apiHost = process.env.apiHost || '/api';

// Actions
const {
  donors,
  teams,
  teamsMonthly,
  os,
} = slice.actions;
export const getTeamsMonthly = ({
  teamId, teamName, teamNameSearchType, year, month,
}) => async (dispatch) => {
  try {
    const res = await fetch.get(`${statsHost}/api/teams-monthly`, {
      name: teamName,
      search_type: teamNameSearchType,
      team: teamId,
      month,
      year,
    });
    dispatch(teamsMonthly(res));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const getTeams = ({
  teamId, teamName, teamNameSearchType,
}) => async (dispatch) => {
  try {
    const res = await fetch.get(`${statsHost}/api/teams`, {
      name: teamName,
      search_type: teamNameSearchType,
      team: teamId,
    });
    dispatch(teams(res));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const getDonors = ({
  teamId, donorName, donorNameSearchType,
}) => async (dispatch) => {
  try {
    const res = await fetch.get(`${statsHost}/api/donors`, {
      name: donorName,
      search_type: donorNameSearchType,
      team: teamId,
    });
    dispatch(donors(res));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};

export const getOs = () => async (dispatch) => {
  try {
    const formatOsList = (list) => {
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
    const res = await fetch.get(`${apiHost}/os`);
    dispatch(os(formatOsList(res)));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
};
