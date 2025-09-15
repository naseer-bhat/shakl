import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import EditorPage from "./pages/EditorPage";
import { ImageEditorProvider } from "./context/ImageEditorContext";
import "./App.css";

function App() {
  return (
    <ImageEditorProvider>
      <Router>
        <Routes>
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="*" element={<Navigate to="/upload" />} />
        </Routes>
      </Router>
    </ImageEditorProvider>
  );
}

export default App;
