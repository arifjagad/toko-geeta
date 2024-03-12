
import { Footer } from 'flowbite-react';

export default function Footers() {
    return (
        <Footer container>
        <Footer.Copyright href="/" by="Toko Geeta" year={2024} />
        <Footer.LinkGroup>
            <Footer.Link href="/about">About</Footer.Link>
            <Footer.Link href="/">Privacy Policy</Footer.Link>
            <Footer.Link href="/">Licensing</Footer.Link>
        </Footer.LinkGroup>
        </Footer>
    );
}
