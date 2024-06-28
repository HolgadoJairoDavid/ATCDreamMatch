import style from './snackBar.module.css'
import useSnackStore from '../../stores/snackStore'
const SnackBar = () => {
    const {getCurrentSnack} = useSnackStore(state => state)
    return (
        <div className={style.SnackBar}>
            <div className={getCurrentSnack().severity === "error" ? style.ErrorMessage :
            getCurrentSnack().severity === "success" ? style.SuccessMessage :
            getCurrentSnack().severity === "info" ? style.InfoMessage :
            style.WarningMessage}>
            <p>{getCurrentSnack().message}</p>
            </div>
        </div>
    )
}

export default SnackBar