import { Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useTestId } from "../contexts/TestContext"

type SubmitButtonProps = {
  disabled?: boolean
  isLoading?: boolean
}

export const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  const { t } = useTranslation()
  const testId = useTestId("submit")
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 4, mb: 2 }}
      disabled={isLoading}
      {...testId}
    >
      {t("label.sign-in")}
    </Button>
  )
}
