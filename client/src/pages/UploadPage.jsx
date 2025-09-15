import { useContext } from "react";
import { ImageEditorContext } from "../context/ImageEditorContext";
import FileUpload from "../components/FileUpload";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const {
    imageSrc, // <-- add this
    setImageSrc,
    setWidthCm,
    setHeightCm,
    setCroppedImage,
    setResizedImage,
    setPreviewResizedImage,
    setCopiesArray,
    PPI,
  } = useContext(ImageEditorContext);

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      <div className="h-full gap-6 w-full bg-gradient-to-b from-[#00c6ff] to-[#0072ff] flex flex-col justify-center items-start text-white p-8">
        <div className="text-7xl font-thin uppercase tracking-wide">Shakl</div>
        <div className="text-6xl leading-[70px] w-fit font-extrabold tracking-wide">
          crop, resize, compress your images with ease!
        </div>
        <div className="text-lg">Upload your image to get started.</div>
      </div>
      <div className="p-6 h-full w-full flex flex-col justify-center items-start">
        <FileUpload
          setImageSrc={setImageSrc}
          setWidthCm={setWidthCm}
          setHeightCm={setHeightCm}
          setCroppedImage={setCroppedImage}
          setResizedImage={setResizedImage}
          setPreviewResizedImage={setPreviewResizedImage}
          setCopiesArray={setCopiesArray}
          PPI={PPI}
        />
        <button
          onClick={() => navigate("/editor")}
          className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded ${
            imageSrc ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!imageSrc}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadPage;
