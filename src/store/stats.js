import { createSlice } from '@reduxjs/toolkit';
import fetch from 'utils/fetch';

// Slice
const slice = createSlice({
  name: 'stats',
  initialState: {},
  reducers: {
    donors: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.donors = action.payload;
    },
    teams: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.teams = action.payload;
    },
    teamsMonthly: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.teamsMonthly = action.payload;
    },
  },
});
export default slice.reducer;

// Actions
const { donors, teams, teamsMonthly } = slice.actions;
export const getTeamsMonthly = ({
  teamId, teamName, teamNameSearchType, year, month,
}) => async (dispatch) => {
  try {
    const res = await fetch.get('/teams-monthly', {
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
    const res = await fetch.get('/teams', {
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
    const res = await fetch.get('/donors', {
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
