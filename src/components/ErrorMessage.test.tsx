import { render, screen } from "@testing-library/react"
import { ErrorMessage } from "./ErrorMessage"
// import user from '@testing-library/user-event';

test("Renders ErrorMessage if there is one", async () => {
  const { container } = render(
    <ErrorMessage
      children={{ data: { message: "Shit hit the fan" } }}
      isError={true}
    />
  )
  const errorMessage = container.getElementsByClassName("error-message")
  expect(errorMessage.length).toBe(1)
})

test("No ErrorMessage if isError is false", async () => {
  const { container } = render(
    <ErrorMessage
      children={{ data: { message: "Shit hit the fan" } }}
      isError={false}
    />
  )
  const errorMessage = container.getElementsByClassName("error-message")
  expect(errorMessage.length).toBe(0)
})

test("No ErrorMessage if there is none", async () => {
  const { container } = render(
    <ErrorMessage children={{ data: {} }} isError={true} />
  )
  const errorMessage = container.getElementsByClassName("error-message")
  expect(errorMessage.length).toBe(0)
})
