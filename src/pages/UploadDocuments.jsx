import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { v4 as uuidv4 } from "uuid"

import PageLayout from "../layout/PageLayout"
import ActionButton from "@/components/shared/ActionButton"
import DropZone from "../components/upload/DropZone"
import FileList from "../components/upload/FileList"
import { acceptedFileTypes } from "@/lib/fileHelpers"

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
      <DropZone 
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
      />

      <FileList 
        files={files}
        onRemoveFile={removeFile}
      />

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