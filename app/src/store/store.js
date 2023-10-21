import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../reducers/tasksSlice';

// configure store with reducers
export default configureStore({
  reducer: {
    tasks: tasksReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});
