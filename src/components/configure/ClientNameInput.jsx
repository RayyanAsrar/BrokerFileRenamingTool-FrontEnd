import { useState } from "react"
import { motion } from "framer-motion"
import { User, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const ClientNameInput = ({ clientNames, onClientNamesChange }) => {
  const [newClientName, setNewClientName] = useState("")

  const addClientName = () => {
    if (newClientName.trim() && !clientNames.includes(newClientName.trim())) {
      const updatedNames = [...clientNames, newClientName.trim()]
      onClientNamesChange(updatedNames)
      setNewClientName("")
    }
  }

  const removeClientName = (nameToRemove) => {
    const updatedNames = clientNames.filter((name) => name !== nameToRemove)
    onClientNamesChange(updatedNames)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addClientName()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <User className="h-5 w-5 text-primary" />
          Client Names
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter client name..."
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            onClick={addClientName}
            disabled={!newClientName.trim()}
            className="hover:scale-105 transition-transform flex-shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {clientNames.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <Label className="text-sm md:text-base font-medium">Added Clients ({clientNames.length})</Label>
            <div className="flex flex-wrap gap-2">
              {clientNames.map((name, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="outline" className="flex items-center gap-2 px-3 py-1 text-xs md:text-sm">
                    <span className="break-all">{name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeClientName(name)}
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground flex-shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <p className="text-xs md:text-sm text-muted-foreground">
          Add client names to help with automatic document matching during OCR processing.
        </p>
      </CardContent>
    </Card>
  )
}

export default ClientNameInput