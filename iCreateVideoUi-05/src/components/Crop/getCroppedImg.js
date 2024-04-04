// getCroppedImg.js

/**
 * Get the cropped image from the original image based on the provided cropped area.
 * @param {string} originalImage - Base64 representation of the original image.
 * @param {object} croppedAreaPixels - Object containing the cropped area information.
 * @returns {Promise} Resolves to the cropped image as a Blob.
 */
function getCroppedImg(originalImage, croppedAreaPixels) {
    const img = new Image();
    img.src = originalImage;
  
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const { width, height } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;
  
    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      width,
      height,
      0,
      0,
      width,
      height
    );
  
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(blob);
      }, "image/png");
    });
  }
  
  export default getCroppedImg;
  