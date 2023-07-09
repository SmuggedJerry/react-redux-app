import React, { useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { completeTask, getTasks, taskDeleted, titleChanged, loadTasks, getTasksLoadingStatus, createTask } from './store/task'; 
import configureStore from './store/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';

const store = configureStore() // создаём store, который принимает в себя reducer и начальное состояние, которое мы не можем изменить
// создаём store, который принимает в себя reducer и начальное состояние, которое мы не можем изменить

const App = (params) => {
  const state = useSelector(getTasks()); // получаем состояние из store
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError())
  const dispatch = useDispatch(); // получаем функцию dispatch из store

  useEffect(()=>{
    dispatch(loadTasks()); // вызываем функцию dispatch, которая принимает в себя action
  }, [])

  const changeTitle=(taskId)=>{
    dispatch(titleChanged(taskId))
  }

  const deleteTask=(taskId)=>{
    dispatch(taskDeleted(taskId))
  }

  if (isLoading === true) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <p>{error}</p>
  }

  return <>
  <h1>App</h1>
  <button onClick={() => dispatch(createTask())}>Create Task</button>
  <ul>
    {state.map((el)=>(
    <li key={el.id}>
      <p>{el.description}</p>
      <p>{el.title}</p>
      <p>{`Completed: ${el.completed}`}</p>
      <button onClick={() => dispatch(completeTask(el.id))}>Complete</button>
      <button onClick={() => changeTitle(el.id)}>Change Title</button>
      <button onClick={() => deleteTask(el.id)}>Delete</button>
      <hr/>
      </li>
      ))}
  </ul>
  </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);