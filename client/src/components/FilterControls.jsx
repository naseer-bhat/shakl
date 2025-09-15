import { useState, useEffect } from "react";

function FilterControls({ croppedImage, setCroppedImage, setResizedImage, setPreviewResizedImage, PPI, widthCm, heightCm }) {
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    grayscale: 0,
    blur: 0
  });

  // Build CSS filter string
  const filterString = `
    brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
    saturate(${filters.saturation}%)
    grayscale(${filters.grayscale}%)
    blur(${filters.blur}px)
  `;

  // Update filter value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Apply filters permanently to the image
  const applyFilters = () => {
    if (!croppedImage) return;

    const img = new Image();
    img.src = croppedImage;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const widthPx = (widthCm / 2.54) * PPI;
      const heightPx = (heightCm / 2.54) * PPI;
      canvas.width = widthPx;
      canvas.height = heightPx;

      const ctx = canvas.getContext("2d");
      ctx.filter = filterString;
      ctx.drawImage(img, 0, 0, widthPx, heightPx);

      const base64 = canvas.toDataURL("image/png");
      setCroppedImage(base64);
      setResizedImage(base64);
      setPreviewResizedImage(null);
    };
  };

  return (
    <div className="compression-section">
      <h3>Filters & Effects</h3>
      {Object.keys(filters).map(key => (
        <label key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}: 
          <input
            type="range"
            min={key === "blur" ? 0 : 0}
            max={key === "blur" ? 10 : 200}
            value={filters[key]}
            name={key}
            onChange={handleChange}
          />
          {filters[key]}
        </label>
      ))}

      <div className="btn-group">
        <button className="btn" onClick={applyFilters}>Apply Filters</button>
      </div>

      {croppedImage && (
        <div className="preview">
          <h4>Preview</h4>
          <img src={croppedImage} alt="filtered preview" style={{ filter: filterString }} />
        </div>
      )}
    </div>
  );
}

export default FilterControls;
