import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();

    const games = [
        {
            id: 1,
            title: "Tic Tac Toe",
            path: "/tic-tac-toe",
        },
        {
            id: 2,
            title: "Snake",
            path: "/snake",
        },
    ];

    const handleGameClick = (id) => {
        const game = games.find((game) => game.id === id);
        navigate(game.path);

    }

    return (
        <div className="home-container">
            <div className="home-games-container">
                {games.map((game) => (
                    <div key={game.id} className="home-game-card" onClick={() => handleGameClick(game.id)}>
                        <h2>{game.title}</h2>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default HomePage;