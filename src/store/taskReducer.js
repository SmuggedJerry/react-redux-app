import { taskUpdated, taskDeleted } from "./actionTypes";

export function taskReducer(state = [], action) {
    switch (action.type) {
      // case "task/completed":
      //   const newArray = [...state] // создаём новый массив, который является копией state
      //   const elementIndex = newArray.findIndex(el=>el.id===action.payload.id) // находим индекс элемента, который нужно изменить
      //   newArray[elementIndex].completed = true // изменяем значение completed на true
      //   return newArray; // возвращаем новый массив
        case taskUpdated:{
          const newArray = [...state] // создаём новый массив, который является копией state
          const elementIndex = newArray.findIndex(el=>el.id===action.payload.id) // находим индекс элемента, который нужно изменить
          newArray[elementIndex] = {
            ...newArray[elementIndex],
            ...action.payload
          }
          return newArray; // возвращаем новый массив
        }
        case taskDeleted:{
            return state.filter(el=>el.id!==action.payload.id)
        }
  
      default:
      return state;
    }}