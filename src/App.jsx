import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
function App() {
  return (
    <>
    <Home/>
    {/* <Routes>
      <Route path="/" element={<UploadDocuments/>} />
      <Route path="/configure" element={<ConfigureSettings/>} />
      <Route path="/review" element={<ReviewDownload/>} />
    </Routes> */}
    </>
  )
}

export default App

