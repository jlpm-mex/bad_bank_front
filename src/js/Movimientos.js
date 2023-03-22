
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { UserContext } from "./Context";

export const Movimientos = ()=> {
    const context = useContext(UserContext);
    const [movimientos, setMovimientos] = useState([]);

    useEffect(()=>{
        if(context?.user?._id !== undefined){
            axios.get(`http://ec2-18-118-0-82.us-east-2.compute.amazonaws.com:4000/operaciones/${context.user._id}`).then((resp)=>{
                let data = resp.data;
                setMovimientos(data);
            });
        }
    },[context?.user?._id]);
    
    const drawRow = (idx,mail,monto,fecha,tipo) => {
        return(
          <tr>
            <td>{`${idx}`}</td>
            <td>{`${mail}`}</td>
            <td>{`$${monto}`}</td>
            <td>{`${fecha}`}</td>
            <td>{`${tipo}`}</td>
          </tr>
        )
    }

    const DrawTableBody = () => {
        return(
            movimientos.map((value,idx)=>{
                return (
                    drawRow(idx,value.mail, value.monto, value.fecha, value.type)
                )
            }));
        
    }

    return(
        <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Mail</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
         {
            <DrawTableBody/>
         }
        </tbody>
      </Table>
    );
}