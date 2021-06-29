import React from 'react';

export default function todoItem({ todo, index }) {
    return <li><strong>{index + 1}</strong>{todo.title}</li>
}