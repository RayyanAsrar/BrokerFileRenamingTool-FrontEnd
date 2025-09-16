import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PageLayout from "../layout/PageLayout"
import ActionButton from "@/components/shared/ActionButton"
import { formatFileSize, getFileIcon, acceptedFileTypes } from "../lib/fileHelpers"

export default function UploadDocuments({ onFilesUploaded, onNext, uploadedFiles }) {
  const [files, setFiles] = useState(uploadedFiles || [])

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: uuidv4(),
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

  return (
    <PageLayout currentStep={1}>
      {/* Drop Zone */}
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

      {/* File List */}
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

      {/* Actions */}
      <div className="flex justify-center md:justify-end">
        <ActionButton
          onClick={onNext}
          disabled={files.length === 0}
        >
          Next
        </ActionButton>
      </div>
    </PageLayout>
  )
}