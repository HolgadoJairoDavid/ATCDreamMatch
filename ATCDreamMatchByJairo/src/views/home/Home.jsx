import style from "./home.module.css";
import { NavLink } from "react-router-dom";
import NavBar from '../../components/navBar/NavBar'

const Home = () => {
    return (
        <div>
        <NavBar />

        <div className={style.Home}>

        <div className={style.ContainerHome}>
        <h1>Bienvenidos a ATC Dream Match!</h1>
        <p>¿Alguna vez soñaste con ver un partido de fútbol en donde se enfrenten tus jugadores favoritos?
            Imaginate poder armar dos equipos de 5 jugadores cada uno, en donde no tengas ninguna limitación...
            posición, presupuesto, contrato, club, edad...
            En ATC Dream Match, podrás armar tus equipos soñados y crear 
        </p>
            <span>¡El partido de tus sueños!</span>
        <NavLink to='/teams' className={style.TeamButton}><button>Equipos</button></NavLink>
        </div>
        </div>
       
        </div>
    );
}

export default Home;