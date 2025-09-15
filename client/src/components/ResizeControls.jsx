const PRESET_SIZES = [
  { label: "Passport Photo (3.5 × 4.5 cm)", width: 3.5, height: 4.5 },
  { label: "Visa / Travel (3.5 × 4.5 cm)", width: 3.5, height: 4.5 },
  { label: "PAN Card (3.5 × 2.5 cm)", width: 3.5, height: 2.5 },
  { label: "Aadhaar Card (3 × 3 cm)", width: 3, height: 3 },
  { label: "Driving License (3 × 3 cm)", width: 3, height: 3 },
  { label: "School / College ID (3 × 3 cm)", width: 3, height: 3 },
  { label: "School / College ID (3 × 4 cm)", width: 3, height: 4 },
  { label: "Job Application (3.5 × 4.5 cm)", width: 3.5, height: 4.5 },
];

function ResizeControls({
  widthCm,
  heightCm,
  setWidthCm,
  setHeightCm,
  croppedImage,
  imageSrc,
  setCroppedImage,
  setResizedImage,
  setPreviewResizedImage,
  previewResizedImage,
  PPI,
}) {
  const getOriginalSize = () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = croppedImage || imageSrc;
      img.onload = () => {
        const widthCm = (img.naturalWidth / PPI) * 2.54;
        const heightCm = (img.naturalHeight / PPI) * 2.54;
        resolve({ width: widthCm.toFixed(2), height: heightCm.toFixed(2) });
      };
    });
  };

  const resizeImage = (
    apply = false,
    customWidth = widthCm,
    customHeight = heightCm
  ) => {
    if (!croppedImage && !imageSrc) return;
    const img = new Image();
    img.src = croppedImage || imageSrc;
    img.onload = () => {
      const widthPx = (customWidth / 2.54) * PPI;
      const heightPx = (customHeight / 2.54) * PPI;

      const canvas = document.createElement("canvas");
      canvas.width = widthPx;
      canvas.height = heightPx;

      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, widthPx, heightPx);

      const base64 = canvas.toDataURL("image/png");

      if (apply) {
        setCroppedImage(base64);
        setResizedImage(base64);
        setPreviewResizedImage(base64);
      } else {
        setPreviewResizedImage(base64);
      }
    };
  };

  return (
    <div className="resize-section">
      <h3>Resize Image (cm)</h3>

      <label>
        Width:
        <input
          type="number"
          min="0"
          value={widthCm}
          step="0.1"
          onChange={(e) => setWidthCm(Math.max(0, Number(e.target.value)))}
        />
      </label>
      <label>
        Height:
        <input
          type="number"
          min="0"
          value={heightCm}
          step="0.1"
          onChange={(e) => setHeightCm(Math.max(0, Number(e.target.value)))}
        />
      </label>

      <div className="btn-group">
        <button className="btn" onClick={() => resizeImage(false)}>
          Preview Resize
        </button>
        <button className="btn" onClick={() => resizeImage(true)}>
          Apply Resize
        </button>
      </div>

      <div className="preset-sizes">
        <h4>📏 Quick Presets</h4>

        {/* Original Size option */}
        {imageSrc && (
          <button
            className="btn preset-btn"
            onClick={async () => {
              const original = await getOriginalSize();
              setWidthCm(Number(original.width));
              setHeightCm(Number(original.height));
              resizeImage(true, original.width, original.height);
            }}
          >
            🖼 Original Size
          </button>
        )}

        {/* Other presets */}
        {PRESET_SIZES.map((preset, idx) => (
          <button
            key={idx}
            className="btn preset-btn"
            onClick={() => {
              setWidthCm(preset.width);
              setHeightCm(preset.height);
              resizeImage(true, preset.width, preset.height);
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ResizeControls;
