import { useReducer, createContext } from 'react'
import { useDefaultContext } from './defaultContext'
import { saveToStorage } from '../../utils/localStorage'

type ContextState = {
  state: any
  dispatch: React.Dispatch<any>
}

const AppContext = createContext({} as ContextState)

let reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'setCurrencies':
      saveToStorage('currencies', action.currencies)

      return { ...state, currencies: action.currencies }
  }
}

const AppContextProvider = ({ children }: any) => {
  const defaultContext = useDefaultContext()

  const [state, dispatch] = useReducer(reducer, defaultContext)

  const value: ContextState = { state, dispatch }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContext, AppContextProvider }
