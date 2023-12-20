// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4001');

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>,
  document.getElementById('root')
);
