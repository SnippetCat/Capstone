import { configureStore } from "@reduxjs/toolkit";
import loggedUserReducer from "../reducers/loggedUserReducer";
import playlistsReducer from "../reducers/playlistsReducer"
import notificationReducer from "../reducers/notificationReducer"

const storeThing = configureStore({
    reducer: {
        loggedUser: loggedUserReducer,
        playlists: playlistsReducer,
        notification: notificationReducer,
    }
})

export default storeThing;