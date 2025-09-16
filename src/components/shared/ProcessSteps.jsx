import { motion } from "framer-motion"
import { Upload, Building2, FileDown, CheckCircle2, Clock } from "lucide-react"

const ProcessSteps = ({ currentStep }) => {
  const steps = [
    {
      id: 1,
      title: "Upload Documents",
      description: "Drag and drop your client files or click to browse",
      icon: Upload,
      completedDescription: "Files uploaded successfully"
    },
    {
      id: 2,
      title: "Configure Settings", 
      description: "Select bank template and enter client information",
      icon: Building2,
      completedDescription: "Configuration completed"
    },
    {
      id: 3,
      title: "Review & Download",
      description: "Review suggested names and download organized files",
      icon: FileDown,
      completedDescription: "Review suggested names and download organized files"
    }
  ]

  const getStepState = (stepId) => {
    if (stepId < currentStep) return 'completed'
    if (stepId === currentStep) return 'active'
    return 'pending'
  }

  const getStepIcon = (step, state) => {
    if (state === 'completed') {
      return <CheckCircle2 className="h-6 w-6 md:h-8 md:w-8" />
    }
    if (state === 'active') {
      return <step.icon className="h-6 w-6 md:h-8 md:w-8" />
    }
    return <Clock className="h-6 w-6 md:h-8 md:w-8" />
  }

  const getStepClasses = (state) => {
    switch (state) {
      case 'completed':
        return {
          container: "text-center opacity-50",
          circle: "w-12 h-12 md:w-16 md:h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4",
          icon: "text-green-600 dark:text-green-400",
          title: "font-semibold text-muted-foreground mb-2 text-sm md:text-base",
          description: "text-xs md:text-sm text-muted-foreground"
        }
      case 'active':
        return {
          container: "text-center",
          circle: "w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4",
          icon: "text-primary-foreground",
          title: "font-semibold text-foreground mb-2 text-sm md:text-base",
          description: "text-xs md:text-sm text-muted-foreground"
        }
      default:
        return {
          container: "text-center opacity-50",
          circle: "w-12 h-12 md:w-16 md:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4",
          icon: "text-muted-foreground",
          title: "font-semibold text-muted-foreground mb-2 text-sm md:text-base",
          description: "text-xs md:text-sm text-muted-foreground"
        }
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
      {steps.map((step, index) => {
        const state = getStepState(step.id)
        const classes = getStepClasses(state)
        
        return (
          <motion.div
            key={step.id}
            className={classes.container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: state === 'pending' ? 0.5 : 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={classes.circle}>
              <motion.div 
                className={classes.icon}
                animate={state === 'completed' ? { scale: [1, 1.1, 1] } : {}}
                transition={state === 'completed' ? { duration: 2, repeat: Infinity } : {}}
              >
                {getStepIcon(step, state)}
              </motion.div>
            </div>
            <h3 className={classes.title}>
              {step.title}
            </h3>
            <p className={classes.description}>
              {state === 'completed' ? step.completedDescription : step.description}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}

export default ProcessSteps