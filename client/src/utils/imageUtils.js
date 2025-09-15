// utils/imageUtils.js
export function getImageSizeKB(base64) {
  let stringLength = base64.length - 'data:image/png;base64,'.length;
  let sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
  return Math.round(sizeInBytes / 1024); // KB
}

export function compressToTargetSize(imgBase64, targetKB, callback) {
  let quality = 0.9;

  function tryCompress() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imgBase64;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let compressedBase64 = canvas.toDataURL("image/jpeg", quality);
      let sizeKB = getImageSizeKB(compressedBase64);

      if (sizeKB > targetKB && quality > 0.1) {
        quality -= 0.05;
        tryCompress();
      } else {
        callback(compressedBase64, sizeKB);
      }
    };
  }

  tryCompress();
}
