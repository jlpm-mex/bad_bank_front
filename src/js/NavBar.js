import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/NavBar.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { UserContext } from "./Context";
import { useContext } from "react";

export const NavBar = () => {
  const context = useContext(UserContext);


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="home">
          <img
            alt=""
            src={require("../assets/logo-48.png")}
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
          Bad Bank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="home">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="addaccount">
              Crear cuenta
            </Nav.Link>
            <Nav.Link as={Link} to="login">
              Login
            </Nav.Link>
            <NavDropdown title="Operaciones" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="depositos">
                <i
                  style={{ color: "blue" }}
                  className="fa-solid fa-plus mx-1 icon"
                ></i>
                Depositos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="retiros">
                <i
                  style={{ color: "red" }}
                  className="fa-solid fa-minus mx-1 icon"
                ></i>
                Retiros
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="movimientos">
                <i
                  style={{ color: "green" }}
                  className="fa-solid fa-bars mx-1 icon"
                ></i>
                Consultas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {context.user?.name?.length > 0 &&
          <Form>
            <Form.Group className="m-auto" controlId="formWelcomeUser">
              <div className="text-center">
                <Form.Text style={{ color: "red" }}>Bienvenido</Form.Text>
              </div>
              <div className="text-center">
                <Form.Label>{`${context?.user?.name}`}</Form.Label>
                <Form.Label>{`(${context?.user?.mail})`}</Form.Label>
              </div>
              <div className="text-center">
                <Form.Label>{`($${context?.user?.balance})`}</Form.Label>
              </div>
            </Form.Group>
          </Form>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
