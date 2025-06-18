import { useDispatch, useSelector } from "react-redux";
import { addPlaylist, addPlaylistDBStore } from "../reducers/playlistsReducer";
import { setNotification, setNotificationStore } from "../reducers/notificationReducer";
const PlaylistForm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.loggedUser).token;

    const handleAddition = (event) => {
        try {
            event.preventDefault();

            const newPlaylist = {
                name: event.target.name.value,
                creator: event.target.creator.value,
                numOfSongs: event.target.noSongs.value,
                likes: event.target.likes.value
            };

            dispatch(addPlaylistDBStore(newPlaylist, token));

            event.target.name.value = "";
            event.target.creator.value = "";
            event.target.noSongs.value = "";
            event.target.likes.value = "";
            dispatch(setNotificationStore({ type: "info", message: `Playlist ${newPlaylist.name} successfully added!` }));
        } catch (error) {
            dispatch(setNotificationStore({ type: "warning", message: "Error adding playlist!" }));
            setTimeout(() => {
                dispatch(setNotificationStore(null));
            }, 3000);
        }
    }

    return (
        <div>
            <h3>Add Playlists</h3>
            <form onSubmit={handleAddition}>
                <div> Playlist Name: {""}
                    <input type="text" name="name" />
                </div>
                <div> Creator: {""}
                    <input type="text" name="creator" />
                </div>
                <div> Number of Songs: {""}
                    <input type="text" name="noSongs" />
                </div>
                <div> Likes: {""}
                    <input type="text" name="likes" />
                </div>
                <button>Add Playlist</button>
            </form>
        </div>
    )
}

export default PlaylistForm;
