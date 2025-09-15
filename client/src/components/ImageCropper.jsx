import { useState, useRef, useEffect } from "react";

function ImageCropper({
  imageSrc,
  setCroppedImage,
  setResizedImage,
  setPreviewResizedImage,
  setWidthCm,
  setHeightCm,
  canvasRef,
  imageRef,
  PPI,
}) {
  const [cropRect, setCropRect] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const startRef = useRef({ x: 0, y: 0 });

  // 📌 Draw crop rectangle with spotlight effect
  const drawCropRect = (rect) => {
    if (!canvasRef.current || !imageRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const canvas = canvasRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dim entire canvas
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clear crop area (spotlight)
    ctx.clearRect(rect.x, rect.y, rect.width, rect.height);

    // Draw border
    ctx.strokeStyle = "#ff4d4d";
    ctx.lineWidth = 2;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  };

  // 📌 Default passport crop (3.5 × 4.5 cm)
  useEffect(() => {
    if (imageRef.current && canvasRef.current) {
      const img = imageRef.current;

      const displayWidth = img.clientWidth;
      const displayHeight = img.clientHeight;

      const widthPx = (3.5 / 2.54) * PPI * (displayWidth / img.naturalWidth);
      const heightPx = (4.5 / 2.54) * PPI * (displayHeight / img.naturalHeight);

      // Center crop box
      const defaultX = (displayWidth - widthPx) / 2;
      const defaultY = (displayHeight - heightPx) / 2;

      const defaultRect = {
        x: defaultX,
        y: defaultY,
        width: widthPx,
        height: heightPx,
      };

      setCropRect(defaultRect);
      drawCropRect(defaultRect);
    }
  }, [imageSrc, PPI]);

  // 📌 Mouse events
  const startDrag = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * canvasRef.current.width) / rect.width;
    const y = ((e.clientY - rect.top) * canvasRef.current.height) / rect.height;
    startRef.current = { x, y };
    setCropRect({ x, y, width: 0, height: 0 });
    setIsDragging(true);
  };

  const duringDrag = (e) => {
    if (!isDragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * canvasRef.current.width) / rect.width;
    const y = ((e.clientY - rect.top) * canvasRef.current.height) / rect.height;

    const newRect = {
      x: Math.min(startRef.current.x, x),
      y: Math.min(startRef.current.y, y),
      width: Math.abs(x - startRef.current.x),
      height: Math.abs(y - startRef.current.y),
    };
    setCropRect(newRect);
    drawCropRect(newRect);
  };

  const endDrag = () => setIsDragging(false);

  // 📌 Crop function
  const cropImage = () => {
    if (!imageRef.current || !cropRect) return;
    const img = imageRef.current;

    // Scale factors
    const scaleX = img.naturalWidth / img.clientWidth;
    const scaleY = img.naturalHeight / img.clientHeight;

    const canvas = document.createElement("canvas");
    const widthPx = cropRect.width * scaleX;
    const heightPx = cropRect.height * scaleY;
    canvas.width = widthPx;
    canvas.height = heightPx;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      img,
      cropRect.x * scaleX,
      cropRect.y * scaleY,
      widthPx,
      heightPx,
      0,
      0,
      widthPx,
      heightPx
    );

    const base64 = canvas.toDataURL("image/png");
    setCroppedImage(base64);
    setResizedImage(base64);
    setPreviewResizedImage(null);

    setWidthCm((widthPx / PPI) * 2.54);
    setHeightCm((heightPx / PPI) * 2.54);
  };

  // 📌 Clear crop
  const clearCrop = () => {
    setCropRect(null);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setCroppedImage(null);
    setResizedImage(null);
    setPreviewResizedImage(null);
  };

  return (
    <div className="image-wrapper">
      <div className="fixed-image-container">
        <img
  src={imageSrc}
  alt="original"
  ref={imageRef}
  onLoad={() => {
    if (canvasRef.current && imageRef.current) {
      const container = canvasRef.current.parentElement;

      // Match canvas to container size
      canvasRef.current.width = container.clientWidth;
      canvasRef.current.height = container.clientHeight;
    }
  }}
/>


        <canvas
          ref={canvasRef}
          className="crop-canvas"
          onMouseDown={startDrag}
          onMouseMove={duringDrag}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
        />
      </div>

      <div className="btn-group">
        <button className="btn" onClick={cropImage}>
          Crop Image
        </button>
        <button className="btn" onClick={clearCrop}>
          Clear Crop
        </button>
      </div>
    </div>
  );
}

export default ImageCropper;
