function FileUpload({ setImageSrc, setWidthCm, setHeightCm, setCroppedImage, setResizedImage, setPreviewResizedImage, setCopiesArray, PPI }) {
 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Check if file is an image
  if (!file.type.startsWith("image/")) {
    alert("Please upload a valid image file (jpg, png, etc.)");
    e.target.value = ""; // reset the input
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    setImageSrc(reader.result);
    // Reset dependent states
    setCroppedImage(null);
    setResizedImage(null);
    setPreviewResizedImage(null);
    setWidthCm(0);
    setHeightCm(0);
    setCopiesArray([]);
  };
  reader.readAsDataURL(file);
};

  return <input type="file" className="file-input" onChange={handleFileChange} />;
}

export default FileUpload;
