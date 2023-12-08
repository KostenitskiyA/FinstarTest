import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

const Navigation = () => {
    return (
        <Navbar expand="sm" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/">Главная</Nav.Link>
                    <Nav.Link href="/create-objects">Создание объектов</Nav.Link>
                    <Nav.Link href="/get-objects">Таблица объектов</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navigation;
