import { useState } from "react"
import { AlertTriangle, Download, Trash2, ShieldAlert, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function DownloadConfirmationDialog({ 
  onConfirm, 
  documentCount,
  isDownloading = false  // ✅ Accept loading state from parent
}) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    setOpen(false)
    onConfirm() // Trigger the actual download
  }

  return (
    <>
      {/* ✅ Trigger Button with Loading State */}
      <Button
        onClick={() => setOpen(true)}
        disabled={isDownloading}
        className="w-full md:w-auto hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDownloading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Downloading...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            Download ZIP
          </>
        )}
      </Button>

      {/* Confirmation Dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <ShieldAlert className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
              </div>
              <AlertDialogTitle className="text-xl">
                Download & Delete Files?
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base space-y-4 pt-2">
              {/* Main warning */}
              <p className="text-foreground font-medium">
                ⚠️ Important Privacy Notice
              </p>

              {/* What will happen */}
              <div className="bg-muted p-4 rounded-lg space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Download className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">
                      Your {documentCount} file(s) will be downloaded
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      All renamed documents will be packaged in a ZIP file
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trash2 className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">
                      Files will be permanently deleted from our servers
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      This ensures your documents remain private and secure
                    </p>
                  </div>
                </div>
              </div>

              {/* Warning box */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    <strong>Note:</strong> If you need to make changes after downloading, 
                    you'll need to upload and process your files again.
                  </p>
                </div>
              </div>

              {/* Recommendation */}
              <p className="text-xs text-muted-foreground italic">
                💡 Make sure you've reviewed all file names before proceeding
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="mr-2">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-primary hover:bg-primary/90"
            >
              <Download className="h-4 w-4 mr-2" />
              Download & Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}