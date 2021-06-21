import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

/*
*/

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

function getGreetings(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  } else {
    return <h1>Hello, Stranger.</h1>;
  }
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element2 = (
  getGreetings(user)
)

function tick() {
const element = (
  <div>
  <h1>Hello, {formatName(user)}!</h1>
  <h2>Good to see you here.</h2>
  <h2>It is {new Date().toLocaleTimeString()}.</h2>
  </div>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);

}
setInterval(tick, 1000);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
