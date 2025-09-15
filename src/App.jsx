import { Route, Routes } from "react-router-dom"
// import UploadDocument from "./components/UploadDocuments"
import UploadDocuments from "./components/UploadDocuments"
import ConfigureSettings from "./components/ConfigureSettings"
import ReviewDownload from "./components/ReviewDownload"
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<UploadDocuments/>} />
      <Route path="/configure" element={<ConfigureSettings/>} />
      <Route path="/review" element={<ReviewDownload/>} />
    </Routes>
    </>
  )
}

export default App
