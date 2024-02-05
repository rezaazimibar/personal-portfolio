import { useState, useEffect } from "react"
import { Navbar, Container } from "react-bootstrap"

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState("home")
    const [scolled, seScrolled] = useState(false)
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <img src={""} alt="logo" />
                    <Navbar.Toggle aria-controls="basic-navbar-nav"><span className="navbar-toggler-icon"></span></Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#skill">skill</Nav.Link>
                            <Nav.Link href="#project">project</Nav.Link>
                        </Nav>
                        <span className="navbar-text">
                            <div className="social icon">
                                <a href="#" src={ } alt=""></a>
                                <a href="#" src={ } alt=""></a>
                                <a href="#" src={ } alt=""></a>
                            </div>
                            <button className="vvd" onClick={() => console.log("connect")}><span>let's connect</span></button>
                        </span>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}