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
            toast.error('Silakan lengkapi semua field sebelum mengirim.');
            return;
        }

        // Membuat pesan WhatsApp dengan data formData
        let whatsappMessage = `Halo Admin TokoGeetu! Aku mau top-up game ${game?.name}:\n\n`;

        // Tambahkan data dari topupSystem
        for (const [key, value] of Object.entries(formData)) {
            whatsappMessage += `${key}: ${value}\n`;
        }
    
        // Tambahkan data nameOption dan price yang dipilih
        whatsappMessage += `\nPaket yang dipilih: ${selectedOption}\n`;
    
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
                        </div>
                    </div>
                    <div className="col-span-5">
                        <div className="mb-6">
                            <div className="bg-blue-700 px-12 py-4 text-white font-bold rounded-t-lg">
                                Masukkan User ID
                            </div>
                            <div className="bg-blue-950 px-12 py-8 rounded-b-lg">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-row gap-4">
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
                                    <p className="text-xs mt-4 text-white">
                                        {game.topupDesc}
                                    </p>
                                    <Button type="submit" className="bg-green-500 mt-4 w-full hover:bg-red-200">
                                        Pesan Sekarang <FaWhatsapp className="ml-2 h-5 w-5"/> 
                                    </Button>
                                </form>
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
                                                        onChange={handleRadioChange} // Add onChange event handler
                                                    />
                                                    <label
                                                        htmlFor={option.nameOption}
                                                        className="h-full p-4 text-gray-500 cursor-pointer block bg-white border border-gray-200 rounded-lg overflow-hidden transition duration-300 ease-in-out shadow-md hover:shadow-lg peer-checked:bg-sky-500 peer-checked:text-white peer-checked:font-medium"
                                                    >
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
