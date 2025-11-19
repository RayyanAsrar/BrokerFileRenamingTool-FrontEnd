import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ConfidenceBadge from "./ConfidenceBadge";
import EditableFileName from "./EditableFileName";

const DocumentTable = ({
  documents,
  editingIndex,
  editedNames,
  onEdit,
  onSave,
  onCancel,
  onFilenameChange,
}) => {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-3 font-medium text-foreground">
              Original Name
            </th>
            <th className="text-left p-3 font-medium text-foreground">
              Doc Type
            </th>
            <th className="text-left p-3 font-medium text-foreground">
              Issuer
            </th>
            <th className="text-left p-3 font-medium text-foreground">Date</th>
            <th className="text-left p-3 font-medium text-foreground">
              Suggested Name
            </th>
            <th className="text-left p-3 font-medium text-foreground">
              Confidence
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((item, index) => (
            <>
              {console.log("Rendering document:", item)}
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground truncate max-w-xs">
                      {item.originalName}
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  <Badge variant="outline">{item.docType || "Unknown"}</Badge>
                </td>
                <td className="p-3 text-sm text-foreground">
                  {item.issuer || "Unknown"}
                </td>
                <td className="p-3 text-sm text-foreground">
                  {item.date || "Unknown"}
                </td>
                <td className="p-3">
                  <EditableFileName
                    filename={
                      editedNames[index] || item.newName || item.suggestedName
                    }
                    isEditing={editingIndex === index}
                    onEdit={() => onEdit(index)}
                    onSave={() => onSave(index)}
                    onCancel={() => onCancel(index)}
                    onChange={(value) => onFilenameChange(index, value)}
                  />
                </td>
                <td className="p-3">
                  <ConfidenceBadge
                    confidence={item.confidenceScore || item.confidence || 0}
                    editedManually={item.editedManually}
                  />
                </td>
              </motion.tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
