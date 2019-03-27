import * as types from "../constants/actionTypes";
const initialState = [{ task: "khanh" }];

const tasks = (state = initialState, action) => {
  switch (action.types) {
    case types.LIST_ALL:
      return state;
    default:
      return state;
  }
  return state;
};
export default tasks;
