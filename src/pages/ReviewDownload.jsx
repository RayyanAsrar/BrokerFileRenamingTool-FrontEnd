import { useState } from "react";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/useToast";
import PageLayout from "../layout/PageLayout";
import ActionButton from "../components/shared/ActionButton";
import DocumentTable from "../components/review/DocumentTable";
import DocumentCard from "../components/review/DocumentCard";

export default function ReviewDownload({
  processedData,
  onBack,
  onNewBatch,
  onDataUpdate,
}) {
  // console.log("Processed Data in ReviewDownload:", processedData);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedNames, setEditedNames] = useState({});
  const [localProcessedData, setLocalProcessedData] = useState(
    processedData || []
  );
  const { toast } = useToast();

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedNames({
      ...editedNames,
      [index]:
        editedNames[index] ||
        localProcessedData[index].newName ||
        localProcessedData[index].suggestedName,
    });
  };

  const handleSaveEdit = async (index) => {
    const newSuggestedName = editedNames[index];

    if (newSuggestedName && newSuggestedName.trim()) {
      const updatedData = [...localProcessedData];
      let result = null;
      try {
        const response = await fetch(
          `https://broker-file-renaming-tool-back-end.vercel.app/api/file/${processedData[index]._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newName: newSuggestedName.trim(),
              oldName: updatedData[index].newName,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        result = await response.json();
        // console.log("Filename update response:", result);
      } catch (error) {
        console.error("Error updating filename:", error);
      }

      updatedData[index] = {
        ...result.data,
      };
      setLocalProcessedData(updatedData);

      if (onDataUpdate) {
        onDataUpdate(updatedData);
      }

      toast({
        title: "Filename Updated",
        description: `Successfully updated filename for ${updatedData[index].originalName}`,
      });
    }

    setEditingIndex(null);
  };

  const handleCancelEdit = (index) => {
    setEditingIndex(null);
    const newEditedNames = { ...editedNames };
    delete newEditedNames[index];
    setEditedNames(newEditedNames);
  };

  const handleFilenameChange = (index, value) => {
    setEditedNames({
      ...editedNames,
      [index]: value,
    });
  };

  const getStatusSummary = () => {
    const high = localProcessedData.filter(
      (item) => (item.confidenceScore || item.confidence || 0) >= 0.9
    ).length;
    const medium = localProcessedData.filter((item) => {
      const conf = item.confidenceScore || item.confidence || 0;
      return conf >= 0.75 && conf < 0.9;
    }).length;
    const low = localProcessedData.filter(
      (item) => (item.confidenceScore || item.confidence || 0) < 0.75
    ).length;
    return { high, medium, low, total: localProcessedData.length };
  };

  // const handleBulkAccept = () => {
  //   toast({
  //     title: "Files Accepted",
  //     description: "All files have been accepted with current names.",
  //   });
  // };

  // const handleExportReview = () => {
  //   toast({
  //     title: "Export Started",
  //     description: "Review data is being exported to CSV.",
  //   });
  // };

  const handleDownloadZip =  async () => {

    try {
      const response = await fetch("https://broker-file-renaming-tool-back-end.vercel.app/api/file/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: localProcessedData.map((item) => item._id)
        })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Get Data from the incoming Streamed response

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "renamed_files.zip");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

     

    } catch (error) {
      console.error("Error during ZIP download:", error);
    }

    toast({
      title: "Download Started",
      description: "Your renamed files are being prepared for download.",
    });
  };

  const status = getStatusSummary();

  return (
    <PageLayout
      currentStep={3}
    >
      <Card className="mb-6">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Document Preview & Review
          </CardTitle>
          <ActionButton
            onClick={handleDownloadZip}
            icon={<Download className="h-4 w-4" />}
            className="w-full md:w-auto hover:scale-105 transition-transform"
          >
            Download ZIP
          </ActionButton>
        </CardHeader>

        <CardContent>
          {/* Status Summary */}
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <p className="text-xs md:text-sm text-muted-foreground">
              Showing {status.total} documents • {status.high} High confidence •{" "}
              {status.medium} Medium • {status.low} need review
            </p>
          </div>

          {/* Desktop Table View */}
          <DocumentTable
            documents={localProcessedData}
            editingIndex={editingIndex}
            editedNames={editedNames}
            onEdit={handleEdit}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
            onFilenameChange={handleFilenameChange}
          />

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {localProcessedData.map((item, index) => (
              <DocumentCard
                key={index}
                item={item}
                index={index}
                isEditing={editingIndex === index}
                filename={editedNames[index] || item.newName}
                onEdit={() => handleEdit(index)}
                onSave={() => handleSaveEdit(index)}
                onCancel={() => handleCancelEdit(index)}
                onFilenameChange={(value) => handleFilenameChange(index, value)}
              />
            ))}
          </div>

          {/* Bulk Actions */}
          {/* <div className="flex flex-col md:flex-row gap-4 mt-6 pt-4 border-t border-border">
            <ActionButton onClick={handleBulkAccept} variant="outline">
              Bulk Accept All
            </ActionButton>
            <ActionButton onClick={handleExportReview} variant="outline">
              Export Review
            </ActionButton>
          </div> */}
        </CardContent>
      </Card>

      {/* Navigation Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <ActionButton
          variant="outline"
          onClick={onBack}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Settings
        </ActionButton>

        <ActionButton onClick={onNewBatch} variant="outline">
          Process New Batch
        </ActionButton>
      </div>
    </PageLayout>
  );
}
