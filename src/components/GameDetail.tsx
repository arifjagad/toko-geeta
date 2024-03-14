import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../type";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Button } from "flowbite-react";
import { FaWhatsapp } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    games: Game[];
}

const GameDetail: React.FC<Props> = ({ games }) => {
    const { gameName } = useParams<{ gameName: string }>();
    const [selectedOption, setSelectedOption] = useState<string>("");

    // Lakukan transformasi nama game dari parameter URL
    const formattedGameName = (gameName ?? "").split('-').join(' ').toLowerCase();

    // Temukan game yang sesuai dalam prop games
    const game = games.find((game) => game.name.toLowerCase() === formattedGameName);

    // State untuk menyimpan nilai dari inputan topupSystem
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    // Handle perubahan nilai pada inputan
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    };

    // Handle perubahan pada inputan radio button
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    // Handle pengiriman data saat formulir disubmit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        // Periksa apakah selectedOption sudah dipilih
        if (Object.values(formData).some(value => value === '') || selectedOption === '') {
            toast.error('Silakan lengkapi semua field sebelum memesan.');
            return;
        }

        // Membuat pesan WhatsApp dengan data formData
        let whatsappMessage = `Halo Admin TokoGeetu! Aku mau top-up game ${game?.name}:\n\n`;

        // Tambahkan data dari topupSystem
        for (const [key, value] of Object.entries(formData)) {
            whatsappMessage += `${key}: ${value}\n`;
        }
    
        // Tambahkan data nameOption dan price yang dipilih
        whatsappMessage += `\nPaket yang dipilih:\n`;
        whatsappMessage += `${game?.packages.find(packageType =>
            packageType.options.find(option => option.nameOption === selectedOption)
        )?.type}: ${selectedOption}\n`;

        const selectedPackage = game?.packages.find(packageType =>
            packageType.options.find(option => option.nameOption === selectedOption)
        );
    
        const price = selectedPackage
            ? selectedPackage.options.find(option => option.nameOption === selectedOption)?.price ?? 0
            : 0;
    
        whatsappMessage += `Harga: ${FormatRupiah({ value: price })}\n\n`;
    
        whatsappMessage += 'Terima kasih!';

        // Buka aplikasi WhatsApp dengan pesan yang disiapkan
        const whatsappUrl = `https://wa.me/6282167565321?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (!game) {
        return <div>Game not found</div>;
    }

    return (
        <>
            <ToastContainer />

            <div
                className='bg-cover bg-center h-64 w-full brightness-50'
                style={{ backgroundImage: `url('/images/${game.pictureBanner}')` }}
            ></div>

            <div className="h-40 xl:mx-36 sm:mx-8 mx-6 -mt-28 flex items-center">
                <div
                    className="h-full w-40 overflow-hidden rounded-lg border border-gray-200">
                    <img
                        src={`/images/${game.picture}`}
                        className="block h-full w-full scale-100 object-cover object-center drop-shadow-xl"
                        alt=""/>
                </div>
                <div className="text-white text-3xl font-bold flex-grow z-10 ml-2 sm:-mt-2 -mt-10">
                    {game.name}
                </div>
            </div>

            <div className="xl:mx-36 sm:mx-8 mx-6 my-12">
                <div className="grid grid-cols-7 sm:gap-8 gap-4 h-full">
                    <div className="lg:col-span-2 col-span-7">
                        <div className="sticky top-28">
                            <div className="bg-blue-700 sm:px-12 sm:py-8 px-10 py-6 text-white rounded-lg">
                                <h4 className="text-xl font-bold mb-4">Panduan Topup!</h4>
                                <ol className="list-decimal">
                                    {game.guide.map((guideList) => (
                                        <li className="my-4">{guideList}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5 col-span-7">
                        <div className="">
                            <div className="bg-blue-700 sm:px-12 px-10 py-4 text-white font-bold rounded-t-lg">
                                Masukkan User ID
                            </div>
                            <div className="bg-blue-950 sm:px-12 px-10 py-8 rounded-b-lg">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex md:flex-row flex-col gap-4">
                                        {game.topupSystem.map((topupSystemList) => (
                                            <input
                                                key={topupSystemList}
                                                type="text"
                                                className="w-full h-12 px-4 rounded-lg bg-white text-md"
                                                placeholder={topupSystemList}
                                                name={topupSystemList}
                                                onChange={handleInputChange}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs mt-4 text-white text-justify">
                                        {game.topupDesc}
                                    </p>
                                    <div className="fixed sm:bottom-0 left-0 z-50 w-full sm:hidden">
                                        <Button type="submit" className="bg-green-500 mt-4 w-full hover:bg-red-200 rounded-t-lg rounded-b-none">
                                            Pesan Sekarang <FaWhatsapp className="ml-2 h-5 w-5"/> 
                                        </Button>
                                    </div>
                                    <div className="">
                                        <Button type="submit" className="bg-green-500 mt-4 w-full hover:bg-red-200">
                                            Pesan Sekarang <FaWhatsapp className="ml-2 h-5 w-5"/> 
                                        </Button>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                        <div className="sm:mt-6 mt-4">
                            <div className="bg-blue-700 text-white font-bold rounded-t-lg sm:px-12 px-10 py-4">
                                Pilih Paket Anda
                            </div>
                            <div className="bg-blue-950 sm:px-12 px-10 py-8 rounded-b-lg">
                                {/* Price List */}
                                {game.packages.map((packageType) => (
                                    <div key={packageType.type}>
                                        <h2 className="text-white font-bold">{packageType.type}</h2>
                                        <div className="grid md:grid-cols-3 grid-cols-2 gap-4 text-white my-3">
                                            {packageType.options.map((option) => (
                                                <div key={option.id} className="">
                                                    <input
                                                        type="radio"
                                                        className="hidden peer"
                                                        id={option.nameOption}
                                                        name="options"
                                                        value={option.nameOption}
                                                        onChange={handleRadioChange} // Add onChange event handler
                                                    />
                                                    <label
                                                        htmlFor={option.nameOption}
                                                        className="h-full p-4 text-gray-500 cursor-pointer block bg-white border border-gray-200 rounded-lg overflow-hidden transition duration-300 ease-in-out shadow-md hover:shadow-lg peer-checked:bg-sky-500 peer-checked:text-white peer-checked:font-medium"
                                                    >
                                                        <div className="flex sm:justify-between sm:flex-row flex-col-reverse">
                                                            <div className="w-4/5">
                                                                <p className="text-xs mb-4">{option.nameOption}</p>
                                                                <p className="text-xs font-medium">{FormatRupiah({ value: option.price })}</p>
                                                            </div>
                                                            <div className="sm:mb-0 mb-4 w-1/5 flex justify-end">
                                                                <img                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                src={`/images/${packageType.iconCurrency}`}
                                                                className="h-5 w-auto drop-shadow-xl"
                                                                alt=""/>
                                                            </div>
                                                        </div>
                                                        
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
