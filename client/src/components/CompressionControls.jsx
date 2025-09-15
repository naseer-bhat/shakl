// components/CompressionControls.js
import { useState, useEffect } from "react";
import { getImageSizeKB, compressToTargetSize } from "../utils/imageUtils";

export default function CompressionControls({ image, onCompressed }) {
  const [currentSize, setCurrentSize] = useState(0);
  const [targetSizeKB, setTargetSizeKB] = useState(0);
  const [compressedPreview, setCompressedPreview] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);

  useEffect(() => {
    if (image) {
      setCurrentSize(getImageSizeKB(image));
      setTargetSizeKB(getImageSizeKB(image)); // default = same as current
    }
  }, [image]);

  const handleCompress = () => {
    if (!image || !targetSizeKB) return;
    compressToTargetSize(image, targetSizeKB, (compressedImg, sizeKB) => {
      setCompressedPreview(compressedImg);
      setCompressedSize(sizeKB);
      onCompressed(compressedImg); // update parent (App.js)
    });
  };

  return (
    <div className="compression-section">
      <h3>📦 Compress Image</h3>
      <p>Current Size: {currentSize} KB</p>
      <label>
        Target Size (KB):
        <input
          type="number"
          min="1"
          value={targetSizeKB}
          onChange={(e) => setTargetSizeKB(Number(e.target.value))}
        />
      </label>
      <button className="btn" onClick={handleCompress}>Compress</button>

      {compressedPreview && (
        <div className="preview">
          <h4>Compressed Preview ({compressedSize} KB)</h4>
          <img src={compressedPreview} alt="compressed" />
        </div>
      )}
    </div>
  );
}
