import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

export const BackButton = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={goBack}
      color="inherit"
    >
      Back
    </Button>
  )
}
