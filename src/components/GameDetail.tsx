import React from "react";
import { useParams } from "react-router-dom";
import { Game } from "../type";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Button } from "flowbite-react";
import { FaWhatsapp } from "react-icons/fa";

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
                    className="h-full w-40 overflow-hidden rounded-lg border border-gray-200">
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
                <div className="grid grid-cols-7 gap-8 h-full">
                    <div className="col-span-2">
                        <div className="sticky top-28">
                            <div className="bg-blue-700 p-12 text-white rounded-lg">
                                <h4 className="text-xl font-bold mb-4">Panduan Topup!</h4>
                                <ol className="list-decimal">
                                    {game.guide.map((guideList) => (
                                        <li className="my-4">{guideList}</li>
                                    ))}
                                </ol>
                            </div>
                            <Button className="bg-green-500 mt-4 w-full hover:bg-red-200">
                                Pesan Sekarang <FaWhatsapp className="ml-2 h-5 w-5"/> 
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-5">
                        <div className="mb-6">
                            <div className="bg-blue-700 px-12 py-4 text-white font-bold rounded-t-lg">
                                Masukkan User ID
                            </div>
                            <div className="bg-blue-950 px-12 py-8 rounded-b-lg">
                                <div className="flex gap-4">
                                    {game.topupSystem.map((topupSystemList) => (
                                        <input
                                            id={topupSystemList}
                                            type="text"
                                            className="w-full h-12 px-4 rounded-lg bg-white text-md"
                                            placeholder={topupSystemList}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs mt-4 text-white">
                                    {game.topupDesc}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="bg-blue-700 text-white font-bold rounded-t-lg px-12 py-4">
                                Pilih Paket Anda
                            </div>
                            <div className="bg-blue-950 px-12 py-8 rounded-b-lg">
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
            </div>
        </>
    );
};

export default GameDetail;
