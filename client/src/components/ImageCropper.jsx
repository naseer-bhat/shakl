import { useState, useRef } from "react";

function ImageCropper({ imageSrc, setCroppedImage, setResizedImage, setPreviewResizedImage, setWidthCm, setHeightCm, canvasRef, imageRef, PPI }) {
  const [cropRect, setCropRect] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const startRef = useRef({ x: 0, y: 0 });

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

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.strokeStyle = "#ff4d4d";
    ctx.lineWidth = 2;
    ctx.strokeRect(newRect.x, newRect.y, newRect.width, newRect.height);
  };

  const endDrag = () => setIsDragging(false);

  const cropImage = () => {
    if (!imageRef.current || !cropRect) return;
    const img = imageRef.current;
    const displayWidth = img.width;
    const displayHeight = img.height;
    const scaleX = img.naturalWidth / displayWidth;
    const scaleY = img.naturalHeight / displayHeight;

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

  return (
    <div className="image-wrapper">
      <div className="fixed-image-container">
        <img
          src={imageSrc}
          alt="original"
          ref={imageRef}
          onLoad={() => {
            if (canvasRef.current && imageRef.current) {
              canvasRef.current.width = imageRef.current.naturalWidth;
              canvasRef.current.height = imageRef.current.naturalHeight;
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
      <button className="btn" onClick={cropImage}>Crop Image</button>
    </div>
  );
}

export default ImageCropper;
