// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const videoModel = require('../models/videoModel');


// //Multer configure....
// const videosDirectory = './videos';

// if (!fs.existsSync(videosDirectory)) {
//     fs.mkdirSync(videosDirectory);
// }

// const fullPath = path.resolve(__dirname, videosDirectory);
// const convertedPath = fullPath.replace(/\\/g, '/').replace(/\/$/, '') + '/';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, videosDirectory)
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// });

// const upload = multer({ storage });


// //Store the video into database...
// const videoController = async (req, res) => {
//     try {
//         await videoModel.create({
//             video: req.file.filename
//         });
//         res.status(201).send({ message: "Data send to server." });
//         console.log(`Video Upload Successfully...`.bgCyan.white);
//     } catch (err) {
//         console.log(err);
//         res.status(501).send({ message: "Data is not send." })
//     }
// }


// //Fetch Video from database...
// const videoFetch = async (req, res) => {
//     try {
//         const data = await videoModel.find({});

//         if (data.length > 0) {
//             const videoPath = "S:/PROGRAMS/Mern_Stack Projects/winter/Server/videos/" + data[0]?.video;
//             // const videoP = "S:/PROGRAMS/Mern_Stack Projects/winter/Server/videos/" + data[0]?.video;
//             // const videoPath = path.join(videoP, data[0]?.video);


//             const videoStream = fs.createReadStream(videoPath);

//             videoStream.once('error', (err) => {
//                 console.error(`Error reading video file: ${err}`);
//                 res.status(500).json({ message: "Internal Server Error" });
//             });

//             res.status(200).header('Content-Type', 'video/mp4');
//             videoStream.pipe(res);
//         } else {
//             return res.status(404).json({ message: "Video not found." });
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// //Upload Video to database...
// router.post("/upload", upload.single('file'), videoController);

// //Fetch Video from database...
// router.get("/pullVideo", videoFetch);

// module.exports = router;