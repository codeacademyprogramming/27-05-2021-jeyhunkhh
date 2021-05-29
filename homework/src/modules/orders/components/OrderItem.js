import React, { useEffect, useState } from "react";
import { coffeeService } from "../../coffee/service";
import { Image } from "react-bootstrap";

export const OrderItem = ({ order, idx }) => {
  const [coffee, setCoffee] = useState({});
  useEffect(() => {
    coffeeService.getCoffeeById(order.id).then((res) => {
      setCoffee(res);
    });
  }, [order]);
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>
        {" "}
        <Image src={coffee.img} roundedCircle width={50} height={50} />
      </td>
      <td>{coffee.name}</td>
      <td>{order.count}</td>
      <td>{order.note}</td>
      <td>{order.price}</td>
      <td>
        <span className="badge badge-success">{order.status}</span>
      </td>
    </tr>
  );
};
