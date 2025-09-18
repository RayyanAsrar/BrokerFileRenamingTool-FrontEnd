import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ConfidenceBadge from "./ConfidenceBadge"
import EditableFileName from "./EditableFileName"

const DocumentCard = ({
  item,
  index,
  isEditing,
  filename,
  onEdit,
  onSave,
  onCancel,
  onFilenameChange
}) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 bg-muted rounded-lg space-y-3"
    >
      {/* Header with name and confidence */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-sm font-medium text-foreground truncate">
            {item.originalName}
          </span>
        </div>
        <ConfidenceBadge
          confidence={item.confidence}
          editedManually={item.editedManually}
        />

      </div>

      {/* Document details */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground">Type:</span>
          <Badge variant="outline" className="ml-1 text-xs">
            {item.docType}
          </Badge>
        </div>
        <div>
          <span className="text-muted-foreground">Date:</span>
          <span className="ml-1 text-foreground">{item.date}</span>
        </div>
        <div className="col-span-2">
          <span className="text-muted-foreground">Issuer:</span>
          <span className="ml-1 text-foreground">{item.issuer}</span>
        </div>
      </div>

      {/* Editable filename */}
      <div>
        <span className="text-xs text-muted-foreground">Suggested Name:</span>
        <div className="mt-1">
          <EditableFileName
            filename={filename}
            isEditing={isEditing}
            onEdit={onEdit}
            onSave={onSave}
            onCancel={onCancel}
            onChange={onFilenameChange}
            className="w-full"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default DocumentCard
