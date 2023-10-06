import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Form, Row, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { format } from 'date-fns';
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Added date');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todoItem = {
        text: newTodo,
        completed: false,
        dueDate: null,
        createdDate: format(new Date(), 'MM/dd/yyyy'), // Use a consistent date format
      };
      setTodos([...todos, todoItem]);
      setNewTodo('');
    }
  };

  const toggleCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const sortFunctions = {
    'Added date': (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
    'Due date': (a, b) =>
      (a.dueDate && b.dueDate ? new Date(a.dueDate) - new Date(b.dueDate) : 0),
  };

  const sortedTodos = todos.slice().sort(sortFunctions[sort]);

  const filteredAndSortedTodos = sortedTodos.filter((todo) => {
    if (filter === 'All') {
      return true;
    } else if (filter === 'Completed') {
      return todo.completed;
    } else if (filter === 'Active') {
      return !todo.completed;
    } else if (filter === 'Has due date') {
      return todo.dueDate !== null;
    }
    return true;
  });

  const renderTooltip = (text) => (
    <Tooltip id="button-tooltip">{text}</Tooltip>
  );

  return (
    <Container className="py-5">
      <Row className="justify-content-center align-items-center h-100">
        <Col>
          <Card style={{ borderRadius: '.75rem', backgroundColor: '#eff1f2' }}>
            <Card.Body className="py-4 px-4 px-md-5">
              <h1 className="text-center mt-3 mb-4 pb-3 text-primary">
                <u>My To-Dos</u>
              </h1>
              <div className="pb-2">
                <Card>
                  <Card.Body>
                    <Form>
                      <Row className="align-items-center">
                        <Col>
                          <Form.Control
                            type="text"
                            placeholder="Add new..."
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            aria-label="Add new todo"
                          />
                        </Col>
                        <OverlayTrigger
                          placement="top"
                          overlay={renderTooltip('Set due date')}
                        >
                          <Button
                            variant="primary"
                            size="lg"
                            className="me-3"
                            style={{ background: 'linear-gradient(to right, #FF512F, #DD2476)', border: 'none' }}
                            onClick={addTodo}
                          >
                            Add
                          </Button>
                        </OverlayTrigger>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
              <hr className="my-4" />
              <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                <p className="small mb-0 me-2 text-muted">Filter</p>
                <Form.Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Completed">Completed</option>
                  <option value="Active">Active</option>
                  <option value="Has due date">Has due date</option>
                </Form.Select>
                <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                <Form.Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="Added date">Added date</option>
                  <option value="Due date">Due date</option>
                </Form.Select>
                <OverlayTrigger
                  placement="top"
                  overlay={renderTooltip('Ascending')}
                >
                  <Button variant="success" className="ms-2">
                    <i className="fas fa-sort-amount-down-alt"></i>
                  </Button>
                </OverlayTrigger>
              </div>
              <ul className="list-group rounded-0 bg-transparent">
                {filteredAndSortedTodos.map((todo, index) => (
                  <li className="list-group-item d-flex align-items-center" key={index}>
                    <Form.Check
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleCompletion(index)}
                    />
                    <span className={`lead fw-normal mb-0 ${todo.completed ? 'text-decoration-line-through' : ''}`}>
                      {todo.text}
                    </span>
                    <div className="ms-auto">
                      <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Edit todo')}
                      >
                        <Button variant="info" className="me-3">
                          <i className="fas fa-pencil-alt"></i>
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Delete todo')}
                      >
                        <Button
                          variant="danger"
                          onClick={() => deleteTodo(index)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </OverlayTrigger>
                    </div>
                    <div className="text-end text-muted">
                      <OverlayTrigger
                        placement="top"
                        overlay={renderTooltip('Created date')}
                      >
                        <p className="small text-muted mb-0">
                          <i className="fas fa-info-circle me-2"></i>
                          {todo.createdDate}
                        </p>
                      </OverlayTrigger>
                    </div>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoApp;

