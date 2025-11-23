import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();

    const games = [
        {
            id: 1,
            title: "Tic Tac Toe",
        },
        {
            id: 2,
            title: "Snake",
        },
    ];

    const handleGameClick = () => {
        navigate('/tic-tac-toe');
    }

    return (
        <div className="home-container">
            <div className="home-games-container">
                {games.map((game) => (
                    <div key={game.id} className="home-game-card" onClick={() => handleGameClick()}>
                        <h2>{game.title}</h2>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default HomePage;