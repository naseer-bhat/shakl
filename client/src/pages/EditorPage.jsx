import { useContext } from "react";
import { ImageEditorContext } from "../context/ImageEditorContext";
import ImageCropper from "../components/ImageCropper";
import ResizeControls from "../components/ResizeControls";
import CopiesManager from "../components/CopiesManager";
// import PreviewPanel from "../components/PreviewPanel";
import { handlePrint } from "../utils/printHelper";
import CompressionControls from "../components/CompressionControls";
import FilterControls from "../components/FilterControls";

function EditorPage() {
  const {
    imageSrc,
    croppedImage,
    resizedImage,
    previewResizedImage,
    widthCm,
    heightCm,
    numCopies,
    copiesArray,
    setCroppedImage,
    setResizedImage,
    setPreviewResizedImage,
    setWidthCm,
    setHeightCm,
    setNumCopies,
    setCopiesArray,
    canvasRef,
    imageRef,
    PPI,
  } = useContext(ImageEditorContext);

  if (!imageSrc) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>⚠ No image uploaded. Please go back to Upload page.</p>;
  }

  return (
    <div className="editor-page">
      <div className="main-section">
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

        <div className="right-section">
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

          {/* <PreviewPanel previewResizedImage={previewResizedImage} /> */}

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
          {(resizedImage || croppedImage || imageSrc) && (
            <CompressionControls
              image={resizedImage || croppedImage || imageSrc}
              onCompressed={(newImg) => setResizedImage(newImg)}
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

          
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
