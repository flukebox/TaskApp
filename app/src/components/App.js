import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import TaskForm from './TaskForm';
import Task from './Task';
import './App.css';


function App(){
  const [tasks, setTasks] = useState([]);

  function addNewTask(task){
     console.log(task);
     const newTasks = tasks.slice();
     newTasks.push(task);
     setTasks(newTasks);
  }

  return <Container className="p-3">
        <h1 className="header">Welcome To Our Awesome Task App </h1>
      <Container className="p-4 mb-4 bg-light rounded-3">
        <TaskForm addNewTask={addNewTask}></TaskForm>
      </Container>
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">All Tasks</h1>
        { tasks.map( (task, i) =>  <Task key={i} task={task}></Task>) }
      </Container>
    </Container>;
}

export default App;
