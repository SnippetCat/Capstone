import { useDispatch } from "react-redux";
import { setLoggedUser, loginUserDBStore } from "../reducers/loggedUserReducer";
import { setNotification, setNotificationStore } from "../reducers/notificationReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();

    try {
      const loggedUser = {
        username: event.target.username.value,
        password: event.target.password.value
      };

      dispatch(loginUserDBStore(loggedUser));

      event.target.username.value = "";
      event.target.password.value = "";
      dispatch(setNotificationStore({ type: "info", message: "Login successful!" }))
    } catch (error) {
      dispatch(setNotificationStore({ type: "warning", message: "Login failed!" }));
    }
    setTimeout(() => {
      dispatch(setNotificationStore(null));
    }, 3000);
  }
  return (
    <form onSubmit={handleLogin}>
      <h3>Login</h3>
      <div> Username: {""}
        <input type="text" name="username" placeholder="Username" />
      </div>
      <div> Password: {""}
        <input type="password" name="password" placeholder="Password" />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

export default LoginForm;