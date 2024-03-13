import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Router from "./components/Route";

import { Game } from "./type";

const gamesData: Game[] = require('./data/game.json');

function App() {
    return (
        <div >
			<Navbar />
            <main>
                <Router games={gamesData as Game[]} />
			</main>
            <Footer />
        </div>
    );
}

export default App;
