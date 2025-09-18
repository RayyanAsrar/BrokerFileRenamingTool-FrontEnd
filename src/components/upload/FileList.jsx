import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import FileItem from "./FileItem"

const FileList = ({ files, onRemoveFile }) => {
  if (files.length === 0) return null

  return (
    <AnimatePresence>
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
              {files.map((fileItem, index) => (
                <FileItem
                  key={fileItem.id}
                  fileItem={fileItem}
                  index={index}
                  onRemove={onRemoveFile}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

export default FileList