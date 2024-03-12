import React from "react";
import { useParams } from "react-router-dom";
import { Game } from "../type";

interface Props {
    games: Game[];
}

const GameDetail: React.FC<Props> = ({ games }) => {
    const { gameName } = useParams<{ gameName: string }>();

    // Lakukan transformasi nama game dari parameter URL
    const formattedGameName = (gameName ?? "").split('-').join(' ').toLowerCase();

    // Temukan game yang sesuai dalam prop games
    const game = games.find((game) => game.name.toLowerCase() === formattedGameName);

    if (!game) {
        return <div>Game not found</div>;
    }

    return (
        <div>
            <h2>{game.name}</h2>
            <h3>Price List</h3>
            <ul>
                {game.packages.map((packageType) => (
                    <li key={packageType.type}>
                        <h2>{packageType.type}</h2>
                        <ul>
                            {packageType.options.map((option) => (
                                <li key={option.nameOption}>
                                    {option.nameOption}: {option.price}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameDetail;
