import { useSelector } from "react-redux";
import PlaylistForm from "./PlaylistForm";

const PlaylistDisplay = () => {
    const playlists = useSelector((state) => state.playlists);

    return (
        <div className="container mt-4">
            <h4 className="mb-3">Playlists</h4>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Creator</th>
                        <th># Songs</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tbody>
                    {playlists.map((playlist) => (
                        <tr key={playlist.id}>
                            <td>{playlist.name}</td>
                            <td>{playlist.creator}</td>
                            <td>{playlist.numOfSongs}</td>
                            <td>{playlist.likes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlaylistDisplay;