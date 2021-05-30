import React, { useCallback, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ORDER_STATUS } from "../actions/consts";

export const EditOrder = ({ show, handleClose, data, handleEditSave }) => {
  const [editOrder, setEditOrder] = useState({});
  useEffect(() => {
    setEditOrder(data);
  }, [data]);

  const handleInputChange = useCallback(
    (e) => {
      setEditOrder({ ...editOrder, [e.target.name]: e.target.value });
    },
    [editOrder]
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e)=>handleEditSave(e,editOrder)}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Coffee type select</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={editOrder?.status || " "}
              onChange={handleInputChange}
            >
              {Object.keys(ORDER_STATUS).map(function (key,idx) {
                return <option key={idx} value={key}>{ORDER_STATUS[key]}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="count">
            <Form.Label>Count</Form.Label>
            <Form.Control
              type="number"
              name="count"
              value={editOrder?.count || " "}
              min={1}
              placeholder="Count"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="note">
            <Form.Label>Special note</Form.Label>
            <Form.Control
              name="note"
              value={editOrder?.note || " "}
              as="textarea"
              rows={3}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" className="w-100" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
