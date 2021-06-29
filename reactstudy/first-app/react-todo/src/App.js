import React from "react";
import TodoList from "./todo/TodoList";

function App() {
  const todos = [
    {id: 1, completed: false, title: 'Купить молоко'},
    {id: 2, completed: false, title: 'Купить хлеб'},
    {id: 3, completed: false, title: 'Купить колу'},
  ]


  return (
    <div className='header'>
    <h1 className='text'>Simple ToDo List</h1>
    <TodoList todos={todos}/>
    </div>
  );
}

export default App;
