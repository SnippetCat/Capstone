import { useParams } from "react-router";
import { useSelector } from "react-redux";

const User = () => {
    const id = useParams().id;
    console.log(id)
    const users = useSelector((state) => state.users)
    console.log(users)
    const user = users.find((user2) => user2.id == id)

    return (
        <div>
            <h3>{user.name}</h3>
            Username: {user.username} <br />
            Number of Playlists: {user.playlists.length}

            {user.playlists.length == 0 ? <h3> No Playlists</h3> : <h3>Playlists</h3>}
            {console.log(user.playlists)}
            <ul>
                {user.playlists.map((playlist) => (
                    <li key={playlist.id}>{playlist.name}. {playlist.numOfSongs} songs. {playlist.likes} likes.</li>
                ))}
            </ul>
        </div>
    )
}

export default User;