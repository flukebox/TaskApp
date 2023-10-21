import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../utils/client'
import CONFIG from '../config'
const delay = time => new Promise(res => setTimeout(res, time));

/**
 * We are creating state slice and reducers for tasks
 */
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { meta: { isLoading: false, failed: false, notify: [] }, tasks:[]},
  reducers: {
    consumeNotification(state, action) {
      state.meta.notify.shift()
    }
  },
  extraReducers(builder) {
    builder
      /**
       * Async getTasks handlers 
       */
      /******************* getTasks *************************/
      .addCase(getTasks.pending, (state, action) => {
        console.log("getTasks.pending", state, action);
        state.meta = { ...state.meta, isLoading: true, failed: false };
        state.meta.notify.push("Loading tasks");
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        console.log("getTasks.fulfilled", state, action);
        state.tasks = action.payload.tasks;
        state.meta = { ...state.meta, isLoading: false, failed: false };
        state.meta.notify.push("Successfully, Loaded tasks");
      })
      .addCase(getTasks.rejected, (state, action) => {
        console.log("getTasks.rejected", state, action);
        state.meta = { ...state.meta, isLoading: false, failed: true };
        state.meta.notify.push("Loading tasks failed");
      })
      /**
       * Async addTask handlers
       */
      /******************* addTask *************************/
      .addCase(addTask.pending, (state, action) => {
        state.meta = { ...state.meta, isLoading: true, failed: false };
        console.log("addTask.pending", state, action);
        state.meta.notify.push("Adding new task");
      })
      .addCase(addTask.fulfilled, (state, action) => {
        console.log("addTask.fulfilled", state, action);
        state.tasks = action.payload.tasks;
        state.meta = { ...state.meta, isLoading: false, failed: false };
        state.meta.notify.push("Successfully, added task");
      })
      .addCase(addTask.rejected, (state, action) => {
        console.log("addTask.rejected", state, action);
        state.meta = { ...state.meta, isLoading: false, failed: true };
        state.meta.notify.push("Adding task failed");
      })
      /**
       * Async changeStatus handlers
       */
      /******************* changeStatus *************************/
      .addCase(changeStatus.pending, (state, action) => {
        state.meta = { ...state.meta, isLoading: true, failed: false };
        console.log("changeStatus.pending", state, action);
        state.meta.notify.push("Changing Task status");
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        console.log("changeStatus.fulfilled", state, action);
        state.tasks = action.payload.tasks;
        state.meta = { ...state.meta, isLoading: false, failed: false };
        state.meta.notify.push("Successfully, changed task status");
      })
      .addCase(changeStatus.rejected, (state, action) => {
        console.log("changeStatus.rejected", state, action);
        state.meta = { ...state.meta, isLoading: false, failed: true };
        state.meta.notify.push("Changing status of task failed");
      })
      /**
       * Async deleteTask handlers
       */
      /******************* deleteTask *************************/
      .addCase(deleteTask.pending, (state, action) => {
        state.meta = { ...state.meta, isLoading: true, failed: false };
        console.log("deleteTask.pending", state, action);
        state.meta.notify.push("deleting Task");
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log("deleteTask.fulfilled", state, action);
        state.tasks = action.payload.tasks;
        state.meta = { ...state.meta, isLoading: false, failed: false };
        state.meta.notify.push("Successfully, deleted task");
      })
      .addCase(deleteTask.rejected, (state, action) => {
        console.log("deleteTask.rejected", state, action);
        state.meta = { ...state.meta, isLoading: false, failed: true };
        state.meta.notify.push("deleting task failed");
      })
  }
})

/**
 * Async getTasks 
 */
export const getTasks = createAsyncThunk('tasks/getTasks', async (apiArgs, { dispatch, getState }) => {
  console.log(`We are fetching with getTasks=${apiArgs}`)
  const response = await client.get(`${CONFIG.TASK_HOST_URL}${CONFIG.GET_TASKS}`)
  // this is to test loaders
  await delay(300); // since we're using async functions, we can "await" a promise
  return response.data;
}
)

/**
 * Async addTask 
 */
export const addTask = createAsyncThunk('tasks/addTask', async (apiArgs, { dispatch, getState }) => {
  console.log(`We are adding new task with params=${JSON.stringify(apiArgs)}`)
  const response = await client.post(`${CONFIG.TASK_HOST_URL}${CONFIG.ADD_TASK}`, apiArgs)
  // this is to test loaders
  await delay(300); // since we're using async functions, we can "await" a promise
  return response.data;
}
)

/**
 * Async changeStatus 
 */
export const changeStatus = createAsyncThunk('tasks/changeStatus', async (apiArgs, { dispatch, getState }) => {
  console.log(`We are changing status of the task =${JSON.stringify(apiArgs)}`)
  const response = await client.put(`${CONFIG.TASK_HOST_URL}${CONFIG.CHANGE_STATUS}${apiArgs.id}`, apiArgs)
  // this is to test loaders
  await delay(300); // since we're using async functions, we can "await" a promise
  return response.data;
}
)


/**
 * Async deleteTask 
 */
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (apiArgs, { dispatch, getState }) => {
  console.log(`We are deleting the task =${JSON.stringify(apiArgs)}`)
  const response = await client.delete(`${CONFIG.TASK_HOST_URL}${CONFIG.DELETE_TASK}${apiArgs.id}`)
  await delay(300); // since we're using async functions, we can "await" a promise
  return response.data;
}
)

export const { consumeNotification } = tasksSlice.actions
export default tasksSlice.reducer
export const selectAllTasks = state => state.tasks.tasks
export const tasksStateMeta = state => state.tasks.meta
