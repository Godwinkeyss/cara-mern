import React, { useContext } from 'react';
import { Store } from '../Store';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link} from 'react-router-dom'

function OffcanvasExample() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    
    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href = '/signin';
      };
    return (
        <Navbar expand="lg" className="header">
            <Container fluid className="header-container">
                <Navbar.Brand>
                    <Link to='/'><img src="/img/logo.png" alt="Logo" /></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                            <Nav.Link href="#home">Product</Nav.Link>
                            <Nav.Link href="#home">Blog</Nav.Link>
                            <Nav.Link href="#home">About</Nav.Link>

                            {userInfo && userInfo.name ? (
                                <NavDropdown title={userInfo.name} id="offcanvasNavbarDropdown">
                                    <NavDropdown.Item><Link to='profile'>Profile</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to='/orderHistory'>Orders</Link></NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={signoutHandler}>Sign Out</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link href="/signin">Signin</Nav.Link>
                            )}
                        </Nav>
                        <Nav>
                            <Nav.Link href="#cart" style={{ position: 'relative' }}>
                                <Link to='/cart'>
                                <div>
                                <i className="fa-solid fa-bag-shopping"></i>
                                <span
                                    className="badge bg-success"
                                    style={{
                                        backgroundColor: '#088178',
                                        color: 'white',
                                        fontSize: '12px',
                                        height: '20px',
                                        position: 'absolute',
                                        alignItems: 'center',
                                        width: '20px',
                                        display: 'inline-flex',
                                        justifyContent: 'center',
                                        top: '-2px',
                                        right: '-10px',
                                        borderRadius: '50%',
                                    }}
                                >
                                    {cart.cartItems.length > 0 ? cart.cartItems.reduce((a, c) => a  + c.quantity, 0): 0}
                                </span>
                                </div>
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default OffcanvasExample;
