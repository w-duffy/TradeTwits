import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './Context/Modal';
import { ModalAuthProvider } from './Context/ModalAuth';
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <ModalAuthProvider>
        <App />
        </ModalAuthProvider>
      </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
