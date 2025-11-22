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
  maxWidth = "full", // 4xl, 6xl, 7xl, full, etc.
  showHeader = true
}) => {
  // ✅ SOLUTION: Map the prop to actual Tailwind classes
  const maxWidthClasses = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl", 
    "7xl": "max-w-7xl",
    "8xl": "max-w-8xl",
    "full": "max-w-full",
  }

  // Get the correct class or fallback to 6xl
  const widthClass = maxWidthClasses[maxWidth] || "max-w-6xl"

  return (
    <div className="min-h-screen bg-background relative">
      {showHeader && <Header />}
      
      <main className={`${widthClass} mx-auto px-4 py-8`}>
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