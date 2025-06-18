import { Link } from "react-router-dom";
import LogoutField from "./LogoutField";
import { useSelector } from "react-redux";

const Header = () => {
    const loggedUser = useSelector((state) => state.loggedUser);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Playlists App</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        {loggedUser && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">Users</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/playlists">Playlists</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/addPlaylists">Add Playlists</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {loggedUser && <LogoutField />}
                    {!loggedUser && <Link className="btn btn-outline-light ms-2" to="/login">Login</Link>}
                </div>
            </div>
        </nav>
    );
}

export default Header;