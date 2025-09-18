import { useState } from "react"
import { motion } from "framer-motion"
import { Building2, Plus, Wand2, Copy, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { availableTokens } from "../../lib/constants"   // ✅ only import tokens

const BankTemplateSelector = ({ 
  selectedBank, 
  onBankSelect, 
  onCustomTemplateCreate,
  bankTemplates   // ✅ use prop instead of static import
}) => {
  const [showCustomBank, setShowCustomBank] = useState(false)
  const [customBankName, setCustomBankName] = useState("")
  const [showTemplateBuilder, setShowTemplateBuilder] = useState(false)
  const [customTemplate, setCustomTemplate] = useState("")
  const [copiedTemplate, setCopiedTemplate] = useState(false)

  // Add token to custom template
  const addTokenToTemplate = (token) => {
    setCustomTemplate(prev => prev + token)
  }

  // Extract tokens from a template string
const extractTokens = (template) => {
  const regex = /{[^}]+}/g
  const matches = template.match(regex) || []
  return matches
}

  // Quick template presets
  // const quickPresets = [
  //   { name: "Standard", template: "{Client}_{DocType}_{Date}.pdf" },
  //   { name: "With Issuer", template: "{Client}_{DocType}_{Issuer}_{Date}.pdf" },
  //   { name: "With Period", template: "{Client}_{DocType}_{Period}.pdf" },
  //   { name: "Full Details", template: "{Client}_{CoApplicant}_{DocType}_{Issuer}_{Period}_{Ref}.pdf" }
  // ]

  const handleCustomBankSave = () => {
    if (customBankName.trim() && customTemplate.trim()) {
      const customBankKey = `custom_${Date.now()}`
      const customBankData = {
        name: customBankName,
        template: customTemplate,
        example: generateExample(customTemplate),
        isCustom: true
      }
      
      // Notify parent component
      onCustomTemplateCreate(customBankKey, customBankData)
      
      // Select the new custom bank
      onBankSelect(customBankKey)
      
      // Reset form
      setCustomBankName("")
      setCustomTemplate("")
      setShowCustomBank(false)
      setShowTemplateBuilder(false)
    }
  }

  const generateExample = (template) => {
    const examples = {
      '{Client}': 'JohnSmith',
      '{CoApplicant}': 'JaneSmith',
      '{DocType}': 'Payslip',
      '{Issuer}': 'ABCMining',
      '{Date}': 'Jan2025',
      '{Period}': '2024-11_to_2024-12',
      '{Ref}': 'App123'
    }
    
    let example = template
    Object.entries(examples).forEach(([token, value]) => {
      example = example.replace(new RegExp(token.replace(/[{}]/g, '\\$&'), 'g'), value)
    })
    return example
  }

  const copyTemplate = () => {
    navigator.clipboard.writeText(customTemplate)
    setCopiedTemplate(true)
    setTimeout(() => setCopiedTemplate(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Building2 className="h-5 w-5 text-primary" />
          Select Bank Template
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bank Selection */}
        <div>
          <Label htmlFor="bank-select" className="text-sm md:text-base font-medium">
            Bank/Lender
          </Label>
          <div className="space-y-3">
            <Select value={selectedBank} onValueChange={onBankSelect}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose a bank template..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(bankTemplates).map(([key, bank]) => (
                  <SelectItem key={key} value={key}>
                    {bank.name} {bank.isCustom && "(Custom)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={() => setShowCustomBank(true)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Bank
            </Button>
          </div>
        </div>

        {/* Custom Bank Creation */}
        {showCustomBank && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="space-y-4 border rounded-lg p-4 bg-muted/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <Wand2 className="h-4 w-4 text-primary" />
              <Label className="font-medium">Create Custom Bank Template</Label>
            </div>
            
            <div>
              <Label className="text-sm">Bank Name</Label>
              <Input
                placeholder="e.g., My Custom Bank"
                value={customBankName}
                onChange={(e) => setCustomBankName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Template Pattern</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTemplateBuilder(!showTemplateBuilder)}
                >
                  <Wand2 className="h-3 w-3 mr-1" />
                  {showTemplateBuilder ? 'Hide' : 'Show'} Builder
                </Button>
              </div>
              
              <div className="mt-1 space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., {Client}_{DocType}_{Date}.pdf"
                    value={customTemplate}
                    onChange={(e) => setCustomTemplate(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyTemplate}
                    title="Copy template"
                  >
                    {copiedTemplate ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                
                {customTemplate && (
                  <p className="text-xs text-muted-foreground">
                    Preview: <span className="font-mono">{generateExample(customTemplate)}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Template Builder */}
            {showTemplateBuilder && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4 border-t pt-4"
              >
                {/* Quick Presets */}
                {/* <div>
                  <Label className="text-sm font-medium">Quick Presets</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {quickPresets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() => setCustomTemplate(preset.template)}
                        className="text-xs h-8"
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div> */}

                <Separator />

                {/* Token Builder */}
                <div>
                  <Label className="text-sm font-medium">Click tokens to build template</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {availableTokens.map((tokenObj) => (
                      <Button
                        key={tokenObj.token}
                        variant="secondary"
                        size="sm"
                        onClick={() => addTokenToTemplate(tokenObj.token)}
                        className="text-xs h-8 justify-start"
                        title={tokenObj.description}
                      >
                        {tokenObj.token}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" onClick={() => addTokenToTemplate("_")}>
                      Add _
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addTokenToTemplate(".")}>
                      Add .
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addTokenToTemplate(".pdf")}>
                      Add .pdf
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCustomTemplate("")}>
                      Clear
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleCustomBankSave}
                disabled={!customBankName.trim() || !customTemplate.trim()}
                className="flex-1"
              >
                Save Custom Bank
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCustomBank(false)
                  setCustomBankName("")
                  setCustomTemplate("")
                  setShowTemplateBuilder(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        {/* Selected Bank Preview */}
        {selectedBank && bankTemplates[selectedBank] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <Label className="text-sm md:text-base font-medium">Template Preview</Label>
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
    {selectedBank && bankTemplates[selectedBank] ? (
      extractTokens(bankTemplates[selectedBank].template).map((token) => (
        <Badge key={token} variant="secondary" className="text-xs">
          {token}
        </Badge>
      ))
    ) : (
      availableTokens.map((token) => (
        <Badge key={token.token} variant="secondary" className="text-xs" title={token.description}>
          {token.token}
        </Badge>
      ))
    )}
  </div>
  <p className="text-xs text-muted-foreground mt-2">
    {selectedBank && bankTemplates[selectedBank]
      ? "These tokens are detected from the selected template."
      : "Hover over tokens to see their descriptions."}
  </p>
</div>

          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default BankTemplateSelector
