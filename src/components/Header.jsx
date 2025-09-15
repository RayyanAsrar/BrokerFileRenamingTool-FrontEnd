    "use client"

import { motion } from "framer-motion"
import { FileText, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.header
      className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2 bg-primary rounded-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Mortgage Broker File Renaming Tool</h1>
              <p className="text-sm text-muted-foreground">Automate document organization for faster loan processing</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-foreground">File Renaming Tool</h1>
              <p className="text-xs text-muted-foreground">Automate document processing</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:scale-105 transition-transform"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
