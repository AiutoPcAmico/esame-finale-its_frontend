import { createSlice } from "@reduxjs/toolkit";

export const sessionInfo = createSlice({
  name: "sessionInfo",
  initialState: {
    pages: null,
    user: {
      username: null,
    },
    sessionStarted: null,
    sessionExpire: null,
    sessionToken: null,
  },
  reducers: {
    setSessionDetails: (state, actions) => {
      //check if i have already the item in the array
      state.sessionStarted = actions.payload.sessionStarted;
      state.sessionExpire = actions.payload.sessionExpire;
      state.sessionToken = actions.payload.sessionToken;
    },

    setSessionUser: (state, actions) => {
      state.user.username = actions.payload.username;
    },

    destroySession: (state, actions) => {
      console.log("session destroyed");
      state.user.username = null;
      state.sessionToken = null;
      state.sessionExpire = null;
      state.sessionStarted = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSessionDetails, setSessionUser, destroySession } =
  sessionInfo.actions;

export default sessionInfo.reducer;
