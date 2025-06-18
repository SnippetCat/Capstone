import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
    const { id } = useParams();
    const users = useSelector((state) => state.users);
    const user = users.find((user2) => user2.id == id);

    if (!user) {
        return <div className="container mt-5"><div className="alert alert-danger">User not found</div></div>;
    }

    return (
        <div className="container mt-5" style={{ maxWidth: 600 }}>
            <div className="card p-4 shadow-sm">
                <h3 className="mb-3">{user.name}</h3>
                <p><b>Username:</b> {user.username}</p>
                <p><b>Number of Playlists:</b> {user.playlists.length}</p>
                {user.playlists.length === 0 ? <h5 className="text-muted">No Playlists</h5> : <h5>Playlists</h5>}
                <ul className="list-group">
                    {user.playlists.map((playlist) => (
                        <li key={playlist.id} className="list-group-item">
                            {playlist.name}. {playlist.numOfSongs} songs. {playlist.likes} likes.
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default User;