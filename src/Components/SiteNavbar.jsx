import React from "react";
import { Navbar, Container, FormControl } from "react-bootstrap";

const SiteNavbar = ({ setSearchQuery }) => {

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Navbar className="site-navbar" expand="lg">
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
                        placeholder="Search 90's & 20's song or airtist"
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
