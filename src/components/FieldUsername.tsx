import { InputAdornment, TextField } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import { useTranslation } from "react-i18next"
import { FieldProps } from "./Field"
import { useTestId } from "../contexts/TestContext"

export const FieldUsername = ({ id, disabled, ...rest }: FieldProps) => {
  const { t } = useTranslation()
  const testId = useTestId(id)

  return (
    <TextField
      id={id}
      label={t("label.username")}
      autoComplete="off"
      required
      autoFocus
      fullWidth
      disabled={disabled}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        ),
      }}
      inputProps={{
        ...testId,
      }}
      {...rest}
    />
  )
}
