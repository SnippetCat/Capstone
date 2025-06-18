import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutField from "./LogoutField";
import { useSelector } from "react-redux";


const Header = () => {
    const navigate = useNavigate();

    const loggedUser = useSelector((state) => state.loggedUser);

    const menuStyle = {
        display: "flex",
        gap: "10px",
    }

    return (
        <div>
            <h1>Playlists Application</h1>
            <div style={menuStyle}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                {!loggedUser ?
                    (<div>
                        <Link to="/login">Login</Link>
                    </div>)
                    : (<div style={menuStyle}>
                        <Link to="/users">Users</Link>
                        <Link to="/playlists">Playlists</Link>
                        <Link to="/addPlaylists">Add Playlists</Link>
                        <LogoutField />
                    </div>)
                }
            </div>

        </div>
    )
}

export default Header;