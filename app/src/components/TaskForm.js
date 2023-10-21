import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'

/**
 * This react component is to handle adding new tasks
 */
export default function TaskForm({addNewTask}) {
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [status, setStatus] = useState("To Do");

    return (
      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Title>Add a new Task </Card.Title>
            <Form onSubmit={(e) => { e.preventDefault(); addNewTask({title, desc, status});}}>
              <Form.Group className="mb-3" controlId="formTaskTitle"  value={title} onChange={(e) => {setTitle(e.target.value);}}>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Task Title" />
                <Form.Text className="text-muted">
                      Please enter task title.
                </Form.Text>
              </Form.Group>    
              <Form.Group className="mb-3" controlId="taskStatus" value={desc} onChange={(e) => {setDesc(e.target.value);}}>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Task Details" />
                <Form.Text className="text-muted">
                    Please enter task description.
                </Form.Text>
              </Form.Group>  
              <Form.Select aria-label="Status" value={status} onChange={(e) => {setStatus(e.target.value);}}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Form.Select> 
              <Button variant="primary" type="submit"> AddTask </Button>
            </Form> 
        </Card.Body>
      </Card>
    );
}