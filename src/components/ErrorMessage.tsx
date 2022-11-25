import { Typography } from "@mui/material"

type Error = {
  data?: {
    message?: string
  }
}

export const ErrorMessage = ({
  children,
  isError = false,
}: {
  children: unknown
  isError: boolean
}) => {
  const errorClass = isError ? "error-message" : "offscreen"

  const error = children as Error
  if (error?.data?.message) {
    return (
      <Typography component="p" className={errorClass}>
        {error?.data?.message}
      </Typography>
    )
  }
  return null
}
