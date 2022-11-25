import React from "react"

import { Box } from "@mui/material"
import { TestContext } from "../contexts/TestContext"

type FormProps = {
  id: string
  children: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export const Form = ({ id, children, onSubmit }: FormProps) => {
  return (
    <TestContext.Provider value={id}>
      <Box component="form" noValidate onSubmit={onSubmit}>
        {children}
      </Box>
    </TestContext.Provider>
  )
}
