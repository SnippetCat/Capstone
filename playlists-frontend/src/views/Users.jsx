import { useSelector } from "react-redux";
import { Link } from "react-router";

const Users = () => {
    const users = useSelector((state) => state.users)
    return (
        <div>
            <h3>Users</h3>
            {users.map((user) =>
                <div key={user.id}>
                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                </div>
            )}
        </div>
    )
}

export default Users;