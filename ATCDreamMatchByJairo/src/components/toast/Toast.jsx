import style from './toast.module.css';
import useToastStore from '../../stores/toastStore';

const Toast = ({ title, message, error }) => {
    const { setToast } = useToastStore(state => state);
    return (
        <div className={error ? style.ToastError : style.ToastSuccess}>
           <div>
           <h3>{title}</h3>
           <p>{message}</p>
           </div>
            <button onClick={() => setToast(false)}>X</button>
        </div>
    );
};

export default Toast;