import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("https://task-server-iota.vercel.app/name")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [data]);

  //! Handling the submit but and data storing at mongoDB
  const handleInput = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const number = 1 + data?.length;

    fetch("https://task-server-iota.vercel.app/name", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Name added successfully");
          form.reset();
        }
      })
      .catch((er) => console.error(er));

    fetch("https://task-server-iota.vercel.app/number", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ number }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((er) => console.error(er));
  };

  return (
    <div className="m-5">
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleInput}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col>
            <h2 className="ml-3 mt-4">Total user Attempt: {data?.length}</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
