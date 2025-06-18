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
        <div className="container mt-4" style={{ maxWidth: 500 }}>
            <form onSubmit={handleAddition} className="card p-4 shadow-sm">
                <h3 className="mb-3 text-center">Add Playlist</h3>
                <div className="mb-3">
                    <label className="form-label">Playlist Name</label>
                    <input type="text" name="name" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Creator</label>
                    <input type="text" name="creator" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Number of Songs</label>
                    <input type="number" name="noSongs" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Likes</label>
                    <input type="number" name="likes" className="form-control" />
                </div>
                <div className="d-grid">
                    <button className="btn btn-success">Add Playlist</button>
                </div>
            </form>
        </div>
    )
}

export default PlaylistForm;
