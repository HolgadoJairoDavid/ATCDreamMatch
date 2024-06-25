import style from './toast.module.css';

const Toast = ({ title, message, handleClose, error }) => {
    return (
        <div className={error ? style.ToastError : style.ToastSuccess}>
            <button onClick={handleClose}>X</button>
            <h3>{title}</h3>
            <p>{message}</p>
        </div>
    );
};

export default Toast;