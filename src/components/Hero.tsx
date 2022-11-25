import { Avatar, Typography } from "@mui/material"
import { Section } from "../layouts/Section"

export const Hero = ({
  title,
  children,
}: {
  title?: React.ReactNode
  children?: React.ReactNode
}) => {
  return (
    <Section colorTheme="purple">
      {title ? (
        <Typography component="h1" variant="h2" textAlign={"center"}>
          {title}
        </Typography>
      ) : null}
      <Typography
        component="div"
        variant="h5"
        textAlign="center"
        sx={{ opacity: 0.75 }}
      >
        {children}
      </Typography>
    </Section>
  )
}
