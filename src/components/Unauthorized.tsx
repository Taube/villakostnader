import Container from "@mui/material/Container"
import { BackButton } from "./BackButton"

export const Unauthorized = () => {
  return (
    <Container maxWidth="lg">
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <p>
        <BackButton />
      </p>
    </Container>
  )
}
