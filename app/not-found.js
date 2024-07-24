import { Box, Button, Container, Typography } from "@mui/material";

export default async function NotFound() {

  return (
    <Container sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: "1 1 0%" }}>
      <Box sx={{ width: "100%", paddingX: "1.25rem" }}>
        <Typography variant="h1" sx={{ fontSize: { xs: "2rem", lg: "3.5rem" }, lineHeight: "1.2", fontWeight: "600" }}>404</Typography>
        <Typography variant="body1" sx={{ fontSize: "1.125rem", lineHeight: "1.75rem", margin: "0.5rem" }}>No hemos encontrado la página</Typography>
      </Box>
      <Box>
        <Button href="/">
          Ir a inicio
        </Button>
      </Box>
    </Container>
  )
}