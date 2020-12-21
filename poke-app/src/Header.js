import React, { Component } from 'react'
import { Navbar, NavDropdown, Form, Nav, FormControl, Button, Card, NavLink, Container } from "react-bootstrap";

export class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            types: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        let url = "https://pokeapi.co/api/v2/type/";
        fetch(url)
            .then(response => response.json())
            .then(types => {
                this.setState({
                    types: types.results
                })
            })


    }

    handleClick(url) {
        sessionStorage.setItem("url", url);
    }

    render() {
        return (
            <Container >
                <Navbar style={{ "background-color": "#ff5000" }} expand="lg" variant="dark">
                    <Navbar.Brand href="#home">Poke-Front!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="/home">Link</Nav.Link>
                            <NavDropdown title="Buscar por tipo" id="basic-nav-dropdown">
                                {this.state.types.map(
                                    (type) => (
                                        <NavDropdown.Item
                                            onClick={this.handleClick.bind(
                                                this, type.url
                                            )}
                                            href={"/buscar"}>{type.name}</NavDropdown.Item>
                                    )
                                )}
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="light">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}

export default Header
