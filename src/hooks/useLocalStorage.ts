import React from "react"

const getLocalValue = (
  key: string,
  initValue: string | number | boolean | Function | null
) => {
  // SSR/Next.js
  if (typeof window === "undefined") {
    return initValue
  }

  // if a value is already stored
  const item = localStorage.getItem(key)
  const localValue = item ? JSON.parse(item) : null
  if (localValue) {
    return localValue
  }

  // return a result of a function
  if (initValue instanceof Function) {
    return initValue()
  }

  return initValue
}

const useLocalStorage = (key: string, initValue: string | number | boolean) => {
  const [value, setValue] = React.useState(() => {
    return getLocalValue(key, initValue)
  })

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
