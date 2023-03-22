import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useContext, useState } from "react";
import { UserContext } from "./Context";
import Alert from "react-bootstrap/Alert";
import axios from 'axios';

export const CreateAccount = () => {
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [isMessageVisible, setMessageVisible] = useState("");
  const userContext = useContext(UserContext);
  const [variant, setVariant] = useState();
  const [message, setMessage] = useState();

  const inputIds = {
    email: "formBasicEmail",
    password: "formBasicPassword",
    name: "formBasicName",
  };

  const VARIANTS = {
    success: "success",
    warning: "warning",
    info: "info",
  };

  const myEventHandler = (e) => {
    switch (e.target.id) {
      case inputIds.email:
        setMail(e.target.value);
        break;
      case inputIds.password:
        setPassword(e.target.value);
        break;
      case inputIds.name:
        setName(e.target.value);
        break;

      default:
        return false;
    }
  };

  const OnCrear = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      let user = {
        name: name,
        mail: mail,
        password: password,
        balance: 0,
      };
      axios.get(`http://ec2-3-133-121-144.us-east-2.compute.amazonaws.com:4000/account/create/${user.name}/${user.mail}/${user.password}/${user.balance}`).then((msg)=>{
        userContext.addUser(user);
        displayMessage("Usuario creado exitosamente!", VARIANTS.success);
      }).catch((err)=>{
        const {data} = err.response;
        displayMessage(data, VARIANTS.warning);
      });
      
      clearInputs();
    }
  };

  const displayMessage = (msg, variant) => {
    setMessage(msg);
    setVariant(variant);
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, 5000);
  };

  const clearInputs = () => {
    setName("");
    setMail("");
    setPassword("");
  };

  const validateInputs = () => {
    const regexMail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!mail.match(regexMail)) {
      displayMessage(
        "Por favor ingresa un correo con el formato ejemplo@gmail.com",
        VARIANTS.warning
      );
      return false;
    }

    if (!name.length > 0) {
      displayMessage("Por favor ingresa un nombre", VARIANTS.warning);
      return false;
    }

    if (!password.length > 0) {
      displayMessage("Por favor ingresa una contraseña", VARIANTS.warning);
      return false;
    }

    return true;
  };

  return (
    <div className="container m-auto">
      <Card style={{ width: "18rem" }} className="m-auto">
        <i
          style={{ position: "absolute", top: 0, left: -10, fontSize: 25 }}
          className="fa-solid fa-user-plus"
        />
        <Card.Body>
          <Card.Title>Agregar cuenta</Card.Title>
          <Card.Text>
            Por favor ingrese todos los datos para crear una nueva cuenta.
          </Card.Text>
          <div
            style={{
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "lightgray",
            }}
            className="my-3"
          ></div>
          <Form noValidate>
            <Form.Group className="mb-3" controlId={inputIds.name}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe tu nombre"
                value={name}
                onChange={myEventHandler}
              />
              <Form.Text className="text-muted">
                No vendemos tu información!.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId={inputIds.email}>
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@gmail.com"
                value={mail}
                onChange={myEventHandler}
              />
              <Form.Text className="text-muted">
                Nunca compartiremos tu correo con otras compañias!.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId={inputIds.password}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={myEventHandler}
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit" onClick={OnCrear}>
                Crear
              </Button>
            </div>
          </Form>
          {isMessageVisible && (
            <Alert className="my-2" variant={variant}>
              {message}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
