
import { useDispatch, useSelector } from "react-redux";

import Section from "./Section";
import { likePlaylist, likePlaylistDBStore, removePlaylist, removePlaylistDBStore, togglePlaylist, togglePlaylistDBStore } from "../reducers/playlistsReducer";
import { setNotification, setNotificationStore } from "../reducers/notificationReducer";

const Playlist = ({ playlist }) => {
    const dispatch = useDispatch();
    const loggedUser = useSelector((state) => state.loggedUser);

    const handleRemoval = () => {
        try {
            dispatch(removePlaylistDBStore(playlist, loggedUser.token))
            dispatch(setNotificationStore({ type: "info", message: `Successfully removed playlist ${playlist.name}!` }));
        } catch (error) {
            dispatch(setNotificationStore({ type: "warning", message: "Error removing playlist!" }));
        }
        setTimeout(() => {
            dispatch(setNotificationStore(null));
        }, 3000);

    }

    return (
        <Section componentTitle={playlist.name + " by " + playlist.creator}>
            {
                playlist.isEnabled ?
                    (<div>
                        {playlist.numOfSongs} songs
                        <br />
                        {playlist.likes} likes {""} <button type="button" onClick={() => dispatch(likePlaylistDBStore(playlist))}>Like</button>
                        <br />
                        Added by {playlist.user.username} {""} <button type="button" onClick={handleRemoval}>Remove the playlist</button>
                        <br />
                        <button onClick={() => dispatch(togglePlaylistDBStore(playlist))}>Hide Details</button>
                    </div>) :
                    (
                        <div>
                            <button onClick={() => dispatch(togglePlaylistDBStore(playlist))}>Show Details</button>
                        </div>
                    )
            }

        </Section>
    )
}

export default Playlist;