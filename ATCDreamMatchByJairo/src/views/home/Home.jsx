import style from "./home.module.css";
import NavBar from '../../components/navBar/NavBar'

const Home = () => {
    return (
        <div>
        <NavBar />

        <div className={style.Home}>

        <h1>Bienvenidos a ATC Dream Match!</h1>
        <p>¿Alguna vez soñaste con ver un partido de fútbol en donde se enfrenten tus jugadores favoritos?
            Imaginate poder armar dos equipos de 5 jugadores cada uno, en donde no tengas ninguna limitación...
            posición, presupuesto, contrato, club, edad... tu mente es tu límite.
        </p>
        <p>En ATC Dream Match, podrás armar tus equipos soñados y crear 
            <span> El partido de tus sueños.</span>
        </p>
        </div>
       
        </div>
    );
}

export default Home;