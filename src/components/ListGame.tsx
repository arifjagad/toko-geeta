import React from "react";
import { Link } from "react-router-dom";
import { Game } from "../type";

interface Props {
    games: Game[];
}

const ListGame: React.FC<Props> = ({ games }) => {
    if (!Array.isArray(games) || games.length === 0) {
        return <div className="py-12">No games available</div>;
    }

    return (
        <div className="py-12">
            <h2>List Game</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.name}>
                        <Link to={`/topup/${game.name.split(` `).join(`-`).toLowerCase()}`}>{game.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListGame;
