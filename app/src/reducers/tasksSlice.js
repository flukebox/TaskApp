import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../utils/client'
import CONFIG from '../config'

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {meta:{isLoading:false, failed:false}},
  reducers: {
  },
  extraReducers(builder){ 
    builder
    .addCase(getTasks.pending, (state, action) => {
      console.log("getTasks.pending", state, action);
      state.meta = {isLoading:true, failed:false};
    })
    .addCase(getTasks.fulfilled, (state, action) => {
        console.log("getTasks.fulfilled", state, action);
        action.payload.tasks.map((task, i) =>  state[task._id] =  task);
        state.meta = {isLoading:false, failed:false};
    })
    .addCase(getTasks.rejected, (state, action) => {
      console.log("getTasks.rejected", state, action);
      state.meta = {isLoading:false, failed:true};
    })
    .addCase(addTask.pending, (state, action) => {
      state.meta = {isLoading:true, failed:false};
      console.log("addTask.pending", state, action);
    })
    .addCase(addTask.fulfilled, (state, action) => {
        console.log("addTask.fulfilled", state, action);
        action.payload.tasks.map((task, i) =>  state[task._id] =  task);
        state.meta = {isLoading:false, failed:false};
    })
    .addCase(addTask.rejected, (state, action) => {
      console.log("addTask.rejected", state, action);
      state.meta = {isLoading:false, failed:true};
    })
    .addCase(changeStatus.pending, (state, action) => {
      state.meta = {isLoading:true, failed:false};
      console.log("changeStatus.pending", state, action);
    })
    .addCase(changeStatus.fulfilled, (state, action) => {
        console.log("changeStatus.fulfilled", state, action);
        action.payload.tasks.map((task, i) =>  state[task._id] =  task);
        state.meta = {isLoading:false, failed:false};
    })
    .addCase(changeStatus.rejected, (state, action) => {
      console.log("changeStatus.rejected", state, action);
      state.meta = {isLoading:false, failed:true};
    })
    .addCase(deleteTask.pending, (state, action) => {
      state.meta = {isLoading:true, failed:false};
      console.log("deleteTask.pending", state, action);
    })
    .addCase(deleteTask.fulfilled, (state, action) => {
        console.log("deleteTask.fulfilled", state, action);
        action.payload.tasks.map((task, i) =>  state[task._id] =  task);
        delete state[action.meta.arg.id];
        state.meta = {isLoading:false, failed:false};
    })
    .addCase(deleteTask.rejected, (state, action) => {
      console.log("deleteTask.rejected", state, action);
      state.meta = {isLoading:false, failed:true};
    })
  }
})

export const getTasks = createAsyncThunk( 'tasks/getTasks', async (apiArgs, { dispatch, getState }) => {
    console.log(`We are fetching with getTasks=${apiArgs}`)
    const response = await client.get(`${CONFIG.TASK_HOST_URL}${CONFIG.GET_TASKS}`)
    return response.data;  
  }
)

export const addTask = createAsyncThunk( 'tasks/addTask', async (apiArgs, { dispatch, getState }) => {
    console.log(`We are adding new task with params=${JSON.stringify(apiArgs)}`)
    const response = await client.post(`${CONFIG.TASK_HOST_URL}${CONFIG.ADD_TASK}`, apiArgs)
    return response.data;  
  }
)

export const changeStatus = createAsyncThunk( 'tasks/changeStatus', async (apiArgs, { dispatch, getState }) => {
  console.log(`We are changing status of the task =${JSON.stringify(apiArgs)}`)
  const response = await client.put(`${CONFIG.TASK_HOST_URL}${CONFIG.CHANGE_STATUS}${apiArgs.id}`, apiArgs)
  return response.data;  
  }
)


export const deleteTask = createAsyncThunk( 'tasks/deleteTask', async (apiArgs, { dispatch, getState }) => {
  console.log(`We are deleting the task =${JSON.stringify(apiArgs)}`)
  const response = await client.delete(`${CONFIG.TASK_HOST_URL}${CONFIG.DELETE_TASK}${apiArgs.id}`)
  return response.data;  
  }
)

export default tasksSlice.reducer
export const selectAllTasks = state => { 
  const data = {...state.tasks};
  delete data.meta;
  return Object.values(data);
} 
export const tasksStateMeta = state => { return {...state.tasks.meta}}
