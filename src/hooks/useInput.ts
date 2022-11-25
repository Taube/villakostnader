import useLocalStorage from "./useLocalStorage"

export const useInput = (key: string, initValue: string | number | boolean) => {
  const [value, setValue] = useLocalStorage(key, initValue)

  const reset = () => {
    setValue(initValue)
  }

  const attributeObj = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
  }

  return [value, reset, attributeObj]
}
