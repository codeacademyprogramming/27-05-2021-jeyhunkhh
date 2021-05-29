import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCoffee } from "../../coffee/actions";
import { OrderItem } from "./OrderItem";

export const OrdersPage = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders)
    useEffect(() => {
        getCoffee(dispatch)
    }, [dispatch])

  return (
    <Container>
      <h1 className="text-center">Order List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Coffee type</th>
            <th>Count</th>
            <th>Special note</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            {orders.map((order,idx)=>(
                <OrderItem key={order.id} idx={idx} order={order}/>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};
