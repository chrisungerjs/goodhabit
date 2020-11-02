import { useReducer, createContext } from 'react'

const initialState = {
  user: {} as any
}

const Context = createContext({} as any)

const user = (state: any, action: any) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: action.payload }
    case "LOGGED_OUT_USER":
      return { ...initialState }
    default:
      return state
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(user, initialState)
  const value = { state, dispatch }
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }