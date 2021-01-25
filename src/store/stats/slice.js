import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'stats',
  initialState: {},
  reducers: {
    donor: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.donors = action.payload;
    },
    team: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.team = action.payload;
    },
    teamMonthly: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.teamMonthly = action.payload;
    },
    os: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.os = action.payload;
    },
  },
});
export default slice;