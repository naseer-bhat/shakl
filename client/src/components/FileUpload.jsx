import { useState } from "react";

function FileUpload({
  setImageSrc,
  setWidthCm,
  setHeightCm,
  setCroppedImage,
  setResizedImage,
  setPreviewResizedImage,
  setCopiesArray,
  PPI,
}) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (jpg, png, etc.)");
      e.target.value = ""; // reset the input
      return;
    }

    setFileName(file.name);

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

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-4">
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-center w-full"
        >
          <div>
            <img
              src="/images/upload-image-svgrepo-com.svg"
              alt="Upload Icon"
              className="w-full h-96"
            />
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              jpeg, png, svg, webp or bmp
            </p>
          </div>
        </label>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <span className="text-lg">
        {fileName ? fileName : ""}
      </span>
    </>
  );
}

export default FileUpload;
