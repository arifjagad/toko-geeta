import React from 'react';
import { Carousel } from 'flowbite-react';
import jsonData from '../data/slide.json'; // Impor data JSON

const Slider = () => {
    const sliderImages = jsonData[0].sliderHome; // Ambil array gambar dari data JSON

    return (
        <div className="h-36 sm:h-64 xl:h-80 2xl:h-96 ">
            <Carousel slideInterval={5000} className="rounded-3xl">
                {sliderImages.map((image, index) => (
                    <img key={index} src={`/images/${image}`} alt={`Slider ${index + 1}`} />
                ))}
            </Carousel>
        </div>
    );
}

export default Slider;
