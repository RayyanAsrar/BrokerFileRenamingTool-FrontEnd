import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Download,
  FileText,
  Edit3,
  Check,
  AlertTriangle,
  CheckCircle2,
  FileDown,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/useToast"
import StepIndicator from "./StepIndicator"

export default function ReviewDownload({ processedData, onBack, onNewBatch }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [editedNames, setEditedNames] = useState({})
  const { toast } = useToast()

  const handleEdit = (index) => {
    setEditingIndex(index)
    setEditedNames({
      ...editedNames,
      [index]: editedNames[index] || processedData[index].suggestedName,
    })
  }

  const handleSaveEdit = (index) => {
    setEditingIndex(null)
    // In a real app, this would update the processed data
  }

  const handleCancelEdit = (index) => {
    setEditingIndex(null)
    const newEditedNames = { ...editedNames }
    delete newEditedNames[index]
    setEditedNames(newEditedNames)
  }

  const getConfidenceBadge = (confidence) => {
    if (confidence >= 90) {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          High ({confidence}%)
        </Badge>
      )
    } else if (confidence >= 75) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Medium ({confidence}%)
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Low ({confidence}%)
        </Badge>
      )
    }
  }

  const getStatusSummary = () => {
    const high = processedData.filter((item) => item.confidence >= 90).length
    const medium = processedData.filter((item) => item.confidence >= 75 && item.confidence < 90).length
    const low = processedData.filter((item) => item.confidence < 75).length

    return { high, medium, low, total: processedData.length }
  }

  const handleBulkAccept = () => {
    toast({
      title: "Files Accepted",
      description: "All files have been accepted with current names.",
    })
  }

  const handleExportReview = () => {
    // TODO: connect to backend - generate CSV export
    toast({
      title: "Export Started",
      description: "Review data is being exported to CSV.",
    })
  }

  const handleDownloadZip = () => {
    // TODO: connect to backend - generate ZIP file
    toast({
      title: "Download Started",
      description: "Your renamed files are being prepared for download.",
    })
  }

  const status = getStatusSummary()

  return (
    <div className="max-w-6xl mx-auto">
      <StepIndicator currentStep={3} />

      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Document Preview & Review</h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Review extracted metadata and edit suggestions before download.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <motion.div
          className="text-center opacity-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">✓</div>
          <h3 className="font-semibold text-muted-foreground mb-2">Upload Documents</h3>
          <p className="text-sm text-muted-foreground">Files uploaded successfully</p>
        </motion.div>

        <motion.div
          className="text-center opacity-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">✓</div>
          <h3 className="font-semibold text-muted-foreground mb-2">Configure Settings</h3>
          <p className="text-sm text-muted-foreground">Configuration completed</p>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <FileDown className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Review & Download</h3>
          <p className="text-sm text-muted-foreground">Review suggested names and download organized files</p>
        </motion.div>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Document Preview & Review
          </CardTitle>
          <Button onClick={handleDownloadZip} className="w-full md:w-auto hover:scale-105 transition-transform">
            <Download className="h-4 w-4 mr-2" />
            Download ZIP
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <p className="text-xs md:text-sm text-muted-foreground">
              Showing {status.total} documents • {status.high} High confidence • {status.medium} Medium • {status.low}{" "}
              need review
            </p>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium text-foreground">Original Name</th>
                  <th className="text-left p-3 font-medium text-foreground">Doc Type</th>
                  <th className="text-left p-3 font-medium text-foreground">Issuer</th>
                  <th className="text-left p-3 font-medium text-foreground">Date</th>
                  <th className="text-left p-3 font-medium text-foreground">Suggested Name</th>
                  <th className="text-left p-3 font-medium text-foreground">Confidence</th>
                  <th className="text-left p-3 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {processedData.map((item, index) => (
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
                      <Badge variant="outline">{item.docType}</Badge>
                    </td>
                    <td className="p-3 text-sm text-foreground">{item.issuer}</td>
                    <td className="p-3 text-sm text-foreground">{item.date}</td>
                    <td className="p-3">
                      {editingIndex === index ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={editedNames[index] || item.suggestedName}
                            onChange={(e) =>
                              setEditedNames({
                                ...editedNames,
                                [index]: e.target.value,
                              })
                            }
                            className="text-sm"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(index)}
                            className="hover:scale-105 transition-transform"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleCancelEdit(index)}>
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm font-mono text-foreground">
                          {editedNames[index] || item.suggestedName}
                        </span>
                      )}
                    </td>
                    <td className="p-3">{getConfidenceBadge(item.confidence)}</td>
                    <td className="p-3">
                      {editingIndex !== index && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(index)}
                          className="hover:scale-105 transition-transform"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {processedData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-muted rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground truncate">{item.originalName}</span>
                  </div>
                  {getConfidenceBadge(item.confidence)}
                </div>

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

                <div>
                  <span className="text-xs text-muted-foreground">Suggested Name:</span>
                  {editingIndex === index ? (
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        value={editedNames[index] || item.suggestedName}
                        onChange={(e) =>
                          setEditedNames({
                            ...editedNames,
                            [index]: e.target.value,
                          })
                        }
                        className="text-xs"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(index)}
                        className="hover:scale-105 transition-transform"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleCancelEdit(index)}>
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-mono text-foreground break-all">
                        {editedNames[index] || item.suggestedName}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(index)}
                        className="hover:scale-105 transition-transform ml-2 flex-shrink-0"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6 pt-4 border-t border-border">
            <Button
              onClick={handleBulkAccept}
              variant="outline"
              className="w-full md:w-auto hover:scale-105 transition-transform bg-transparent"
            >
              Bulk Accept All
            </Button>
            <Button
              onClick={handleExportReview}
              variant="outline"
              className="w-full md:w-auto hover:scale-105 transition-transform bg-transparent"
            >
              Export Review
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full md:w-auto px-8 py-3 text-lg hover:scale-105 transition-transform bg-transparent"
          size="lg"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Settings
        </Button>

        <Button
          onClick={onNewBatch}
          variant="outline"
          className="w-full md:w-auto px-8 py-3 text-lg hover:scale-105 transition-transform bg-transparent"
          size="lg"
        >
          Process New Batch
        </Button>
      </div>
    </div>
  )
}
