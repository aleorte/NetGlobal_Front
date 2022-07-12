import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import AssignmentServices from "../services/assignmentsServices";

export const getAssignmentsBranch = createAsyncThunk(
  "GET_ASSIGNAMENTSBRANCH",
  async (branchId) => {
    const assignmentsBranch = await AssignmentServices.getAssignmentsBranch(
      branchId
    );
    return assignmentsBranch.data;
  }
);

export const getAssignmentsGuard=createAsyncThunk(
  "GET_ASSIGNAMENTSGUARD",
  async (guardId) => {
    const assignmentsGuard = await AssignmentServices.getAssignmentsGuard(
      guardId
    );
    return assignmentsGuard.data;
  }
);


export const addAssignmentsGuard = createAsyncThunk(
  "ADD_ASSIGNMENTGUARD",
  async (assignment) => {
    return AssignmentServices.addAssignmentsGuard(assignment);
  }
);

export const putAssignmentsGuard = createAsyncThunk(
  "PUT_ASSIGNMENTGUARD",
  async ({assignmentId,assignment}) => {
    return AssignmentServices.putAssignmentsGuard(assignmentId,assignment);
  }
);

export const deleteAssignment= createAsyncThunk(
  "DELETE_ASSIGNMENTGUARD",
  async (assignmentId) => {
    return AssignmentServices.deleteAssignment(assignmentId);
  }
);




const assignmentReducer = createReducer([], {
  [getAssignmentsBranch.fulfilled]: (state, action) => action.payload,
  [getAssignmentsBranch.rejected]: (state, action) => {
    return {
      assignmentsBranch: [],
      selectedAssignmentBranch: {},
      loading: false,
      error: action.error,
    };
  },
  [getAssignmentsGuard.fulfilled]: (state, action) => action.payload,
  [addAssignmentsGuard.fulfilled]: (state, action) => {
  },
  [putAssignmentsGuard.fulfilled]:(state,action)=>{
  },
  [deleteAssignment.fulfilled]:(state,action)=>{
  }
 
});

export default assignmentReducer;
