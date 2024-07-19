import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  chats: [],
  users:[],
  loading: false,
  error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      signInStart: (state) => {
        state.loading = true;
        state.error = false;
      },
      signInSuccess: (state, action) => {
        state.currentUser = action.payload; 
        state.loading = false;
        state.error = false;
      },
      signInFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      signInAlert: (state) => {
        state.loading = false;
        state.error = false;
      },
      signUpStart: (state) => {
        state.loading = true;
        state.error = false;
      },
      signUpSuccess: (state) => { 
        state.loading = false;
        state.error = false;
      },
      signUpFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      chatGotAll(state, action) {
        state.chats = action.payload;
      },
      chatGotAllFailure(state, action) {
        state.error = action.payload;
      },
      usersGotAll(state, action) {
        state.users = action.payload;
      },
      usersGotAllFailure(state, action) {
        state.error = action.payload;
      },
      signOut(state) {
        state.currentUser = null;
        state.chats = [];
        state.users = [];
        state.loading = false;
        state.error = false;
      },
    },
  });
  export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signUpStart,
    signUpSuccess,
    signUpFailure,
    chatGotAll,
    chatGotAllFailure,
    usersGotAll,
    usersGotAllFailure,
    signOut
  } = userSlice.actions;
  export default userSlice.reducer;
  