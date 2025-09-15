import { useContext } from "react";
import { ImageEditorContext } from "../context/ImageEditorContext";
import FileUpload from "../components/FileUpload";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const {
    setImageSrc,
    setWidthCm,
    setHeightCm,
    setCroppedImage,
    setResizedImage,
    setPreviewResizedImage,
    setCopiesArray,
    PPI,
  } = useContext(ImageEditorContext);

  const navigate = useNavigate();

  return (
    <div className="upload-page">
      <FileUpload
        setImageSrc={setImageSrc}
        setWidthCm={setWidthCm}
        setHeightCm={setHeightCm}
        setCroppedImage={setCroppedImage}
        setResizedImage={setResizedImage}
        setPreviewResizedImage={setPreviewResizedImage}
        setCopiesArray={setCopiesArray}
        PPI={PPI}
      />
      <button onClick={() => navigate("/editor")}>Go to Editor</button>
    </div>
  );
}

export default UploadPage;
