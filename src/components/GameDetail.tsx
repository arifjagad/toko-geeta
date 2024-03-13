import React from "react";
import { useParams } from "react-router-dom";
import { Game } from "../type";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Button } from 'flowbite-react';
import { HiShoppingCart } from 'react-icons/hi';

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
        <>
            <div
                className='bg-cover bg-center h-64 w-full brightness-50'
                style={{ backgroundImage: `url('/images/${game.pictureBanner}')` }}
            ></div>

            <div className="h-40 lg:mx-36 mx-12 -mt-28 flex items-center">
                <div
                    className="h-full w-40 overflow-hidden rounded-xl border border-gray-200">
                    <img
                        src={`/images/${game.picture}`}
                        className="block h-full w-full scale-100 object-cover object-center drop-shadow-xl"
                        alt=""/>
                </div>
                <div className="text-white text-3xl font-bold flex-grow z-10 ml-2 -mt-2">
                    {game.name}
                </div>
            </div>

            <div className="lg:mx-36 mx-12 my-12">
                <div className="grid grid-cols-7 gap-12 h-full">
                    <div className="col-span-2 sticky">
                        <div className="bg-blue-700 p-12 text-white rounded-3xl h-screen">
                            <h4 className="text-xl font-bold mb-4">Panduan Topup!</h4>
                            <ol className="list-decimal">
                                {game.guide.map((guideList) => (
                                    <li>{guideList}</li>
                                ))}
                            </ol>
                        </div>
                        {/* <Button className="rounded-3xl w-full mt-4">
                            <HiShoppingCart className="mr-2 h-5 w-5" />
                            Buy now
                        </Button> */}
                    </div>
                    <div className="col-span-5">
                        <div className="bg-blue-700 px-12 py-4 text-white font-bold rounded-t-3xl">
                            Pilih Paket Anda
                        </div>
                        <div className="bg-blue-950 px-12 py-8 rounded-b-3xl">
                            {/* Price List */}
                            {game.packages.map((packageType) => (
                                <div key={packageType.type}>
                                    <h2 className="text-white font-bold py-2">{packageType.type}</h2>
                                    <div className="grid grid-cols-4 gap-4 text-white">
                                        {packageType.options.map((option) => (
                                            <div key={option.id} className="my-2">
                                                <input
                                                    type="radio"
                                                    className="hidden peer"
                                                    id={option.nameOption}
                                                    name="options"
                                                    value={option.nameOption}
                                                />
                                                <label
                                                    htmlFor={option.nameOption}
                                                    className="h-full p-4 text-gray-500 cursor-pointer block bg-white border border-gray-200 rounded-lg overflow-hidden transition duration-300 ease-in-out shadow-md hover:shadow-lg peer-checked:bg-sky-500 peer-checked:text-white peer-checked:font-medium"
                                                >
                                                    {/* <img src={`/images/${packageType.iconCurrency}`} alt="" className="w-6 mb-4"/> */}
                                                    <p className="text-xs">{option.nameOption}</p>
                                                    <p className="text-xs">{FormatRupiah({ value: option.price })}</p>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GameDetail;
