import React from "react"

export const usePersist = () => {
  const itemPersist = localStorage.getItem("persist")
  const [persist, setPersist] = React.useState(
    itemPersist ? JSON.parse(itemPersist) : false
  )

  React.useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist))
  }, [persist])

  return [persist, setPersist]
}
