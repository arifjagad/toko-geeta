// Home.tsx
import React from 'react';
import Slider from "../components/Slider";
import ListGame from "../components/ListGame";
import { Game } from "../type";

const Home: React.FC<{ games: Game[] }> = ({ games }) => {
    
    return (
        <div className="lg:mx-36 mx-12 my-12">
            <Slider/>
            <ListGame games={games} />
        </div>
    );
}

export default Home;
