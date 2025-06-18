import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notificationSlice",
    initialState: "",
    reducers: {
        setNotification: (state, action) => {
            return action.payload;
        }
    }
});

export const setNotificationStore = (notification) => {
    return async (dispatch) => {
        dispatch(setNotification(notification));
    }
}

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;