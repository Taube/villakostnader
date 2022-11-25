import { Box, Container, Stack } from "@mui/material"
import { deepPurple, purple } from "@mui/material/colors"

type ColorTheme = "purple" | "gray"

function getColorTheme(colorTheme: ColorTheme) {
  switch (colorTheme) {
    case "purple":
      return { bgcolor: deepPurple[50], color: purple[800] }
  }
  return {}
}

export const Section = ({
  children,
  colorTheme,
}: {
  children: React.ReactNode
  colorTheme: ColorTheme
}) => {
  return (
    <Box sx={{ width: "100%", ...getColorTheme(colorTheme) }}>
      <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <Stack spacing={5}>{children}</Stack>
      </Container>
    </Box>
  )
}
