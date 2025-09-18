import { motion } from "framer-motion"
import { Building2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { bankTemplates, availableTokens } from "../../lib/constants"

const BankTemplateSelector = ({ selectedBank, onBankSelect }) => {
  return (
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
          <Select value={selectedBank} onValueChange={onBankSelect}>
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
  )
}

export default BankTemplateSelector