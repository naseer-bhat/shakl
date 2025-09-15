import { useState, useRef } from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import ImageCropper from "./components/ImageCropper";
import ResizeControls from "./components/ResizeControls";
import CopiesManager from "./components/CopiesManager";
import PreviewPanel from "./components/PreviewPanel";
import { handlePrint } from "./utils/printHelper";
import CompressionControls from "./components/CompressionControls";
import FilterControls from "./components/FilterControls";

const PPI = 96;

function App() {
  const PAPER_SIZES = {
    A4: { width: 21, height: 29.7 },
    Letter: { width: 21.59, height: 27.94 },
  };

  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [previewResizedImage, setPreviewResizedImage] = useState(null);
  const [widthCm, setWidthCm] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  const [numCopies, setNumCopies] = useState(1);
  const [copiesArray, setCopiesArray] = useState([]);

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  return (
    <div className="container">
      <h1>🖼️ Image Crop & Print Tool</h1>

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

      <div className="main-section">
        {imageSrc && (
          <ImageCropper
            imageSrc={imageSrc}
            setCroppedImage={setCroppedImage}
            setResizedImage={setResizedImage}
            setPreviewResizedImage={setPreviewResizedImage}
            setWidthCm={setWidthCm}
            setHeightCm={setHeightCm}
            canvasRef={canvasRef}
            imageRef={imageRef}
            PPI={PPI}
          />
        )}

        <div className="right-section">
          {(croppedImage || imageSrc) && (
            <ResizeControls
              widthCm={widthCm}
              heightCm={heightCm}
              setWidthCm={setWidthCm}
              setHeightCm={setHeightCm}
              croppedImage={croppedImage}
              imageSrc={imageSrc}
              setCroppedImage={setCroppedImage}
              setResizedImage={setResizedImage}
              setPreviewResizedImage={setPreviewResizedImage}
              previewResizedImage={previewResizedImage}
              PPI={PPI}
            />
          )}

          <PreviewPanel previewResizedImage={previewResizedImage} />
          {(croppedImage || resizedImage) && (
            <FilterControls
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
              setResizedImage={setResizedImage}
              setPreviewResizedImage={setPreviewResizedImage}
              PPI={PPI}
              widthCm={widthCm}
              heightCm={heightCm}
            />
          )}

          {(resizedImage || croppedImage) && (
            <CopiesManager
              numCopies={numCopies}
              setNumCopies={setNumCopies}
              resizedImage={resizedImage}
              croppedImage={croppedImage}
              imageSrc={imageSrc}
              copiesArray={copiesArray}
              setCopiesArray={setCopiesArray}
              widthCm={widthCm}
              heightCm={heightCm}
              PPI={PPI}
              handlePrint={handlePrint}
            />
          )}
          {(resizedImage || croppedImage || imageSrc) && (
            <CompressionControls
              image={resizedImage || croppedImage || imageSrc}
              onCompressed={(newImg) => setResizedImage(newImg)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
