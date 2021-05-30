import React, { useCallback, useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCoffee } from "../../coffee/actions";
import { coffeeService } from "../../coffee/service";
import { addOrder } from "../actions";
import { AddOrder } from "./AddOrder";
import { OrderItem } from "./OrderItem";

export const OrdersPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const {orders} = useSelector((state) => state.orders);
  console.log(orders);
  const coffees = useSelector((state) => state.coffees);
  useEffect(() => {
    getCoffee(dispatch);
  }, [dispatch]);

  const handleSave = useCallback(
    async (e, data) => {
      e.preventDefault();
      let price;
      await coffeeService.getCoffeeById(data.coffeeId).then((res)=>{
         price = res.price;
      })
      let newData = {...data, price: price * data.count}
      dispatch(addOrder(newData))
      handleClose();
    },
    [dispatch]
  );

  return (
    <Container>
      <h1 className="text-center my-3">Order List</h1>
      <Button
        variant="primary"
        className="float-right mb-1"
        onClick={handleShow}
      >
        Create Order
      </Button>
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
          {orders.map((order, idx) => (
            <OrderItem key={order.id} idx={idx} order={order} />
          ))}
        </tbody>
      </Table>

      <AddOrder
        show={show}
        handleSave={handleSave}
        coffees={coffees}
        handleClose={handleClose}
      />
    </Container>
  );
};
