import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage.jsx";
import TicTacToe from "../components/TicTacToe/TicTacToe.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/tic-tac-toe",
        element: <TicTacToe />,
    }
]);