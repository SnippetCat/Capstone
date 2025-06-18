import { createSlice } from "@reduxjs/toolkit";

import usersService from "../services/usersService";

const usersSlice = createSlice({
    name: "usersSlice",
    initialState: [],
    reducers: {
        stateInitialUsers: (state, action) => {
            return action.payload;
        }
    }
});

export const fetchUsersDBStore = () => {
    return async (dispatch) => {
        const users = await usersService.getUsers();
        console.log("Fetched Users!")
        dispatch(stateInitialUsers(users));
    }
}

export const { stateInitialUsers } = usersSlice.actions;
export default usersSlice.reducer;