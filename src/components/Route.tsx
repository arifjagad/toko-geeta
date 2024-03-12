import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import { Game } from "../type";
import GameDetail from "./GameDetail";

interface Props {
    games: Game[];
}

const Router: React.FC<Props> = ({ games }) => {

    return (
        <Routes>
            <Route
                path="/"
                element={<Home games={games} />}
            />
            <Route path="about" element={<About />} />
            <Route path="/topup/:gameName" element={<GameDetail games={games} />} />
        </Routes>
    );
};

export default Router;
