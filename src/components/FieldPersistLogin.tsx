import { FormControlLabel, FormGroup, Switch } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useTestId } from "../contexts/TestContext"
import { usePersist } from "../hooks/usePersist"
import { FieldProps } from "./Field"

export const FieldPersistLogin = ({ id, disabled }: FieldProps) => {
  const { t } = useTranslation()
  const [persist, setPersist] = usePersist()
  const testId = useTestId(id)

  const handleToggle = () => {
    setPersist((previousValue: string) => !previousValue)
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            onChange={handleToggle}
            checked={persist}
            disabled={disabled}
            inputProps={{ ...testId, "aria-label": "controlled" }}
          />
        }
        label={
          persist
            ? t("label.trust-this-device")
            : t("label.do-not-trust-this-device")
        }
      />
    </FormGroup>
  )
}
