import { createContext, useReducer } from 'react'

export const Context = createContext()

export default function Provider({ children }) {
  const store = {
    data: [],
    alert: undefined,
    modal: undefined,
    link: {},
    mention: '',
    emoji: '',
    image: undefined
  }
  function reducer(state, action) {
    switch(action.type) {
      case 'update':
        return { ...state, data: action.payload }
      case 'alert':
        return { ...state, alert: action.payload }
      case 'modal':
        return { ...state, modal: action.payload }
      case 'link':
        return { ...state, link: action.payload }
      case 'mention':
        return { ...state, mention: action.payload }
      case 'emoji':
        return { ...state, emoji: action.payload }
      case 'image':
        return { ...state, image: action.payload }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, store)
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}
