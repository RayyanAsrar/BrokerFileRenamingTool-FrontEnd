import { ThemeProvider } from "../context/ThemeProvider"

export default function RootLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="broker-file-theme"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}