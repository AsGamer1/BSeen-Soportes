import "@/app/globals.css"

import { auth } from "@/auth";
import Navbar from "@/app/_components/navbar";

export default async function RootLayout({ children }) {

  const session = await auth();

  return (
    <>
      <Navbar session={session} />
      {children}
    </>
  );
}
