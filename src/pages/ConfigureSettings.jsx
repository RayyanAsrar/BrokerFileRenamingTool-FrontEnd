import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Building2, User, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import StepIndicator from "../components/shared/StepIndicator"
import PageLayout from "../layout/PageLayout"
import { bankTemplates, availableTokens } from "../lib/constants"
// import Header from "./Header"



// FIXED: Added default props for onNext to handle missing callback data
export default function ConfigureSettings({ onBack, onNext = () => {} }) {
  const [selectedBank, setSelectedBank] = useState("")
  const [clientNames, setClientNames] = useState([])
  const [newClientName, setNewClientName] = useState("")

  const addClientName = () => {
    if (newClientName.trim() && !clientNames.includes(newClientName.trim())) {
      setClientNames([...clientNames, newClientName.trim()])
      setNewClientName("")
    }
  }

  const removeClientName = (nameToRemove) => {
    setClientNames(clientNames.filter((name) => name !== nameToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addClientName()
    }
  }

  const canProceed = selectedBank && clientNames.length > 0

  // FIXED: Enhanced handleNext to pass proper data structure
  const handleNext = () => {
    if (canProceed) {
      const configurationData = {
        selectedBank,
        bankTemplate: bankTemplates[selectedBank],
        clientNames,
        timestamp: new Date().toISOString()
      }
      onNext(configurationData)
    }
  }

  return (
    <>
    <PageLayout currentStep={2}>

      {/* Settings */}
      <div className="space-y-6 md:space-y-8">
        {/* Bank Template */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Building2 className="h-5 w-5 text-primary" />
              Select Bank Template
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="bank-select" className="text-sm md:text-base font-medium">
                Bank/Lender
              </Label>
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose a bank template..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(bankTemplates).map(([key, bank]) => (
                    <SelectItem key={key} value={key}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedBank && (
              <motion.div
              initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <Label className="text-sm md:text-base font-medium">Template Preview</Label>
                  {/* FIXED: Removed distracting continuous pulse animation */}
                  <motion.div
                    className="mt-2 p-3 md:p-4 bg-muted rounded-lg font-mono text-xs md:text-sm break-all"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {bankTemplates[selectedBank].template}
                  </motion.div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-2">
                    Example: <span className="break-all">{bankTemplates[selectedBank].example}</span>
                  </p>
                </div>

                <div>
                  <Label className="text-sm md:text-base font-medium">Available Tokens</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {availableTokens.map((token) => (
                      <Badge key={token.token} variant="secondary" className="text-xs" title={token.description}>
                        {token.token}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Hover over tokens to see their descriptions</p>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Client Names */}
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
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full md:w-auto px-8 py-3 text-lg hover:scale-105 transition-transform bg-transparent"
          size="lg"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Upload
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="w-full md:w-auto px-8 py-3 text-lg hover:scale-105 transition-transform"
          size="lg"
        >
          Process Files
        </Button>
      </div>
   
    </PageLayout>
          </>
  )
}   