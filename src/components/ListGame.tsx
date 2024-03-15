import React from "react";
import { Link } from "react-router-dom";
import { Game } from "../type";

interface Props {
    games: Game[];
}

const ListGame: React.FC<Props> = ({ games }) => {
    if (!Array.isArray(games) || games.length === 0) {
        return <div className="sm:my-8 my-4">No games available</div>;
    }

    return (
        <div className="sm:my-8 my-4">
            <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
                {games.map((game) => (
                    <>
                        <Link to={`/topup/${game.name.split(` `).join(`-`).toLowerCase()}`}
                        key={game.name}>
                            <div
                                className="da relative flex flex-col justify-center overflow-hidden bg-gray-50"
                                >
                                <div className="absolute inset-0 bg-center"></div>
                                <div
                                    className="group relative m-0 flex h-72 w-full rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                                    <div
                                        className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100">
                                        <img
                                            src={`/images/${game.picture}`}
                                            className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                                            alt=""/>
                                    </div>
                                    <div
                                        className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                                        <h1 className="sm:text-xl text-md font-bold text-white shadow-xl">{game.name}</h1>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </>
                ))}
            </div>
        </div>
    );
};

export default ListGame;
