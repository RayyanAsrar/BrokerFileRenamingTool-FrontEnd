import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UploadDocuments from "@/pages/UploadDocuments";
import ConfigureSettings from "@/pages/ConfigureSettings";
import ReviewDownload from "@/pages/ReviewDownload";
import AnimatedBackground from "../components/shared/AnimatedBackground";
import LoadingOverlay from "../components/shared/LoadingOverlay";
import { useToast } from "@/hooks/useToast";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [configurationData, setConfigurationData] = useState(null);
  const [processedData, setProcessedData] = useState([]);
  
  // ✅ Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { toast } = useToast();

  const handleFilesUploaded = (files) => {
    setUploadedFiles(files);
  };

  const handleConfigurationComplete = async (configData) => {
    setConfigurationData(configData);

    const formData = new FormData();
    formData.append("template", configData.bankTemplate.template);
    formData.append("clientName", configData.clientNames[0] || "Unknown");
    
    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("files", uploadedFiles[i]);
    }
    formData.append("totalFiles", uploadedFiles.length);

    // ✅ Start loading
    setIsLoading(true);
    setLoadingMessage(`Processing ${uploadedFiles.length} file(s)...`);

    try {
      const response = await fetch(
        "https://broker-file-renaming-tool-back-end.vercel.app/api/upload/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      
      // ✅ Success
      setProcessedData(result.data);
      setCurrentStep(3);
      
      toast({
        title: "Success!",
        description: `Successfully processed ${result.data.length} documents`,
      });
      
    } catch (error) {
      console.error("Error during configuration completion:", error);
      
      // ✅ Show error to user
      toast({
        title: "Processing Failed",
        description: error.message || "Failed to process files. Please try again.",
        variant: "destructive",
      });
    } finally {
      // ✅ Stop loading
      setIsLoading(false);
      setLoadingMessage("");
    }
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

      {/* ✅ Loading Overlay */}
      <LoadingOverlay 
        isLoading={isLoading} 
        message={loadingMessage}
      />

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
                initialData={configurationData}
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