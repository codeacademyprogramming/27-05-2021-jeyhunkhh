import React, { useCallback, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const AddOrder = ({ show, handleClose, coffees, handleSave }) => {
  const [addForm, setAddForm] = useState({});

  const handleInputChange = useCallback(
    (e) => {
      setAddForm({ ...addForm, [e.target.name]: e.target.value });
    },
    [addForm]
  );
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSave(e, addForm)}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Coffee type select</Form.Label>
            <Form.Control
              as="select"
              name="coffeeId"
              required
              onChange={handleInputChange}
            >
              <option value={""}>Choose coffee</option>
              {coffees.data.map((coffee) => {
                return (
                  <option key={coffee.id} value={coffee.id}>
                    {coffee.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="count">
            <Form.Label>Count</Form.Label>
            <Form.Control
              type="number"
              name="count"
              required
              min={1}
              placeholder="Count"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="note">
            <Form.Label>Special note</Form.Label>
            <Form.Control
              name="note"
              as="textarea"
              rows={3}
              required
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
