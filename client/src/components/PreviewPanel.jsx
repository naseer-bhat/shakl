function PreviewPanel({ previewResizedImage }) {
  if (!previewResizedImage) return null;

  return (
    <div className="preview">
      <h4>Preview Resized Image</h4>
      <img src={previewResizedImage} alt="preview resized" />
    </div>
  );
}

export default PreviewPanel;
