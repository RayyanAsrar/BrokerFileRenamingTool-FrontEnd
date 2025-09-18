import { useState, useCallback, useRef, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { v4 as uuidv4 } from "uuid"

import PageLayout from "../layout/PageLayout"
import ActionButton from "@/components/shared/ActionButton"
import DropZone from "../components/upload/DropZone"
import FileList from "../components/upload/FileList"
import { acceptedFileTypes } from "@/lib/fileHelpers"

export default function UploadDocuments({ onFilesUploaded, onNext, uploadedFiles }) {
  const [files, setFiles] = useState(uploadedFiles || [])
  const bottomRef = useRef(null)

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: uuidv4(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
      }))

      // Use functional update to avoid stale closure
      setFiles((prev) => {
        const updated = [...prev, ...newFiles]
        // notify parent with raw File objects
        onFilesUploaded?.(updated.map((f) => f.file))
        return updated
      })
    },
    [onFilesUploaded],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: true,
  })

  const removeFile = (fileId) => {
    setFiles((prev) => {
      const updated = prev.filter((f) => f.id !== fileId)
      onFilesUploaded?.(updated.map((f) => f.file))
      return updated
    })
  }

  // Helper: find nearest scrollable ancestor
  const findScrollableParent = (el) => {
    if (!el) return null
    let parent = el.parentElement
    while (parent && parent !== document.body) {
      const style = getComputedStyle(parent)
      const overflowY = style.overflowY
      if ((overflowY === "auto" || overflowY === "scroll") && parent.scrollHeight > parent.clientHeight) {
        return parent
      }
      parent = parent.parentElement
    }
    // If none found, return null (we'll fallback to window)
    return null
  }

  // Scroll to bottom target whenever files change
  useEffect(() => {
    if (!bottomRef.current || files.length === 0) return

    const el = bottomRef.current

    const doScroll = () => {
      const scrollParent = findScrollableParent(el)

      if (scrollParent) {
        // compute target top relative to scrollParent
        const parentRect = scrollParent.getBoundingClientRect()
        const elRect = el.getBoundingClientRect()
        const offsetTop = elRect.top - parentRect.top + scrollParent.scrollTop
        scrollParent.scrollTo({ top: offsetTop, behavior: "smooth" })
      } else {
        // fallback to window
        const top = el.getBoundingClientRect().top + window.pageYOffset - 120 // small offset so Next button isn't flush to top
        window.scrollTo({ top, behavior: "smooth" })
      }
    }

    // Wait for DOM paint: RAF + small timeout gives reliable results
    requestAnimationFrame(() => {
      setTimeout(doScroll, 40)
    })
  }, [files.length])

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

      {/* invisible anchor to scroll to */}
      <div ref={bottomRef} />

      <div className="flex justify-center md:justify-end mt-4">
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
