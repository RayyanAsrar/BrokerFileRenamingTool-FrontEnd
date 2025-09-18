import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatFileSize, getFileIcon } from "@/lib/fileHelpers"

const FileItem = ({ fileItem, index, onRemove }) => {
  const Icon = getFileIcon(fileItem.type)

  return (
    <motion.div
      key={fileItem.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground truncate text-sm md:text-base">
            {fileItem.name}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            {formatFileSize(fileItem.size)}
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(fileItem.id)}
        className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0 ml-2"
      >
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}

export default FileItem