import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import playlistService from "../services/playlistService";

// Playlist element consists of likes and isEnabled
const playlistsSlice = createSlice({
    name: "playlistsSlice",
    initialState: [],
    reducers: {
        setInitialPlaylists: (state, action) => {
            return action.payload;
        },
        addPlaylist: (state, action) => {
            state.push(action.payload);
        },
        likePlaylist: (state, action) => {
            return state.map(p => p.id == action.payload.id ? { ...p, likes: p.likes + 1 } : p);
        },
        togglePlaylist: (state, action) => {
            return state.map(p => p.id == action.payload.id ? { ...p, isEnabled: !(p.isEnabled) } : p);
        },
        removePlaylist: (state, action) => {
            return state.filter(p => !(p.id == action.payload.id))
        }
    }
});

export const fetchPlaylistsDBStore = () => {
    return async (dispatch) => {
        const playlists = await playlistService.getPlaylists();
        dispatch(setInitialPlaylists(playlists));
    }
}

export const addPlaylistDBStore = (playlist, token) => {
    return async (dispatch) => {
        const addedPlaylist = await playlistService.postPlaylist(playlist, token);
        dispatch(addPlaylist(addedPlaylist));
    }
}

export const likePlaylistDBStore = (playlist) => {
    return async (dispatch) => {
        const likedPlaylist = await playlistService.likePlaylist(playlist);
        dispatch(likePlaylist(likedPlaylist));
    }
}

export const togglePlaylistDBStore = (playlist) => {
    return async (dispatch) => {
        const toggledPlaylist = await playlistService.togglePlaylist(playlist);
        dispatch(togglePlaylist(toggledPlaylist));
    }
}

export const removePlaylistDBStore = (playlist, token) => {
    return async (dispatch) => {
        const deletedPlaylist = await playlistService.removePlaylist(playlist, token);
        dispatch(removePlaylist(playlist));
    }
}

export const { setInitialPlaylists, addPlaylist, likePlaylist, removePlaylist, togglePlaylist } = playlistsSlice.actions;
export default playlistsSlice.reducer;
