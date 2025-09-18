import { motion } from "framer-motion"
import { Upload } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const DropZone = ({ getRootProps, getInputProps, isDragActive }) => {
  return (
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
  )
}

export default DropZone