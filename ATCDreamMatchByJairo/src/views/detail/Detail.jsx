import { useParams } from 'react-router-dom';
import NavBar from '../../components/navBar/NavBar'

const Detail = () => {
    const { name } = useParams();

    return (
        <div>
            <NavBar />
            <div>
                <h2>{name}</h2>
            </div>
        </div>
    );
    };

export default Detail;