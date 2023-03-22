import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { UserContext } from "./Context";
import axios from "axios";

export const Retiros = () => {
  const VARIANTS = {
    sucess: "success",
    warning: "warning",
    info: "info",
  };
  const context = useContext(UserContext);
  const [monto, setMonto] = useState(0);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("warning");

  const myEventHandler = (e) => {
    const regex = /^-?[0-9]*[.]?[0-9]*$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setMonto(e.target.value);
    } else {
      displayMessage("Por favor ingrese un valor numerico", VARIANTS.warning);
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

  const executeValidations = () => {
    if (context?.user === undefined || context.user === null) {
      displayMessage(
        "Inicie sesion antes de hacer un retiro",
        VARIANTS.warning
      );
      return false;
    }

    if (context.user.balance < monto) {
      displayMessage("Ingrese un monto menor al balance disponble", VARIANTS.warning);
      return false;
    }

    return true;
  };

  const onRetirar = (e) => {
    e.preventDefault();
    if (executeValidations()) {
      axios
        .get(`http://ec2-18-118-0-82.us-east-2.compute.amazonaws.com:4000/operaciones/retiro/${context.user.mail}/${monto}`)
        .then((resp) => {
          const data = resp?.data;
          console.log(data);
          context.addUser(data);
          displayMessage(`Retiro exitoso, nuevo balance $${data.balance}`, VARIANTS.sucess);
        });
    }
    setMonto(0);
  };

  return (
    <div className="container m-auto">
      <Card style={{ width: "18rem" }} className="m-auto">
        <div className="text-center">
          <Card.Img
            variant="top"
            src={require("../assets/icons8-withdraw-64.png")}
            className="w-25"
          />
        </div>
        <Card.Body className="text-center">
          <Card.Title>Retiros</Card.Title>
          <Form noValidate>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                placeholder="$0.00"
                value={monto}
                onChange={myEventHandler}
              />
              <Form.Text className="text-muted">
                Ingrese el monto a retirar
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={onRetirar}>
              Retirar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {isMessageVisible && (
        <Alert className="my-2" variant={variant}>
          {message}
        </Alert>
      )}
    </div>
  );
};
