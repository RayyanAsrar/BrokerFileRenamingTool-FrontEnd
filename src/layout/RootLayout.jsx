import "../index.css"
import { ThemeProvider } from "../context/ThemeProvider"
// import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({ children }) {
  return (
   <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      storageKey="broker-filer-theme"   // 👈 add this
      disableTransitionOnChange
    >
      {children}
      {/* <Toaster /> */}
    </ThemeProvider>
  )
}
