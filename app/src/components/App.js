import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import TaskForm from './TaskForm';
import Task from './Task';
import Filterbar from './Filterbar';
import { deleteTask, changeStatus, addTask, selectAllTasks, tasksStateMeta} from '../reducers/tasksSlice';
import { useSelector, useDispatch } from 'react-redux';
import ScaleLoader from "react-spinners/ScaleLoader";
import LoadingOverlay from 'react-loading-overlay';
import styled from 'styled-components'

import './App.css';

function App(){
  const dispatch = useDispatch()
  const tasks = useSelector(state => selectAllTasks(state))
  const meta = useSelector(state => tasksStateMeta(state))
  const [status, setStatus] = useState("All");
  const isFailed = () => meta.failed;
  const isLoading = () => meta.isLoading;

  const StyledLoader = styled(LoadingOverlay)`
    .MyLoader_overlay {
      background: rgba(55, 55, 55, 0.5);
      z-index:1100;
    }
    &.MyLoader_wrapper--active {
      overflow: hidden;
    }`;

  
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
  
  console.log("isFailed", isFailed(), "isLoading", isLoading());
  return <Container className="p-3">
        <h1 className="header">Simple Task App </h1>
      <Container className="p-4 mb-4 bg-light rounded-3">
        <StyledLoader  classNamePrefix='MyLoader_'  active={isLoading()} spinner={<ScaleLoader size={150}/>}>
          <TaskForm addNewTask={addNewTask}></TaskForm>
        </StyledLoader>
      </Container>
      <Container fluid="md" className="p-2 mb-2 bg-light rounded-3">
        <Row>
          <h1 className="header">All Tasks</h1>
        </Row>
        <Filterbar status={status} onFiltered={onFiltered}/>
        <Row className='p-2 m-2'>          
          { isLoading() && 
              <div> Loading tasks... <ScaleLoader color="#666"/></div>
          }
          { tasks.map( (task, i) =>  (status === 'All' || task.status === status) && <Task key={i} task={task} id={i} changeStatus={changeTaskStatus} deleteTask={deleteTheTask}></Task>) }
        </Row>
      </Container>
    </Container>;
}

export default App;
