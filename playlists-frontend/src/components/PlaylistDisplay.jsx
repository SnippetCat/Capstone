import { useSelector } from "react-redux";

import Playlist from "./Playlist";
import PlaylistForm from "./PlaylistForm";
import Section from "./Section";


const PlaylistDisplay = () => {
    const loggedUser = useSelector((state) => state.loggedUser);
    const playlists = useSelector((state) => state.playlists);

    return (
        <div>
            <h3>Playlists</h3>
            {playlists.map((playlist) => (
                <Playlist key={playlist.id} playlist={playlist} />
            ))}
            <PlaylistForm />
        </div>
    );
}

export default PlaylistDisplay;