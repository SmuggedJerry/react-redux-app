 export function createStore(reducer, initialState) { // функция createStore принимает в себя начальное состояние и reducer
  let state = initialState; // инициализируем переменную state начальным состоянием
  let listeners = [] // инициализируем переменную listeners пустым массивом

  function getState(){ // функция getState возвращает текущее состояние
    return state; // возвращает текущее состояние
  }
  function dispatch(action){ // функция dispatch принимает в себя action
    state = reducer(state, action) // вызываем reducer, который принимает в себя текущее состояние и action
    for (let i=0; i<listeners.length; i++){ // проходимся по массиву listeners
      const listener = listeners[i]; // присваиваем переменной listener элемент массива listeners
      listener() // вызываем каждый элемент массива listeners
    }
}
  function subscribe(listener){ // функция subscribe принимает в себя listener
    listeners.push(listener) // добавляем listener в массив listeners
  }
  return {getState, dispatch, subscribe} // возвращает объект, в котором есть функция getState и dispatch
}