import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import store from './store/store'
import { Provider } from 'react-redux'
import { getTasks } from './reducers/tasksSlice';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

//Dispatch the getTasks() before our root component renders
store.dispatch(getTasks())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
