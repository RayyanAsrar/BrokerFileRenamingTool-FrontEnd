import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import PageLayout from "../layout/PageLayout"
import ActionButton from "../components/shared/ActionButton"
import BankTemplateSelector from "../components/configure/BankTemplateSelector"
import ClientNameInput from "../components/configure/ClientNameInput"
import { bankTemplates } from "../lib/constants"

export default function ConfigureSettings({ onBack, onNext = () => {} }) {
  const [selectedBank, setSelectedBank] = useState("")
  const [clientNames, setClientNames] = useState([])

  const canProceed = selectedBank && clientNames.length > 0

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
    <PageLayout currentStep={2}>
      {/* Settings */}
      <div className="space-y-6 md:space-y-8">
        <BankTemplateSelector 
          selectedBank={selectedBank}
          onBankSelect={setSelectedBank}
        />
        
        <ClientNameInput
          clientNames={clientNames}
          onClientNamesChange={setClientNames}
        />
      </div>

      {/* Actions */}
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