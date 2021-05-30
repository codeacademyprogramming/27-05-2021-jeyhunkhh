import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCoffee } from "../../coffee/actions";
import { coffeeService } from "../../coffee/service";
import { addOrder, updateOrder } from "../actions";
import { AddOrder } from "./AddOrder";
import { EditOrder } from "./EditOrder";
import { OrderItem } from "./OrderItem";
import { ORDER_STATUS } from "../actions/consts";
import { v4 as uuidv4 } from "uuid";

export const OrdersPage = () => {
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState(false);
  const [sortField, setSortField] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const coffees = useSelector((state) => state.coffees);

  useEffect(() => {
    getCoffee(dispatch);
  }, [dispatch]);

  const [editValue, setEditValue] = useState(null);
  const handleSave = useCallback(
    async (e, data) => {
      e.preventDefault();
      let price;
      await coffeeService.getCoffeeById(data.coffeeId).then((res) => {
        price = res.price;
      });
      let newData = {
        ...data,
        price: price * data.count,
        id: uuidv4(),
        status: ORDER_STATUS.CREATED,
      };
      dispatch(addOrder(newData));
      handleClose();
    },
    [dispatch]
  );

  const handleEditSave = useCallback(
    async (e, data) => {
      e.preventDefault();
      let price;
      await coffeeService.getCoffeeById(data.coffeeId).then((res) => {
        price = res.price;
      });
      let editData = { ...data, price: price * data.count };
      dispatch(updateOrder(editData));
      handleEditClose();
    },
    [dispatch]
  );

  const onEditOrderData = useCallback((data) => {
    setEditValue(data);
    handleEditShow();
  }, []);

  const computedOrders = useMemo(() => {
    let ordersData = orders;
    let statusOrder = [];
    for (const key in ORDER_STATUS) {
      statusOrder.push(ORDER_STATUS[key]);
    }

    if (sortField) {
      ordersData = ordersData.sort(function (a, b) {
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      });
    }

    return [ordersData];
  }, [sortField, orders]);
  console.log(computedOrders);

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
            <th>
              <Form.Check
                onClick={(e) => setSortField(!sortField)}
                type="checkbox"
                label="Status"
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {computedOrders[0].map((order, idx) => (
            <OrderItem
              key={order.id}
              onEditOrderData={onEditOrderData}
              handleShow={handleEditShow}
              idx={idx}
              order={order}
            />
          ))}
        </tbody>
      </Table>

      <AddOrder
        show={show}
        handleSave={handleSave}
        coffees={coffees}
        handleClose={handleClose}
      />

      <EditOrder
        show={editshow}
        data={editValue}
        coffees={coffees}
        handleEditSave={handleEditSave}
        handleClose={handleEditClose}
      />
    </Container>
  );
};
