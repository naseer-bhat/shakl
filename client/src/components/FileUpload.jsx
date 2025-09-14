function FileUpload({ setImageSrc, setWidthCm, setHeightCm, setCroppedImage, setResizedImage, setPreviewResizedImage, setCopiesArray, PPI }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setWidthCm((img.naturalWidth / PPI) * 2.54);
        setHeightCm((img.naturalHeight / PPI) * 2.54);
        setCroppedImage(null);
        setResizedImage(null);
        setPreviewResizedImage(null);
        setCopiesArray([]);
      };
    };
    reader.readAsDataURL(file);
  };

  return <input type="file" className="file-input" onChange={handleFileChange} />;
}

export default FileUpload;
