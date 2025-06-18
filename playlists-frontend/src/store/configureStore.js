import { configureStore } from "@reduxjs/toolkit";
import loggedUserReducer from "../reducers/loggedUserReducer";
import playlistsReducer from "../reducers/playlistsReducer"
import notificationReducer from "../reducers/notificationReducer"
import usersReducer from "../reducers/usersReducer"

const storeThing = configureStore({
    reducer: {
        loggedUser: loggedUserReducer,
        playlists: playlistsReducer,
        notification: notificationReducer,
        users: usersReducer,
    }
})

export default storeThing;