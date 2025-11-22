import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Upload, FileText, Sparkles } from "lucide-react";

export default function LoadingOverlay({ isLoading, message, progress }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card border border-border rounded-lg p-8 shadow-2xl max-w-md w-full mx-4"
          >
            {/* Animated Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="h-16 w-16 text-primary" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FileText className="h-8 w-8 text-primary/50" />
                </motion.div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-center text-foreground mb-2">
              Processing Your Files
            </h3>

            {/* Message */}
            <p className="text-sm text-muted-foreground text-center mb-6">
              {message || "Please wait while we process your documents..."}
            </p>

            {/* Progress Bar (optional) */}
            {progress !== undefined && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* Processing Steps Animation */}
            <div className="space-y-3 mt-6">
              <ProcessingStep
                icon={<Upload className="h-4 w-4" />}
                label="Uploading files"
                delay={0}
              />
              <ProcessingStep
                icon={<FileText className="h-4 w-4" />}
                label="Extracting document data"
                delay={0.2}
              />
              <ProcessingStep
                icon={<Sparkles className="h-4 w-4" />}
                label="Generating suggested names"
                delay={0.4}
              />
            </div>

            {/* Tip */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-muted-foreground text-center mt-6 italic"
            >
              💡Processing time may vary on file size and network
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Sub-component for animated processing steps
function ProcessingStep({ icon, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-3 text-sm text-muted-foreground"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay }}
        className="text-primary"
      >
        {icon}
      </motion.div>
      <span>{label}</span>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        className="ml-auto"
      >
        <Loader2 className="h-3 w-3 animate-spin text-primary" />
      </motion.div>
    </motion.div>
  );
}