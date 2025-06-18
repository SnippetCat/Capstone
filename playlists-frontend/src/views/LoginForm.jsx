import { useDispatch } from "react-redux";
import { setLoggedUser, loginUserDBStore } from "../reducers/loggedUserReducer";
import { setNotification, setNotificationStore } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const loggedUser = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    dispatch(loginUserDBStore(loggedUser));
    event.target.username.value = "";
    event.target.password.value = "";
    navigate("/");
  }
  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <form onSubmit={handleLogin} className="card p-4 shadow-sm">
        <h3 className="mb-3 text-center">Login</h3>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" name="username" className="form-control" placeholder="Username" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" placeholder="Password" />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;