// import { Route, Routes } from "react-router-dom"
// // import UploadDocument from "./components/UploadDocuments"
// import UploadDocuments from "./components/UploadDocuments"
// import ConfigureSettings from "./components/ConfigureSettings"
// import ReviewDownload from "./components/ReviewDownload"
// function App() {
//   return (
//     <>
//     <Routes>
//       <Route path="/" element={<UploadDocuments/>} />
//       <Route path="/configure" element={<ConfigureSettings/>} />
//       <Route path="/review" element={<ReviewDownload/>} />
//     </Routes>
//     </>
//   )
// }

// export default App
import { useState } from "react"
import UploadDocuments from "./components/UploadDocuments"
import ConfigureSettings from "./components/ConfigureSettings" 
import ReviewDownload from "./components/ReviewDownload"

// Mock data for testing - replace with real OCR results later
const generateMockProcessedData = (files, configurationData) => {
  const docTypes = ["Payslip", "BankStatement", "ID", "TaxReturn", "UtilityBill"]
  const issuers = ["Commonwealth Bank", "ANZ", "Westpac", "NAB", "ATO", "Energy Australia"]
  
  return files.map((file, index) => {
    const randomDocType = docTypes[Math.floor(Math.random() * docTypes.length)]
    const randomIssuer = issuers[Math.floor(Math.random() * issuers.length)]
    const randomClient = configurationData.clientNames[Math.floor(Math.random() * configurationData.clientNames.length)]
    const randomConfidence = Math.floor(Math.random() * 40) + 60 // 60-100%
    
    // Generate suggested filename using the bank template
    const template = configurationData.bankTemplate.template
    const currentDate = new Date()
    const monthYear = currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    const period = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}_to_${currentDate.getFullYear()}-${String(currentDate.getMonth() + 2).padStart(2, '0')}`
    
    let suggestedName = template
      .replace('{Client}', randomClient.replace(/\s+/g, ''))
      .replace('{CoApplicant}', configurationData.clientNames[1]?.replace(/\s+/g, '') || 'N/A')
      .replace('{DocType}', randomDocType)
      .replace('{Issuer}', randomIssuer.replace(/\s+/g, ''))
      .replace('{Date}', monthYear.replace(/\s+/g, ''))
      .replace('{Period}', period)
      .replace('{Ref}', `App${Math.floor(Math.random() * 1000)}`)
    
    return {
      originalName: file.name,
      docType: randomDocType,
      issuer: randomIssuer,
      date: monthYear,
      suggestedName: suggestedName,
      confidence: randomConfidence,
      file: file
    }
  })
}

export default function MortgageBrokerApp() {
  // Main state management
  const [currentStep, setCurrentStep] = useState(1) // 1=Upload, 2=Configure, 3=Review
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [configurationData, setConfigurationData] = useState(null)
  const [processedData, setProcessedData] = useState([])

  // Navigation handlers
  const handleFilesUploaded = (files) => {
    setUploadedFiles(files)
  }

  const handleUploadNext = () => {
    if (uploadedFiles.length > 0) {
      setCurrentStep(2)
    }
  }

  const handleConfigurationComplete = (config) => {
    setConfigurationData(config)
    
    // Generate mock processed data (in real app, this would call your OCR API)
    const mockData = generateMockProcessedData(uploadedFiles, config)
    setProcessedData(mockData)
    
    setCurrentStep(3)
  }

  const handleBackToUpload = () => {
    setCurrentStep(1)
  }

  const handleBackToConfiguration = () => {
    setCurrentStep(2)
  }

  const handleProcessedDataUpdate = (updatedData) => {
    setProcessedData(updatedData)
  }

  const handleNewBatch = () => {
    // Reset everything to start over
    setCurrentStep(1)
    setUploadedFiles([])
    setConfigurationData(null)
    setProcessedData([])
  }

  // Render the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UploadDocuments
            onFilesUploaded={handleFilesUploaded}
            onNext={handleUploadNext}
            uploadedFiles={uploadedFiles}
          />
        )
      
      case 2:
        return (
          <ConfigureSettings
            onBack={handleBackToUpload}
            onNext={handleConfigurationComplete}
          />
        )
      
      case 3:
        return (
          <ReviewDownload
            processedData={processedData}
            onBack={handleBackToConfiguration}
            onNewBatch={handleNewBatch}
            onDataUpdate={handleProcessedDataUpdate}
          />
        )
      
      default:
        return <div>Error: Invalid step</div>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentStep()}
    </div>
  )
}