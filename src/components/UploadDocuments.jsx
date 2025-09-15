"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, FileText, ImageIcon, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import StepIndicator from "./StepIndicator"

const acceptedFileTypes = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/heic": [".heic"],
}

export default function UploadDocuments({ onFilesUploaded, onNext, uploadedFiles }) {
  const [files, setFiles] = useState(uploadedFiles || [])

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
      }))

      const updatedFiles = [...files, ...newFiles]
      setFiles(updatedFiles)
      onFilesUploaded(updatedFiles.map((f) => f.file))
    },
    [files, onFilesUploaded],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: true,
  })

  const removeFile = (fileId) => {
    const updatedFiles = files.filter((f) => f.id !== fileId)
    setFiles(updatedFiles)
    onFilesUploaded(updatedFiles.map((f) => f.file))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type) => {
    if (type === "application/pdf") return FileText
    if (type.startsWith("image/")) return ImageIcon
    return File
  }

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator currentStep={1} />

      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Automate Your Document Processing</h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Save hours of manual work by automatically renaming client documents according to bank-specific templates.
          Upload, process, and download organized files in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
        <motion.div
          className="text-center p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Upload Documents</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Drag and drop your client files or click to browse</p>
        </motion.div>

        <motion.div
          className="text-center p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-6 w-6 md:h-8 md:w-8 text-accent" />
          </div>
          <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Configure Settings</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Select bank template and enter client information</p>
        </motion.div>

        <motion.div
          className="text-center p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="h-6 w-6 md:h-8 md:w-8 text-secondary rotate-180" />
          </div>
          <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Review & Download</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            Review suggested names and download organized files
          </p>
        </motion.div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-4 md:p-8">
          <motion.div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center cursor-pointer transition-all ${
              isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input {...getInputProps()} />
            <Upload
              className={`h-8 w-8 md:h-12 md:w-12 mx-auto mb-4 ${
                isDragActive ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
              {isDragActive ? "Drop files here" : "Upload Box"}
            </h3>
            <p className="text-muted-foreground mb-4 text-sm md:text-base">
              Drag and drop files here, or click to select files
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">Supports PDF, JPG, PNG, HEIC files</p>
          </motion.div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
                  Selected Files ({files.length})
                </h3>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {files.map((fileItem, index) => {
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
                            <p className="font-medium text-foreground truncate text-sm md:text-base">{fileItem.name}</p>
                            <p className="text-xs md:text-sm text-muted-foreground">{formatFileSize(fileItem.size)}</p>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(fileItem.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0 ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center md:justify-end">
        <Button
          onClick={onNext}
          disabled={files.length === 0}
          className="w-full md:w-auto px-8 py-3 text-lg hover:scale-105 transition-transform"
          size="lg"
        >
          Configure Settings
        </Button>
      </div>
    </div>
  )
}
