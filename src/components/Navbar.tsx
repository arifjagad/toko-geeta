import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "flowbite-react";

function Navbars() {
    return (
        <div className="sticky top-0 z-50 bg-midnightBlue xl:px-36 sm:px-8 px-6">
            <Navbar fluid className="bg-midnightBlue py-6">
                <Navbar.Brand as={NavLink} to="/">
                    <span className="self-center whitespace-nowrap text-3xl font-semibold text-white">
                        Toko Geeta
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link as={NavLink} to="/" className="text-white">
                        Home
                    </Navbar.Link>
                    <Navbar.Link as={NavLink} to="/about" className="text-white">
                        About
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Navbars;
