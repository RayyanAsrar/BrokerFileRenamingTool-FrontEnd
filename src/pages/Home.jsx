import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/Header"
import UploadDocuments from "@/components/UploadDocuments"
import ConfigureSettings from "@/components/ConfigureSettings"
import ReviewDownload from "@/components/ReviewDownload"
import AnimatedBackground from "@/components/AnimatedBackground"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [selectedBank, setSelectedBank] = useState("")
  const [clientNames, setClientNames] = useState([])
  const [processedData, setProcessedData] = useState([])

  const handleFilesUploaded = (files) => {
    setUploadedFiles(files)
  }

  const handleConfigurationComplete = (bankTemplate, clients) => {
    setSelectedBank(bankTemplate)
    setClientNames(clients)

    // TODO: connect to backend - OCR processing would happen here
    // For now, generate mock data
    const mockProcessedData = generateMockData(uploadedFiles, clients[0] || "John Smith")
    setProcessedData(mockProcessedData)
    setCurrentStep(3)
  }

  const generateMockData = (files, clientName) => {
    const docTypes = ["Payslip", "BankStatement", "ID", "TaxReturn"]
    const issuers = ["ABC Corporation", "Commonwealth Bank", "NSW Government", "Australian Taxation Office"]
    const confidenceScores = [95, 87, 72, 91]

    return files.map((file, index) => ({
      originalName: file.name,
      docType: docTypes[index % docTypes.length],
      issuer: issuers[index % issuers.length],
      date: "2024-11",
      suggestedName: `${clientName.replace(" ", "")}_${docTypes[index % docTypes.length]}_${issuers[index % issuers.length].replace(" ", "")}_2024-11.pdf`,
      confidence: confidenceScores[index % confidenceScores.length],
      file: file,
    }))
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <UploadDocuments
                onFilesUploaded={handleFilesUploaded}
                onNext={() => setCurrentStep(2)}
                uploadedFiles={uploadedFiles}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="configure"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ConfigureSettings onBack={() => setCurrentStep(1)} onNext={handleConfigurationComplete} />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ReviewDownload
                processedData={processedData}
                onBack={() => setCurrentStep(2)}
                onNewBatch={() => {
                  setCurrentStep(1)
                  setUploadedFiles([])
                  setProcessedData([])
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
