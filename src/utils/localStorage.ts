export const saveToStorage = (name: string, data: any) => {
  if (!window || !window.localStorage) {
    return
  }

  window.localStorage.setItem(name, JSON.stringify(data))
}

export const getFromStorage = (name: string) => {
  if (!window || !window.localStorage) {
    return ''
  }

  try {
    return JSON.parse(window.localStorage.getItem(name) || '')
  } catch (e) {
    console.error(e)

    return ''
  }
}
