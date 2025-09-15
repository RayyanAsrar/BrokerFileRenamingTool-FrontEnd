import { motion } from "framer-motion"
import { Upload, Settings, Download, Check } from "lucide-react"

const steps = [
  { id: 1, name: "Upload Documents", icon: Upload, shortName: "Upload" },
  { id: 2, name: "Configure Settings", icon: Settings, shortName: "Configure" },
  { id: 3, name: "Review & Download", icon: Download, shortName: "Review" },
]

export default function StepIndicator({ currentStep }) {
  return (
    <div className="mb-8">
      {/* Desktop version */}
      <div className="hidden md:flex items-center justify-center">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = currentStep === step.id
          const isCompleted = currentStep > step.id

          return (
            <div key={step.id} className="flex items-center">
              <motion.div
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                <span className="font-medium">{step.name}</span>
              </motion.div>

              {index < steps.length - 1 && <div className="w-8 h-px bg-border mx-2" />}
            </div>
          )
        })}
      </div>

      {/* Mobile version */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isCompleted
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </motion.div>
                <span
                  className={`text-xs font-medium text-center ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.shortName}
                </span>

                {index < steps.length - 1 && (
                  <div
                    className="absolute top-5 left-1/2 w-full h-px bg-border -z-10"
                    style={{
                      left: `${(index + 1) * 33.33}%`,
                      width: "33.33%",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-px bg-border" />
          <motion.div
            className="absolute top-0 left-0 h-px bg-primary"
            initial={{ width: "0%" }}
            animate={{
              width: currentStep === 1 ? "33.33%" : currentStep === 2 ? "66.66%" : "100%",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  )
}
