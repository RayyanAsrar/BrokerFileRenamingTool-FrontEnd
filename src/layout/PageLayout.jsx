import { motion } from "framer-motion"
import Header from "./Header"
import StepIndicator from "../components/shared/StepIndicator"
import PageHeader from "../components/shared/PageHeader"
import ProcessSteps from "../components/shared/ProcessSteps"

const PageLayout = ({ 
  children, 
  currentStep,
  title = "Automate Your Document Processing",
  description = "Save hours of manual work by automatically renaming client documents according to bank-specific templates. Upload, process, and download organized files in minutes.",
  showProcessSteps = true,
  maxWidth = "6xl", // 4xl, 6xl, etc.
  showHeader = true
}) => {
  return (
    <div className="min-h-screen bg-background relative">
      {showHeader && <Header />}
      
      <main className={`max-w-${maxWidth} mx-auto px-4 py-8`}>
        <StepIndicator currentStep={currentStep} />
        
        <PageHeader title={title} description={description} />
        
        {showProcessSteps && <ProcessSteps currentStep={currentStep} />}  
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}

export default PageLayout