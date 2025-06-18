import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
    const users = useSelector((state) => state.users)
    return (
        <div className="container mt-4">
            <h3>Users</h3>
            <ul className="list-group">
                {users.map((user) =>
                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <Link to={`/user/${user.id}`}>{user.name}</Link>
                        <span className="badge bg-primary rounded-pill">{user.playlists.length} playlists</span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Users;