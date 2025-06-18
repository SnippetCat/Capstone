import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/loginService";

import { setNotification, setNotificationStore } from "./notificationReducer";

const loggedUserSlice = createSlice({
    name: "loggedUserSlice",
    initialState: null,
    reducers: {
        setLoggedUser: (state, action) => {
            return action.payload;
        }
    },
});

export const setUserStore = (userToken) => {
    return async (dispatch) => {
        dispatch(setLoggedUser(userToken));
    }
}

export const loginUserDBStore = (userCredentials) => {
    return async (dispatch) => {
        try {
            const loggedUser = await loginService.login(userCredentials);
            dispatch(setLoggedUser(loggedUser));
            localStorage.setItem("userCredentials", JSON.stringify(loggedUser))
            dispatch(setNotificationStore({ type: "info", message: "Login successful!" }))
        } catch (error) {
            dispatch(setNotificationStore({ type: "warning", message: "Login failed!" }));
        }
        setTimeout(() => {
            dispatch(setNotificationStore(null));
        }, 3000);
    }
}

export const logoutUserDBStore = () => {
    return async (dispatch) => {
        dispatch(setLoggedUser(null));
        localStorage.removeItem("userCredentials");
    }
}

export const { setLoggedUser } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;