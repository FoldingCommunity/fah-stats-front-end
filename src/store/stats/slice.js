import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'stats',
  initialState: {},
  reducers: {
    myself: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.myself = action.payload;
    },
    donor: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.donor = action.payload;
    },
    donorMonthly: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.donorMonthly = action.payload;
    },
    donorProfile: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.donorProfile = action.payload;
    },
    team: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.team = action.payload;
    },
    teamProfile: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.teamProfile = action.payload;
    },
    teamMonthly: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.teamMonthly = action.payload;
    },
    os: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.os = action.payload;
    },
    project: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.project = action.payload;
    },
    projectProfile: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.projectProfile = action.payload;
    },
    server: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.server = action.payload;
    },
  },
});
export default slice;
