import React from "react";
import { Navbar, Container, FormControl } from "react-bootstrap";

const SiteNavbar = ({ setSearchQuery }) => {

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Navbar className="site-navbar shadow" expand="lg">
            <Container>
                {/* Logo */}
                <Navbar.Brand href="/">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="navbar-logo"
                    />
                </Navbar.Brand>

                {/* Search Bar */}
                <div className="d-flex navbar-search">
                    <FormControl
                        type="search"
                        placeholder="Search song or airtist"
                        className="me-2"
                        aria-label="Search"
                        onChange={handleSearch}
                    />
                </div>
            </Container>
        </Navbar>
    );
};

export default SiteNavbar;
