import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import TaskForm from './TaskForm';
import Task from './Task';
import Filterbar from './Filterbar';
import { deleteTask, changeStatus, addTask, selectAllTasks, isTasksLoading, isTasksLoadingFailed} from '../reducers/tasksSlice';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

function App(){
  const dispatch = useDispatch()
  const tasks = useSelector(state => selectAllTasks(state))
  const isLoading = useSelector(state => isTasksLoading(state))
  const isFailed = useSelector(state => isTasksLoadingFailed(state))
  const [status, setStatus] = useState("All");

  
  function addNewTask(task){
     console.log("adding new task", task);
     dispatch(addTask({...task}));
  }

  function onFiltered(_status){
    console.log("filtering the tasks by status", _status);
    setStatus(_status);
  }

  function deleteTheTask(i){
    console.log("deleting the task", i, tasks[i]);
    dispatch(deleteTask({id:tasks[i]._id}));
  }

  function changeTaskStatus(i, _status){
    console.log("updating the status of the task", tasks[i], "new Status = ", _status);
    dispatch(changeStatus({id:tasks[i]._id, status:_status}));
  }
  
  return <Container className="p-3">
        <h1 className="header">Simple Task App </h1>
      <Container className="p-4 mb-4 bg-light rounded-3">
        <TaskForm addNewTask={addNewTask}></TaskForm>
      </Container>
      <Container fluid="md" className="p-2 mb-2 bg-light rounded-3">
        <Row>
          <h1 className="header">All Tasks</h1>
        </Row>
        <Filterbar status={status} onFiltered={onFiltered}/>
        <Row className='p-2 m-2'>          
          { isLoading && <div> Loading tasks...</div>}
          { tasks.map( (task, i) =>  (status === 'All' || task.status === status) && <Task key={i} task={task} id={i} changeStatus={changeTaskStatus} deleteTask={deleteTheTask}></Task>) }
        </Row>
      </Container>
    </Container>;
}

export default App;
