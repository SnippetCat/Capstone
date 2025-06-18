import { useSelector } from "react-redux";

const Notification = () => {
    const notification = useSelector((state) => state.notification);
    if (notification) {
        return (
            <div className={`alert alert-${notification.type === 'warning' ? 'danger' : notification.type} mt-3`} role="alert">
                {notification.message}
            </div>
        )
    }
    return null;
}

export default Notification;