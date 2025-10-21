// src/utils/cropImage.js

// export default function getCroppedImg(imageSrc, crop) {
//   return new Promise((resolve, reject) => {
//     const image = new Image();
//     image.src = imageSrc;
//     image.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = crop.width;
//       canvas.height = crop.height;
//       const ctx = canvas.getContext("2d");

//       ctx.drawImage(
//         image,
//         crop.x,
//         crop.y,
//         crop.width,
//         crop.height,
//         0,
//         0,
//         crop.width,
//         crop.height
//       );

//       canvas.toBlob((blob) => {
//         if (!blob) {
//           reject(new Error("Canvas is empty"));
//           return;
//         }
//         const url = URL.createObjectURL(blob);
//         resolve(url);
//       }, "image/jpeg");
//     };
//     image.onerror = (e) => reject(e);
//   });
// }

export default function getCroppedImg(imageSrc, crop) {
  console.warn("🧪 getCroppedImg is currently disabled for testing.");
  return Promise.resolve(imageSrc); // fallback to original image
}
