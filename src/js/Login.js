import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useContext, useState } from "react";
import { UserContext } from "./Context";
import axios from "axios";

export const Login = () => {
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
  const context = useContext(UserContext);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");

  const onCerrarSesion = () => {
    context.removeUser();
  };

  const UserCard = () => {
    return (
      <div className="container m-auto">
        <Card style={{ width: "18rem" }} className="m-auto">
          <i
            style={{ position: "absolute", top: 0, left: -10, fontSize: 25 }}
            className="fa-solid fa-address-book"
          />
          <Card.Body>
            <Card.Title className="text-center" style={{backgroundColor:'blue', borderRadius:'10px'}}>Información de Usuario</Card.Title>
              <div className="text-center">
                <p>usuario: {context.user.name}</p>
                <p>{`mail: ${context.user.mail}`}</p>
                <p>{`balance: $${context.user.balance}`}</p>
              </div>
              <div className="text-center">
            <Button variant={VARIANTS.warning} type="submit" onClick={onCerrarSesion}>
              Cerrar Sesion
            </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const LoginCard = () => {
    return (
      <div className="container m-auto">
        <Card style={{ width: "18rem" }} className="m-auto">
          <i
            style={{ position: "absolute", top: 0, left: -10, fontSize: 25 }}
            className="fa-solid fa-user"
          />
          <Card.Body>
            <Card.Title>Iniciar Sesion</Card.Title>
            <div
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "lightgray",
              }}
              className="my-3"
            ></div>
            <Form noValidate>
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
                <Button variant="primary" type="submit" onClick={onLogin}>
                  Iniciar Sesion
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
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

    if (!password.length > 0) {
      displayMessage("Por favor ingresa una contraseña", VARIANTS.warning);
      return false;
    }

    return true;
  };

  const displayMessage = (msg, variant) => {
    setMessage(msg);
    setVariant(variant);
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, 5000);
  };

  const myEventHandler = (e) => {
    switch (e.target.id) {
      case inputIds.email:
        setMail(e.target.value);
        break;
      case inputIds.password:
        setPassword(e.target.value);
        break;
      default:
        return false;
    }
  };

  const onLogin = () => {
    if (validateInputs()) {
      axios
        .get(`http://ec2-18-118-0-82.us-east-2.compute.amazonaws.com:4000/login/${mail}/${password}`)
        .then((resp) => {
          const data = resp?.data;
          context.addUser(data);
        })
        .catch((err) => {
          console.log(err);
          const { data } = err?.response;
          displayMessage(data, VARIANTS.warning);
        });
    }
  };

  return (
    <>
      {context.user?.name?.length > 0 ? UserCard() : LoginCard()}
      {isMessageVisible && (
        <Alert className="my-2" variant={variant}>
          {message}
        </Alert>
      )}
    </>
  );
};
