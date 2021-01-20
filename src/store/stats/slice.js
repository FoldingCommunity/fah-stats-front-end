import { createSlice } from '@reduxjs/toolkit';

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
    os: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.os = action.payload;
    },
  },
});
export default slice;
