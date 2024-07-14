import { auth } from "@/auth";
import { Box, Button, Container, Typography } from "@mui/material";

export default async function NotFound() {

  const session = await auth()

  return (
    <Container sx={{ color: "white", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", flex: "1 1 0%" }}>
      <Box sx={{ width: "100%", paddingX: "1.25rem" }}>
        <Typography variant="h1" sx={{ fontSize: { xs: "2rem", lg: "3.5rem" }, lineHeight: "1.2", fontWeight: "600" }}>404</Typography>
        <Typography variant="body1" sx={{ fontSize: "1.125rem", lineHeight: "1.75rem", margin: "0.5rem" }}>No hemos encontrado la página</Typography>
      </Box>
      <Box>
        <Button href={session ? "/inicio" : "/"}>
          Ir a inicio
        </Button>
      </Box>
    </Container>
  )
}