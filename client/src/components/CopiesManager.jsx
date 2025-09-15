function CopiesManager({ numCopies, setNumCopies, resizedImage, croppedImage, imageSrc, copiesArray, setCopiesArray, widthCm, heightCm, PPI, handlePrint }) {
  const generateCopies = () => {
    const baseImage = resizedImage || croppedImage || imageSrc;
    setCopiesArray(Array(numCopies).fill(baseImage));
  };

  return (
    <div className="copies-section">
  <h3>Number of Copies</h3>
  <input
    type="number"
    value={numCopies}
    onChange={(e) => {
      // Allow empty temporarily while typing
      const val = e.target.value === "" ? "" : Math.max(1, Number(e.target.value));
      setNumCopies(val);
    }}
    onBlur={(e) => {
      // Reset back to 1 if empty or invalid when focus leaves
      if (e.target.value === "" || Number(e.target.value) < 1) {
        setNumCopies(1);
      }
    }}
  />

  <button className="btn" onClick={generateCopies}>
    Generate Copies
  </button>

  {copiesArray.length > 0 && (
    <div className="copies-preview">
      {copiesArray.map((img, idx) => (
        <img key={idx} src={img} alt={`copy-${idx}`} />
      ))}
    </div>
  )}

  {copiesArray.length > 0 && (
    <button
      className="btn print-btn"
      onClick={() => handlePrint(copiesArray, widthCm, heightCm, PPI)}
    >
      Print
    </button>
  )}
</div>

  );
}

export default CopiesManager;
