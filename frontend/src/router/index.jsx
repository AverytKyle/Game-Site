import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage.jsx";
import TicTacToe from "../components/TicTacToe/TicTacToe.jsx";
import SnakeGame from "../components/Snake/SnakeGame.jsx";
import Navigation from "../components/Navigation/Navigation.jsx";
import CheckersGame from "../components/Checkers/Checkers.jsx";

function Layout() {
    return (
        <div>
            <Navigation />
            <Outlet />
        </div>
    );
}

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/tic-tac-toe",
                element: <TicTacToe />,
            },
            {
                path: "/snake",
                element: <SnakeGame />,
            },
            {
                path: "/checkers",
                element: <CheckersGame />,
            }
        ],
    }
]);