import { Check, Edit3, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const EditableFileName = ({ 
  filename, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel,
  onChange,
  className = ""
}) => {
  return (
    <div className={className}>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            value={filename}
            onChange={(e) => onChange(e.target.value)}
            className="text-sm"
          />
          <Button
            size="sm"
            onClick={onSave}
            className="hover:scale-105 transition-transform"
          >
            <Check className="h-3 w-3" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onCancel}
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-sm font-mono text-foreground break-all flex-1">
            {filename}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={onEdit}
            className="hover:scale-105 transition-transform ml-2 flex-shrink-0"
          >
            <Edit3 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default EditableFileName
