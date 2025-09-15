import { createContext, useState, useRef } from "react";

export const ImageEditorContext = createContext();

const PPI = 96;

export function ImageEditorProvider({ children }) {
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
    <ImageEditorContext.Provider
      value={{
        imageSrc,
        setImageSrc,
        croppedImage,
        setCroppedImage,
        resizedImage,
        setResizedImage,
        previewResizedImage,
        setPreviewResizedImage,
        widthCm,
        setWidthCm,
        heightCm,
        setHeightCm,
        numCopies,
        setNumCopies,
        copiesArray,
        setCopiesArray,
        canvasRef,
        imageRef,
        PPI,
      }}
    >
      {children}
    </ImageEditorContext.Provider>
  );
}
