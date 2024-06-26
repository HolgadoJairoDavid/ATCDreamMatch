import style from './snackBar.module.css'
import useSnackStore from '../../stores/snackStore'
const SnackBar = () => {
    const {snack} = useSnackStore(state => state)
    return (
        <div className={style.SnackBar}>
            <div className={snack.severity === "error" ? style.ErrorMessage :
            snack.severity === "success" ? style.SuccessMessage :
            snack.severity === "info" ? style.InfoMessage :
            style.WarningMessage}>
            <p>{snack.message}</p>
            </div>
        </div>
    )
}

export default SnackBar