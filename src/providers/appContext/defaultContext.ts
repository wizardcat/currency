import { getFromStorage } from '../../utils/localStorage'

export const useDefaultContext = () => {
  return {
    currencies: getFromStorage('currencies'),
  }
}
