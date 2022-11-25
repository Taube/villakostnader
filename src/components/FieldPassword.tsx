import { InputAdornment, TextField } from "@mui/material"
import { useTranslation } from "react-i18next"
import { FieldProps } from "./Field"
import LockIcon from "@mui/icons-material/Lock"
import { useTestId } from "../contexts/TestContext"

export const FieldPassword = ({
  id,
  value,
  onChange,
  disabled,
  isValid,
  ...rest
}: FieldProps) => {
  const { t } = useTranslation()
  const testId = useTestId(id)

  return (
    <TextField
      type="password"
      label={t("label.password")}
      onChange={onChange}
      autoComplete="current-password"
      value={value}
      disabled={disabled}
      required
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
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
