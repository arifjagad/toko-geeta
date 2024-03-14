
import { Footer } from 'flowbite-react';

export default function Footers() {
    return (
        <Footer container>
            <Footer.Copyright href="/" by="Arif Jagad - Toko Geeta" year={2024} className="sm:text-left text-center"/>
            <div className="sm:pb-0 pb-8"></div>
        </Footer>
    );
}
