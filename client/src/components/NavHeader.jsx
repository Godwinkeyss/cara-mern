import React, { useContext, useState, useRef } from 'react';
import { Store } from '../Store';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

function OffcanvasExample() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const [searchTerm, setSearchTerm] = useState('');
    const [showOffcanvas, setShowOffcanvas] = useState(false); // State to control Offcanvas visibility
    const navigate = useNavigate();

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href = '/signin';
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm}`);
        }
    };

    // Handle click to close the Offcanvas
    const handleLinkClick = () => {
        setShowOffcanvas(false); // Close the offcanvas
    };

    // Handle toggling of the Offcanvas visibility
    const handleToggleOffcanvas = () => {
        setShowOffcanvas(!showOffcanvas);
    };

    return (
        <Navbar expand="lg" className="header">
            <Container fluid>
                {/* LOGO */}
                <Navbar.Brand className="me-2">
                    <Link to='/'><img src="/img/logo.png" alt="Logo" className="logo-img" /></Link>
                </Navbar.Brand>

                {/* SEARCH INPUT (VISIBLE ON LARGE SCREENS) */}
                <Form className="search-form d-none d-lg-flex mx-auto" onSubmit={handleSearch}>
                    <Form.Control
                        type="search"
                        placeholder="Search products..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="success" type="submit">
                        <i className="fa fa-search"></i>
                    </Button>
                </Form>

                <div className="cart-icon-container d-lg-none me-2">
                    <Link to='/cart' className="cart-icon">
                        <i className="fa-solid fa-bag-shopping"></i>
                        <span className="cart-badge">
                            {cart.cartItems.length > 0 ? cart.cartItems.reduce((a, c) => a + c.quantity, 0) : 0}
                        </span>
                    </Link>
                </div>

                {/* HAMBURGER MENU */}
                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleToggleOffcanvas} />

                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    placement="end"
                    show={showOffcanvas} // Controlled visibility based on state
                    onHide={() => setShowOffcanvas(false)} // Close when user clicks the backdrop or close button
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title  onClick={handleLinkClick}>
                            <Link to='/'>
                                <img src="/img/logo.png" alt="Logo" className="logo-img" />
                            </Link>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {/* SEARCH INPUT (VISIBLE ON SMALL SCREENS) */}
                        <div className='d-lg-none'>
                            <SearchBox />
                        </div>

                        {/* NAVIGATION LINKS */}
                        <Nav className="justify-content-end flex-grow-1">
                            <Nav.Link onClick={handleLinkClick}>
                                <Link to='/'>Home</Link>
                            </Nav.Link>
                            <Nav.Link onClick={handleLinkClick}>
                                <Link to='/allproduct'>Product</Link>
                            </Nav.Link>
                            <Nav.Link onClick={handleLinkClick}>
                                <Link to='/blog'>Blog</Link>
                            </Nav.Link>
                            <Nav.Link onClick={handleLinkClick}>
                                <Link to='/about'>About</Link>
                            </Nav.Link>

                            {userInfo && userInfo.name ? (
                                <NavDropdown title={userInfo.name}>
                                    <NavDropdown.Item onClick={handleLinkClick}>
                                        <Link to='/profile'>Profile</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLinkClick}>
                                        <Link to='/orderHistory'>Orders</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => { signoutHandler(); handleLinkClick(); }}>
                                        Sign Out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link onClick={handleLinkClick}>
                                    <Link to='/signin'>Signin</Link>
                                </Nav.Link>
                            )}
                        </Nav>

                        {/* CART ICON (VISIBLE ON SMALL SCREENS) */}
                        <div className="cart-icon-container d-lg me-2">
                            <Link to='/cart' className="cart-icon">
                                <i className="fa-solid fa-bag-shopping"></i>
                                <span className="cart-badge">
                                    {cart.cartItems.length > 0 ? cart.cartItems.reduce((a, c) => a + c.quantity, 0) : 0}
                                </span>
                            </Link>
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default OffcanvasExample;
