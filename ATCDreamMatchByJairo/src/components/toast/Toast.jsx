import style from './toast.module.css';
import useToastStore from '../../stores/toastStore';

const Toast = ({ title, message, error }) => {
    const { setToast } = useToastStore(state => state);
    return (
        <div className={error ? style.ToastError : style.ToastSuccess}>
            <button onClick={() => setToast(false)}>X</button>
            <h3>{title}</h3>
            <p>{message}</p>
        </div>
    );
};

export default Toast;