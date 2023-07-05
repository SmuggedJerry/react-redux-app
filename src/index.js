import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as actions from "./store/actions" 
import { initiateStore } from './store/store';

const store = initiateStore() // создаём store, который принимает в себя reducer и начальное состояние, которое мы не можем изменить
// создаём store, который принимает в себя reducer и начальное состояние, которое мы не можем изменить

const App = (params) => {
  const [state, setState] = useState(store.getState())  // инициализируем state начальным состоянием
  // store.dispatch({type: "task/completed", payload:{id:1}}) // вызываем функцию dispatch, которая принимает в себя action
  useEffect(()=>{
    store.subscribe(()=>{ // вызываем функцию subscribe, которая принимает в себя listener
      setState(store.getState()) // вызываем функцию setState, которая принимает в себя текущее состояние
    })
  }, [])
  const completeTask=(taskId)=>{
    store.dispatch(actions.taskCompleted(taskId))
  }

  const changeTitle=(taskId)=>{
    store.dispatch(actions.titleChanged(taskId))
  }

  const taskDeleted=(taskId)=>{
    store.dispatch(actions.taskDeleted(taskId))
  }

  return <>
  <h1>App</h1>
  <ul>
    {state.map((el)=>(
    <li key={el.id}>
      <p>{el.description}</p>
      <p>{el.title}</p>
      <p>{`Completed: ${el.completed}`}</p>
      <button onClick={() => completeTask(el.id)}>Complete</button>
      <button onClick={() => changeTitle(el.id)}>Change Title</button>
      <button onClick={() => taskDeleted(el.id)}>Delete</button>
      <hr/>
      </li>
      ))}
  </ul>
  </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);