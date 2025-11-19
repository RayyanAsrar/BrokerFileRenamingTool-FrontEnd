import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UploadDocuments from "@/pages/UploadDocuments";
import ConfigureSettings from "@/pages/ConfigureSettings";
import ReviewDownload from "@/pages/ReviewDownload";
import AnimatedBackground from "../components/shared/AnimatedBackground";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [configurationData, setConfigurationData] = useState(null);
  const [processedData, setProcessedData] = useState([]);

  const handleFilesUploaded = (files) => {
    setUploadedFiles(files);
  };

  // FIXED: Handle single configuration object parameter
  const handleConfigurationComplete = async (configData) => {
    setConfigurationData(configData);

    const formData = new FormData();

    formData.append("template", configData.bankTemplate);
    formData.append("clientName", configData.clientNames[0] || "Unknown");
    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("files", uploadedFiles[i]);
    }
    formData.append("totalFiles", uploadedFiles.length);

    try {
      const response = await fetch("http://localhost:5000/api/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Server response:", result);

      setProcessedData(result.data);
    } catch (error) {
      console.error("Error during configuration completion:", error);
    }

    setCurrentStep(3);
  };

  // Enhanced mock data generation
  const generateMockData = (files, clientName, bankType) => {
    const docTypes = ["Payslip", "BankStatement", "ID", "TaxReturn"];
    const issuers = [
      "ABC Corporation",
      "Commonwealth Bank",
      "NSW Government",
      "Australian Taxation Office",
    ];
    const confidenceScores = [95, 87, 72, 91, 84, 78, 92];

    return files.map((file, index) => ({
      originalName: file.name,
      docType: docTypes[index % docTypes.length],
      issuer: issuers[index % issuers.length],
      date: "2024-11",
      suggestedName: `${clientName.replace(/\s+/g, "")}_${
        docTypes[index % docTypes.length]
      }_${issuers[index % issuers.length].replace(/\s+/g, "")}_2024-11.pdf`,
      confidence: confidenceScores[index % confidenceScores.length],
      file: file,
    }));
  };

  const handleNewBatch = () => {
    setCurrentStep(1);
    setUploadedFiles([]);
    setConfigurationData(null);
    setProcessedData([]);
  };

  const handleBackToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />

      <main className="relative z-10">
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
              <ConfigureSettings
                onBack={() => handleBackToStep(1)}
                onNext={handleConfigurationComplete}
                initialData={configurationData} // Pass back data if user returns
              />
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
                onBack={() => handleBackToStep(2)}
                onNewBatch={handleNewBatch}
                onDataUpdate={setProcessedData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
