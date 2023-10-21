import React, { useState } from 'react';

import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';

// React component to show the task
export default function Task({task, changeStatus, id}){
    const [show, toggleShow] = useState(true);
    const handleChange = (e) =>  changeStatus(id, e.target.value);
    return (<>
    { show &&  <Toast className="m-2 p-2" show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
            <strong className="me-auto">{task.title}</strong>
        </Toast.Header>
        <Toast.Body> 
            <div className='center m-2 p-2'>
            { task.description }  
            </div>
            <div className='center p-1'>
                <Form>
                    <Form.Check inline value="To Do"  label="To Do" name="group1" type= "radio" checked={ 'To Do' === task.status}  onChange={handleChange} />
                    <Form.Check inline value="In Progress" label="In Progress" name="group1" type= "radio"  checked={ 'In Progress' === task.status} onChange={handleChange} />
                    <Form.Check inline value="Done"  label="Done" name="group1" type= "radio"  checked={ 'Done' === task.status} onChange={handleChange}/>   
                </Form>
            </div>
        </Toast.Body>        
      </Toast>
    }
    </>);
}