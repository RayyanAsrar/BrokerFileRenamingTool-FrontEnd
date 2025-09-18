import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import PageLayout from "../layout/PageLayout"
import ActionButton from "../components/shared/ActionButton"
import BankTemplateSelector from "../components/configure/BankTemplateSelector"
import ClientNameInput from "../components/configure/ClientNameInput"
import { bankTemplates } from "@/lib/constants"

export default function ConfigureSettings({ onBack, onNext = () => {} }) {
  const [selectedBank, setSelectedBank] = useState("")
  const [clientNames, setClientNames] = useState([])
  const [customBankTemplates, setCustomBankTemplates] = useState({})

  // Combine default and custom templates
  const allBankTemplates = { ...bankTemplates, ...customBankTemplates }

  const handleCustomTemplateCreate = (bankKey, bankData) => {
    setCustomBankTemplates(prev => ({
      ...prev,
      [bankKey]: bankData
    }))
  }

  const canProceed = selectedBank && clientNames.length > 0

  const handleNext = () => {
    if (canProceed) {
      const configurationData = {
        selectedBank,
        bankTemplate: allBankTemplates[selectedBank],
        clientNames,
        customTemplates: customBankTemplates, // Include custom templates
        timestamp: new Date().toISOString()
      }
      onNext(configurationData)
    }
  }

  return (
    <PageLayout currentStep={2}>
      <div className="space-y-6 md:space-y-8">
        <BankTemplateSelector 
          selectedBank={selectedBank}
          onBankSelect={setSelectedBank}
          onCustomTemplateCreate={handleCustomTemplateCreate}
          bankTemplates={allBankTemplates}   // ✅ pass merged templates
        />
        
        <ClientNameInput
          clientNames={clientNames}
          onClientNamesChange={setClientNames}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
        <ActionButton
          variant="outline"
          onClick={onBack}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Upload
        </ActionButton>

        <ActionButton
          onClick={handleNext}
          disabled={!canProceed}
        >
          Process Files
        </ActionButton>
      </div>
    </PageLayout>
  )
}
