import {NavLink} from 'react-router-dom';
import home from "../../assets/home.png"
import style from "./navBar.module.css";

const NavBar = () => {
    return (
        <div className={style.NavBar}>
             <nav className={style.navBarDisplay}>
            <div className={style.navBarElements}>
                <NavLink to="/" className=""><img src={home} alt="" className={style.imgHome}/></NavLink>
              
                <div className={style.navBarOptions}>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link active">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/teams" className="nav-link">Teams</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/favorites" className="nav-link">Favorites</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </div>
       
    );
}

export default NavBar;