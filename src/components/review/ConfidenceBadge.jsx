import { AlertTriangle, CheckCircle2, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const ConfidenceBadge = ({ confidence, editedManually }) => {

  const updatedConfidence = confidence * 100;

  if (editedManually) {
    return (
      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        {/* <Pencil className="h-3 w-3 mr-1" /> */}
        Edited Manually
      </Badge>
    )
  }

  if (updatedConfidence >= 90) {
    return (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        High ({updatedConfidence}%)
      </Badge>
    )
  } else if (updatedConfidence >= 75) {
    return (
      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Medium ({updatedConfidence}%)
      </Badge>
    )
  } else {
    return (
      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Low ({updatedConfidence}%)
      </Badge>
    )
  }
}

export default ConfidenceBadge
