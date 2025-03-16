import React, { useContext, useState } from 'react';
import { Store } from '../Store';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

function OffcanvasExample() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const [searchTerm, setSearchTerm] = useState('');
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
                <Navbar.Toggle aria-controls="offcanvasNavbar" />

                <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title> <Link to='/'><img src="/img/logo.png" alt="Logo" className="logo-img" /></Link></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {/* SEARCH INPUT (VISIBLE ON SMALL SCREENS) */}
                        {/* <Form className="search-form d-flex d-lg-none mb-3" onSubmit={handleSearch}>
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
                        </Form> */}
                        <div className='d-lg-none'>
                            <SearchBox />
                        </div>

                        {/* NAVIGATION LINKS */}
                        <Nav className="justify-content-end flex-grow-1">
                            <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                            <Nav.Link><Link to='/allproduct'>Product</Link></Nav.Link>
                            <Nav.Link><Link to='/blog'>Blog</Link></Nav.Link>
                            <Nav.Link><Link to='/about'>About</Link></Nav.Link>

                            {userInfo && userInfo.name ? (
                                <NavDropdown title={userInfo.name}>
                                    <NavDropdown.Item><Link to='/profile'>Profile</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to='/orderHistory'>Orders</Link></NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={signoutHandler}>Sign Out</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link><Link to='/signin'>Signin</Link></Nav.Link>
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
                        {/* CART ICON (ALSO VISIBLE INSIDE MENU) */}
                        {/* <Nav className="mt-3 d-lg-none">
                            <Nav.Link>
                                <Link to='/cart' className="cart-icon">
                                    <i className="fa-solid fa-bag-shopping"></i>
                                    <span className="cart-badge">
                                        {cart.cartItems.length > 0 ? cart.cartItems.reduce((a, c) => a + c.quantity, 0) : 0}
                                    </span>
                                </Link>
                            </Nav.Link>
                        </Nav> */}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default OffcanvasExample;
