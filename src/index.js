import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./js/NavBar";
import { Home } from "./js/Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import {CreateAccount} from './js/CreateAccount'
import {Login} from './js/Login';
import {Depositos} from './js/Deposits';
import {Retiros} from './js/Retiros'
import {Movimientos} from './js/Movimientos';
import { UserContextProvider } from "./js/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <HashRouter>
      <UserContextProvider>
      <NavBar />
      <div className="container" style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="home" element={<Home/>} />
          <Route path="addaccount" element={<CreateAccount/>} />
          <Route path="login" element={<Login/>} />
          <Route path="depositos" element={<Depositos/>} />
          <Route path="retiros" element={<Retiros/>} />
          <Route path="movimientos" element ={<Movimientos/>} />
        </Routes>
      </div>
      </UserContextProvider>
    </HashRouter>
  </>
);
