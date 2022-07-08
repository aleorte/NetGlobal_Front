import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import guardServices from "../services/guardServices";

export const getGuards = createAsyncThunk("GET_GUARDS", async () => {
  const guards = await guardServices.getGuards();
  return guards.data;
});

export const getGuard = createAsyncThunk("GET_GUARD", async (guardId) => {
  const guard = await guardServices.getGuard(guardId);
  return guard.data;
});

const guardsReducer = createReducer(
  { loading: false, guards: [], error: null },
  {
    [getGuards.fulfilled]: (state, action) => {
      const guards = action.payload;
      return { guards, loading: false, error: null };
    },
    [getGuards.pending]: (state) => {
      state.loading = true;
    },
    [getGuards.rejected]: (state, action) => {
      return { guards: [], loading: false, error: action.error };
    },

    [getGuard.fulfilled]: (state, action) =>action.payload,

    [getGuard.pending]: (state) => {
      state.loading = true;
    },
    [getGuard.rejected]: (state, action) => {
      return { guard: [], loading: false, error: action.error };
    },
  }
);

export default guardsReducer;
