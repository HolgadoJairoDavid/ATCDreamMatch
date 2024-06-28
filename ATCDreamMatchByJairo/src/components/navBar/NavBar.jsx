import {NavLink} from 'react-router-dom';
import home from "../../assets/home.png"
import style from "./navBar.module.css";
import { Tooltip } from 'react-tooltip';

const NavBar = () => {
    return (
        <div className={style.NavBar}>
             <nav className={style.navBarDisplay}>
            <div className={style.navBarElements}>
                <div className={style.navBarLogo}>
                <NavLink to="/" className={style.NavLink}><img src={home} alt="" className={style.imgHome}/></NavLink>
                </div>
                <div className={style.navBarOptions}>
                    <ul className="navbar-nav">
                        <li className="nav-item" data-tooltip-id="tool-home" data-tooltip-content="Home">
                            <NavLink to="/" className={style.NavLink}>Home</NavLink>
                        </li>
                        <Tooltip id="tool-home" place="bottom"/>
                        <li className="nav-item" data-tooltip-id="tool-teams" data-tooltip-content="Teams">
                            <NavLink to="/teams" className={style.NavLink}>Teams</NavLink>
                        </li>
                        <Tooltip id="tool-teams" place="bottom"/>
                        {/* <li className="nav-item">
                            <NavLink to="/favorites" className={style.NavLink}>Favorites</NavLink>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
        </div>
       
    );
}

export default NavBar;