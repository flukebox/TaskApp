import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../utils/client'
import CONFIG from '../config'

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {},
  reducers: {
  },
  extraReducers(builder){ 
    builder
    .addCase(getTasks.pending, (state, action) => {
        state = {...state, isLoading:true, failed:false}
        console.log("getTasks.pending", state, action);
    })
    .addCase(getTasks.fulfilled, (state, action) => {
        console.log("getTasks.fulfilled", state, action);
        action.payload.tasks.map((task, i) =>  state[task._id] =  task);
        state = {...state, isLoading:false, failed:false}
    })
    .addCase(getTasks.rejected, (state, action) => {
      state = {...state, isLoading:false, failed:true}
      console.log("getTasks.rejected", state, action);
    })
    .addCase(addTask.pending, (state, action) => {
        state = {...state, isLoading:true, failed:false}
        console.log("addTask.pending", state, action);
    })
    .addCase(addTask.fulfilled, (state, action) => {
        console.log("addTask.fulfilled", state, action);
        action.payload.tasks.map((task, i) =>  state[task._id] =  task);
        state = {...state, isLoading:false, failed:false}
    })
    .addCase(addTask.rejected, (state, action) => {
      state = {...state, isLoading:false, failed:true}
      console.log("addTask.rejected", state, action);
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


export default tasksSlice.reducer
export const selectAllTasks = state => Object.values(state.tasks);
export const isTasksLoading = state => state.tasks.isLoading ? true: false
export const isTasksLoadingFailed = state => state.tasks.failed ? true: false