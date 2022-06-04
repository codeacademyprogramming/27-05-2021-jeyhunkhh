import React, { useEffect, useState } from "react";
import { coffeeService } from "../../coffee/service";
import { Image, Button } from "react-bootstrap";
import { ORDER_STATUS } from "../actions/consts";

export const OrderItem = ({ order, idx, handleShow, onEditOrderData }) => {
  const [coffee, setCoffee] = useState({});
  useEffect(() => {
    coffeeService.getCoffeeById(order.coffeeId).then((res) => {
      setCoffee(res);
    });
  }, [order]);
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>
        <Image src={coffee.img} roundedCircle width={50} height={50} />
      </td>
      <td>{coffee.name}</td>
      <td>{order.count}</td>
      <td>{order.note}</td>
      <td>{order.price.toFixed(2)}</td>
      <td>
        <span
          className={`badge ${
            order.status === ORDER_STATUS.CREATED
              ? "badge-primary"
              : order.status === ORDER_STATUS.IN_PROGRESS
              ? "badge-warning"
              : "badge-success"
          } `}
        >
          {order.status}
        </span>
      </td>
      <td>
        {order.status !== ORDER_STATUS.DONE && (
          <Button onClick={() => onEditOrderData(order)} variant="outline-info">
            <i className="fas fa-pencil-alt"></i>
          </Button>
        )}
      </td>
    </tr>
  );
};
