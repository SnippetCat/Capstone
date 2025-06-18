import { useSelector, useDispatch } from "react-redux";
import { setLoggedUser, logoutUserDBStore } from "../reducers/loggedUserReducer";
import { setNotification, setNotificationStore } from "../reducers/notificationReducer";

const LogoutField = () => {
    const loggedUser = useSelector((state) => state.loggedUser);
    const dispatch = useDispatch();

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            dispatch(logoutUserDBStore());

            setNotification({ type: "info", message: "Logout successful!" })
        } catch (error) {
            setNotification({ type: "warning", message: "Logout failed (which is weird)!" })
        }
        setTimeout(() => {
            dispatch(setNotificationStore(null));
        }, 3000);
    }

    return (
        <div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default LogoutField;