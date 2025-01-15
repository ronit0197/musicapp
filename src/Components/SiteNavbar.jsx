import React from "react";
import { Navbar, Container, Form, FormControl } from "react-bootstrap";

const SiteNavbar = () => {
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
                <Form className="d-flex navbar-search">
                    <FormControl
                        type="search"
                        placeholder="Search 90's songs"
                        className="me-2"
                        aria-label="Search"
                    />
                </Form>
            </Container>
        </Navbar>
    );
};

export default SiteNavbar;
