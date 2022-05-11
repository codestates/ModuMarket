import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import store from './store/store'
import { persistStore } from 'redux-persist';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import ScrollTop from './components/ScrollTop';


const root = ReactDOM.createRoot(document.getElementById('root'));
export let persistor = persistStore(store);
root.render(
  <BrowserRouter>
    <ScrollTop/>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
