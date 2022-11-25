import React from "react"

export const TestContext = React.createContext<string>("")

export const useTestId = (id?: number | string) => {
  const testContextId = React.useContext(TestContext)

  if (testContextId !== "") {
    return {
      "data-testid": [testContextId, id].join("-"),
    }
  }

  return {
    "data-testid": id?.toString(),
  }
}
