const videoModel = require("../models/videoModel");
const { User } = require("../models/userModel");
const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const async = require("async");

//3 3 Videos process batch wise but output give as per video process send to client...
let processingQueue = [];
const videoConvertor = async (req, res) => {
  try {
    const { buffer, originalname } = req.file;

    // Define the path where the uploaded video will be saved
    const uploadDir = path.join(__dirname, "inputVideo2");
    const videoFilePath = path.join(uploadDir, originalname);
    console.log("videoFilePath", videoFilePath);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    fs.writeFileSync(videoFilePath, buffer);

    const outputDir = path.join(__dirname, "outputVideo2");
    const outputFilePath = path.join(
      outputDir,
      originalname.replace(/\.[^/.]+$/, ".mp4")
    );
    console.log(outputFilePath);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Add the video to the processing queue
    processingQueue.push(originalname);

    async.parallelLimit(
      [
        function (callback) {
          const ffmpegProcess = ffmpeg(videoFilePath)
            .output(outputFilePath)
            .videoCodec("libx264")
            .audioCodec("aac")
            .outputFPS(13)
            .on("start", (commandLine) => {
              console.log(`Processing video: ${originalname}`);
              console.log(`FFmpeg command: ${commandLine}`);
            })
            .on("end", () => {
              console.log(
                `Video ${originalname} MP4 Conversion finished....`.bgCyan.white
              );
              // Remove the video from the processing queue
              processingQueue = processingQueue.filter(
                (item) => item !== originalname
              );
              callback(null, outputFilePath);
            })
            .on("error", (err) => {
              console.error("Error:", err);
              callback(err);
            })
            .run();
        },
      ],
      5,
      function (err, results) {
        fs.unlinkSync(videoFilePath);
        if (!err) {
          // res.status(200).contentType('video/mp4').sendFile(results[0]);
          res
            .status(200)
            .contentType("video/mp4")
            .sendFile(results[0], (err) => {
              if (err) {
                console.error("Error sending file:", err);
              } else {
                // fs.unlinkSync(results[0]);

                // Remove the processed file from the processingQueue
                const processedFile = results[0].split(path.sep).pop();
                processingQueue = processingQueue.filter(
                  (item) => item !== processedFile
                );

                // Log the updated processingQueue
                console.log(
                  `Updated processingQueue stack : [${processingQueue}]`
                    .bgMagenta.white
                );
                console.log(
                  `Updated remaining queue Count : [${processingQueue.length}]`
                    .bgMagenta.white
                );
              }
            });
        } else {
          console.error("Async error:", err);
          res.status(500).end();
        }
      }
    );

    // Print the videos in processing queue
    console.log(
      `Videos in processing queue: [${processingQueue}]`.bgYellow.black
    );
    console.log(
      `Videos in processing queue Count : [${processingQueue.length}]`.bgYellow
        .black
    );
  } catch (err) {
    console.log(err);
    res.status(501).send({ message: "Data is not sent." });
  }
};

//
//Store the video into database...
const videoController = async (req, res) => {
  try {
    await videoModel.create({
      video: req.file.filename,
      name: req.body.name,
    });
    res.status(201).send({ message: "Data send to server." });
    console.log(`Video Upload Successfully...`.bgCyan.white);
  } catch (err) {
    console.log(err);
    res.status(501).send({ message: "Data is not send." });
  }
};

const videoFetch = async (req, res) => {
  try {
    //const data = await videoModel.find({});
    const data = await videoModel.findOne().sort({ createdAt: -1 }).limit(1);
    console.log("Video_ID :" + data[0]?.video);

    const current = data.video;
    console.log("data :" + current);

    if (current) {
      const videoPath =
        "C:/Users/devel/OneDrive/Desktop/KreationVideo18-01/ServerSide/videos/" +
        current;
      //const videoPath = path.join(__dirname, videosDirectory, data[0]?.video);
      console.log("hello : " + videoPath);

      const videoStream = fs.createReadStream(videoPath);

      videoStream.once("error", (err) => {
        console.error(`Error reading video file: ${err}`);
        res.status(500).json({ message: "Internal Server Error" });
      });

      res.status(200).header("Content-Type", "video/mp4");
      videoStream.pipe(res);
    } else {
      return res.status(404).json({ message: "Video not found." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const allvideByname = async (req, res) => {
  const videosName = await videoModel.find({});
  res.json(videosName);
};

// const allvideByname2 = async (req, res) => {
//     try {
//       // Assuming the company name is passed as a parameter (e.g., /allvideos/:companyName)
//       const userCompanyName = req.params.COMPANYNAME;
//   console.log(userCompanyName);
//       // Fetch all videos from the database
//       const videos = await videoModel.find({});
//     //   console.log(videos);

//       // Filter videos based on company name
//       const filteredVideos = videos.filter(video => {
//         // Check the company name and include videos accordingly
//         if (userCompanyName === 'SunPharma' && (video.name === 'Temp1')) {
//           return true;
//         } else if (userCompanyName === 'Cipla' && (video.name === 'Temp1' || video.name === 'Temp2')) {
//           return true;
//         }
//         // Add more conditions for other company names as needed

//         return false;
//       });
//   console.log(filteredVideos);
//       // Send the filtered videos in the response
//       res.json(filteredVideos);
//     } catch (error) {
//       // Handle errors appropriately
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };

const allvideByname2 = async (req, res) => {
  try {
    // Assuming the company name is passed as a parameter (e.g., /allvideos/:companyName)
    const userCompanyName = req.params.COMPANYNAME;
    console.log(userCompanyName);

    // Fetch all videos from the database
    const videos = await videoModel.find({});
    console.log(videos);

    // Fetch the user from the database to get the expiration date for video access
    const user = await User.findOne({ COMPANYNAME: userCompanyName });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Get the current date
    const currentDate = new Date();
    console.log(currentDate);

    // Filter videos based on company name and user's video access expiration date
    const filteredVideos = videos.filter((video) => {
      // Check the company name
      if (
        (userCompanyName === "SUNPHARMA" && video.name === "Temp1") ||
        (userCompanyName === "CIPLA" &&
          (video.name === "Temp1" || video.name === "Temp2")) ||
        (userCompanyName === "SOMPRAZ" && video.name === "Temp1")
        // Add more conditions for other company names as needed
      ) {
        // Check if the video category has an expiration date and if it's after the current date
        const videoCategory = video.cardCategory; // Assuming cardCategory is a field in the video model

        const companyExpiryDate =
          user.expirydates[0].expiryDates[userCompanyName];

        console.log(companyExpiryDate);

        const isNotExpired =
          !companyExpiryDate || currentDate < new Date(companyExpiryDate);

        return isNotExpired;
      }

      return false;
    });

    // Check if there are any matching videos
    if (filteredVideos.length > 0) {
      // Send the filtered videos in the response
      res.json(filteredVideos);
    } else {
      // If no matching videos or expired videos, send an appropriate message
      res.status(404).json({
        message:
          "No matching or accessible videos found. Please purchase access.",
      });
    }
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  videoController,
  videoFetch,
  allvideByname,
  allvideByname2,
  videoConvertor,
};
