// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const { exec } = require('child_process');
// const app = express();
// const cors = require('cors');
// const port = 8050;

// // Multer configuration for handling file uploads
// const storage = multer.memoryStorage();
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 50 * 1024 * 1024 }, // Adjust the fileSize limit as needed
// });

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(cors());

// // Define the path to the ffmpeg executable
// const ffmpegPath = '/path/to/your/ffmpeg'; // Update this with the actual path to your ffmpeg executable

// app.post("/concatenate", upload.single('image'), async (req, res) => {
//     try {
//         // Access the uploaded image and name from req.file and req.body
//         const image = req.file;
//         const name = req.body.name;

//         console.log("Received image name:", name);
//         console.log(image);

//         // Remove the "data:image/jpeg;base64," prefix
//         const imageData = req.body.image.split(',')[1];
//         const imageBuffer = Buffer.from(imageData, 'base64');

//         // Replace the static image with the uploaded photo
//         const imageOverlayPath = `./uploads/${Date.now()}_${image}.jpg`;
//         fs.writeFileSync(imageOverlayPath, imageBuffer);

//         // Now you have the image saved, and you can use it in your ffmpeg command
//         const inputVideoPath = './data/tamp.mp4';
//         const outputVideoPath = `./uploads/outputVideo_${Date.now()}.mp4`;

//         // Your ffmpeg command with the updated image path and output path
//         const ffmpegCommand = `"${ffmpegPath}" -i "${inputVideoPath}" -i "${imageOverlayPath}" -filter_complex "overlay=10:10" "${outputVideoPath}"`;

//         exec(ffmpegCommand, (error, stdout, stderr) => {
//             if (error) {
//                 console.error(`Error: ${error.message}`);
//                 return res.status(500).json({ error: 'Error processing video with overlay' });
//             }

//             console.log('Video successfully created with overlay:', outputVideoPath);

//             // Send a response to the frontend indicating success
//             res.status(200).json({ success: true, videoPath: outputVideoPath });
//         });
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });
