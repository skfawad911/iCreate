// import React, { useRef, useState, useEffect } from 'react';
// import videoSource from "../data/tamp1.mp4";
// import axios from 'axios';

// const VideoWatermark = () => {
//     const videoRef = useRef(null);
//     const [showWatermark, setShowWatermark] = useState(false);
//     const [watermarkImage, setWatermarkImage] = useState(null);
//     const [userText, setUserText] = useState("");
//     const [fetchVideo, setFetchVideo] = useState("");

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setWatermarkImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleTextChange = (e) => {
//         setUserText(e.target.value);
//     };

//     const addWatermark = () => {
//         setShowWatermark(true);
//     };

//     const downloadWithWatermark = async () => {
//         const video = videoRef.current;
//         const canvas = document.createElement('canvas');
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         const ctx = canvas.getContext('2d');

//         const stream = canvas.captureStream();
//         const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
//         const chunks = [];

//         recorder.ondataavailable = (event) => {
//             if (event.data.size > 0) {
//                 chunks.push(event.data);
//             }
//         };

//         recorder.onstop = () => {
//             const blob = new Blob(chunks, { type: 'video/webm' });

//             const downloadLink = document.createElement('a');
//             downloadLink.href = URL.createObjectURL(blob);
//             downloadLink.download = 'video_with_watermark.mkv';
//             downloadLink.click();
//         };

//         recorder.start();

//         video.play();

//         const drawFrame = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//             if (showWatermark && watermarkImage) {
//                 const watermark = new Image();
//                 watermark.src = watermarkImage;

//                 const watermarkWidth = 150;
//                 const watermarkHeight = watermarkWidth;

//                 const elapsedTime = video.currentTime;

//                 // Calculate the position based on the elapsed time
//                 let watermarkPosition;

//                 // Calculate the watermark size based on its position
//                 let currentSize = watermarkWidth; // Initial size

//                 if (elapsedTime > 10 && elapsedTime <= 20) {
//                     const progress = (elapsedTime - 10) / 10;
//                     currentSize = watermarkWidth - progress * (watermarkWidth - 50); // Decrease size
//                 } else if (elapsedTime > 30 && elapsedTime <= 40) {
//                     const progress = (elapsedTime - 30) / 10;
//                     currentSize = 50 + progress * (watermarkWidth - 50); // Increase size
//                 }

//                 // Set the watermark position based on the elapsed time
//                 if (elapsedTime <= 10) {
//                     watermarkPosition = { x: 10, y: canvas.height - 10 - watermarkHeight };
//                 } else if (elapsedTime <= 20) {
//                     const progress = (elapsedTime - 10) / 10;
//                     watermarkPosition = { x: canvas.width - 10 - currentSize, y: canvas.height - 10 - watermarkHeight - progress * (canvas.height - watermarkHeight - 20) };
//                 } else if (elapsedTime <= 30) {
//                     const progress = (elapsedTime - 20) / 10;
//                     watermarkPosition = { x: canvas.width - 10 - currentSize - progress * (canvas.width - currentSize - 20), y: 10 };
//                 } else if (elapsedTime <= 40) {
//                     const progress = (elapsedTime - 30) / 10;
//                     watermarkPosition = { x: 10 + progress * (canvas.width - currentSize - 20), y: 10 };
//                 } else {
//                     const progress = (elapsedTime - 40) / (video.duration - 40);
//                     watermarkPosition = {
//                         x: (canvas.width - currentSize) / 2,
//                         y: (canvas.height - watermarkHeight) / 2,
//                     };
//                 }

//                 // Create a circular clipping path
//                 ctx.save();
//                 ctx.beginPath();
//                 ctx.arc(watermarkPosition.x + currentSize / 2, watermarkPosition.y + watermarkHeight / 2, currentSize / 2, 0, 2 * Math.PI);
//                 ctx.closePath();
//                 ctx.clip();

//                 // Draw the circular watermark
//                 ctx.drawImage(watermark, watermarkPosition.x, watermarkPosition.y, currentSize, watermarkHeight);

//                 // Restore the context to remove the clipping path
//                 ctx.restore();
//             }

//             if (!video.ended) {
//                 requestAnimationFrame(drawFrame);
//             }
//         };

//         drawFrame();

//         setTimeout(() => {
//             recorder.stop();
//             video.pause();
//         }, video.duration * 1000);
//     };

//     useEffect(() => {
//         axios.get("/api/auth/pullVideo")
//             .then(res => {
//                 console.log(res.data);
//                 setFetchVideo(res.data);
//             })
//             .catch(err => console.log(err))
//     }, []);

//     return (
//         <div style={{ position: 'relative' }}>
//             <video ref={videoRef} controls width="500">
//                 <source src={videoSource} type="video/mp4" />
//                 Your browser does not support the video tag.
//             </video>
//             {showWatermark && watermarkImage && (
//                 <div style={{ position: 'absolute', bottom: '10px', left: '10px', borderRadius: '50%', overflow: 'hidden' }}>
//                     <img src={watermarkImage} alt="Watermark" style={{ maxWidth: '100px', borderRadius: '50%' }} />
//                 </div>
//             )}
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             <input type="text" placeholder="Enter text" value={userText} onChange={handleTextChange} style={{ margin: '10px' }} />
//             <button onClick={addWatermark}>Add Watermark</button>
//             <button onClick={downloadWithWatermark}>Download with Watermark</button>
//         </div>
//     );
// };

// export default VideoWatermark;



// import React, { useRef, useState, useEffect } from 'react';
// import videoSource from "../data/tamp1.mp4";
// import axios from 'axios';

// const VideoWatermark = () => {
//     const videoRef = useRef(null);
//     const [showWatermark, setShowWatermark] = useState(false);
//     const [watermarkImage, setWatermarkImage] = useState(null);
//     const [userText, setUserText] = useState("");
//     const [fetchVideo, setFetchVideo] = useState("");

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setWatermarkImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleTextChange = (e) => {
//         setUserText(e.target.value);
//     };

//     const addWatermark = () => {
//         setShowWatermark(true);
//     };

//     const downloadWithWatermark = async () => {
//         const video = videoRef.current;
//         const canvas = document.createElement('canvas');
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         const ctx = canvas.getContext('2d');

//         const stream = canvas.captureStream();
//         const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
//         const chunks = [];

//         recorder.ondataavailable = (event) => {
//             if (event.data.size > 0) {
//                 chunks.push(event.data);
//             }
//         };

//         recorder.onstop = () => {
//             const blob = new Blob(chunks, { type: 'video/webm' });

//             const downloadLink = document.createElement('a');
//             downloadLink.href = URL.createObjectURL(blob);
//             downloadLink.download = 'video_with_watermark.mkv';
//             downloadLink.click();
//         };

//         recorder.start();

//         video.play();

//         const drawFrame = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//             if (showWatermark && watermarkImage) {
//                 const watermark = new Image();
//                 watermark.src = watermarkImage;

//                 const watermarkWidth = 150;
//                 const watermarkHeight = watermarkWidth;

//                 const elapsedTime = video.currentTime;

//                 // Calculate the position based on the elapsed time
//                 let watermarkPosition;

//                 // Calculate the watermark size based on its position
//                 let currentSize = watermarkWidth; // Initial size

//                 if (elapsedTime >= 10 && elapsedTime <= 20) {
//                     const progress = (elapsedTime - 10) / 10;
//                     currentSize = watermarkWidth - progress * (watermarkWidth - 50); // Decrease size
//                 } else if (elapsedTime > 20 && elapsedTime <= 30) {
//                     const progress = (elapsedTime - 20) / 10;
//                     currentSize = 50 + progress * (watermarkWidth - 50); // Increase size
//                 } else if (elapsedTime > 30 && elapsedTime <= 40) {
//                     const progress = (elapsedTime - 30) / 10;
//                     currentSize = watermarkWidth - progress * (watermarkWidth - 50); // Decrease size
//                 } else if (elapsedTime > 40 && elapsedTime <= 50) {
//                     const progress = (elapsedTime - 40) / 10;
//                     currentSize = 50 + progress * (watermarkWidth - 50); // Increase size
//                 }

//                 // Set the watermark position based on the elapsed time
//                 if (elapsedTime <= 10) {
//                     watermarkPosition = { x: 10, y: canvas.height - 10 - watermarkHeight };
//                 } else if (elapsedTime <= 20) {
//                     const progress = (elapsedTime - 10) / 10;
//                     watermarkPosition = { x: canvas.width - 10 - currentSize, y: canvas.height - 10 - watermarkHeight - progress * (canvas.height - watermarkHeight - 20) };
//                 } else if (elapsedTime <= 30) {
//                     const progress = (elapsedTime - 20) / 10;
//                     watermarkPosition = { x: canvas.width - 10 - currentSize - progress * (canvas.width - currentSize - 20), y: 10 };
//                 } else if (elapsedTime <= 40) {
//                     const progress = (elapsedTime - 30) / 10;
//                     watermarkPosition = { x: 10 + progress * (canvas.width - currentSize - 20), y: 10 };
//                 } else {
//                     const progress = (elapsedTime - 40) / (video.duration - 40);
//                     watermarkPosition = {
//                         x: (canvas.width - currentSize) / 2,
//                         y: (canvas.height - watermarkHeight) / 2,
//                     };
//                 }

//                 // Create a circular clipping path
//                 ctx.save();
//                 ctx.beginPath();
//                 ctx.arc(watermarkPosition.x + currentSize / 2, watermarkPosition.y + watermarkHeight / 2, currentSize / 2, 0, 2 * Math.PI);
//                 ctx.closePath();
//                 ctx.clip();

//                 // Draw the circular watermark
//                 ctx.drawImage(watermark, watermarkPosition.x, watermarkPosition.y, currentSize, watermarkHeight);

//                 // Restore the context to remove the clipping path
//                 ctx.restore();
//             }

//             if (!video.ended) {
//                 requestAnimationFrame(drawFrame);
//             }
//         };

//         drawFrame();

//         setTimeout(() => {
//             recorder.stop();
//             video.pause();
//         }, video.duration * 1000);
//     };

//     useEffect(() => {
//         axios.get("/api/auth/pullVideo")
//             .then(res => {
//                 console.log(res.data);
//                 setFetchVideo(res.data);
//             })
//             .catch(err => console.log(err))
//     }, []);

//     return (
//         <div style={{ position: 'relative' }}>
//             <video ref={videoRef} controls width="500">
//                 <source src={videoSource} type="video/mp4" />
//                 Your browser does not support the video tag.
//             </video>
//             {showWatermark && watermarkImage && (
//                 <div style={{ position: 'absolute', bottom: '10px', left: '10px', borderRadius: '50%', overflow: 'hidden' }}>
//                     <img src={watermarkImage} alt="Watermark" style={{ maxWidth: '100px', borderRadius: '50%' }} />
//                 </div>
//             )}
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             <input type="text" placeholder="Enter text" value={userText} onChange={handleTextChange} style={{ margin: '10px' }} />
//             <button onClick={addWatermark}>Add Watermark</button>
//             <button onClick={downloadWithWatermark}>Download with Watermark</button>
//         </div>
//     );
// };

// export default VideoWatermark;
