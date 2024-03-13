// Home.tsx
import React from 'react';
import Slider from "../components/Slider";
import ListGame from "../components/ListGame";
import { Game } from "../type";

const Home: React.FC<{ games: Game[] }> = ({ games }) => {
    
    return (
        <div className="xl:mx-36 sm:mx-8 mx-6 sm:my-12 my-4">
            <Slider/>
            <ListGame games={games} />
        </div>
    );
}

export default Home;
