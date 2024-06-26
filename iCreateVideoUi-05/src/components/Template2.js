//Image_Topright_Bottomright_text_with_Sound

import React, { useRef, useState, useEffect } from "react";

import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import UserSidebar from "./Sidebar/Sidebar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Template2 = () => {
  const videoRef = useRef(null);
  const { videoname, MRID, layoutname } = useParams();
  const [showWatermark, setShowWatermark] = useState(false);
  const [watermarkImage, setWatermarkImage] = useState(null);
  const [binaryVideoData, setBinaryVideoData] = useState(null);
  const [doctorName, setDoctorName] = useState(""); // Default value

  const [watermarkImages, setWatermarkImages] = useState(Array(4).fill(null));
  const [inputText, setInputText] = useState("");

  const notify = () =>
    toast.success("Doctor Image Added!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const downloadcomplete = () =>
    toast.success("Video Processed !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleInputTxt = (e) => {
    setInputText(e.target.value);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...watermarkImages];
        updatedImages[index] = reader.result;
        setWatermarkImages(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const addWatermark = () => {
    setShowWatermark(true);
    notify();
  };

  const downloadWithWatermark = async () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth / 2;
    canvas.height = video.videoHeight / 2;
    const ctx = canvas.getContext("2d");

    const audioCtx = new AudioContext();
    const dest = audioCtx.createMediaStreamDestination();

    const videoStream = canvas.captureStream();
    const audioStream = dest.stream;

    const combinedStream = new MediaStream([
      videoStream.getVideoTracks()[0],
      audioStream.getAudioTracks()[0],
    ]);
    //
    const mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: "video/webm",
    });
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("video", blob, `${inputText}.webm`);
      console.log(formData.get("video"));

      try {
        const response = await fetch(
          " http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:8050/api/auth/videoCon",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Display a toast or handle download completion
        downloadcomplete();

        // Create a Blob object from the video data received in the response
        const videoBlob = await response.blob();

        // Create a URL for the video blob
        const videoBlobUrl = URL.createObjectURL(videoBlob);

        // Create a link element
        const downloadLink = document.createElement("a");
        downloadLink.href = videoBlobUrl;
        downloadLink.download = `${inputText}.mp4`;
        downloadLink.style.display = "none";

        // Append the link to the document body
        document.body.appendChild(downloadLink);

        // Simulate a click event to trigger the download
        downloadLink.click();

        // Remove the download link from the document body after download
        document.body.removeChild(downloadLink);

        console.log(
          "Video successfully sent to server for download:",
          response.data
        );
      } catch (error) {
        console.error("Error while sending video to server:", error);
      }
    };

    mediaRecorder.start();
    video.play();

    //For smooth transition...
    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    // Easing function for smoother rotation (Cubic)
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    // Load images when the component mounts
    const watermarkImageObjects = watermarkImages.map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });

    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    //     if (showWatermark && watermarkImageObjects) {
    //         const elapsedTime = video.currentTime;

    //         if (elapsedTime <= 6 ) {
    //             // Display the first image in a smaller square at the bottom-right with adjusted margins for the first 6 seconds
    //             const watermarkPosition = { x: 10, y: canvas.height - 110 };

    //             // Add bottom and left margins....
    //             const bottomMargin = 330;
    //             const leftMargin = 15;

    //             watermarkPosition.x += leftMargin;

    //             // Apply easing to the upward movement....
    //             const initialY = canvas.height - 110 - bottomMargin;
    //             const finalY = initialY - 40;
    //             watermarkPosition.y = initialY + easeInOutQuad(elapsedTime / 6) * (finalY - initialY);

    //             // Decrease the size of the image for the first 6 seconds...
    //             const watermarkSize = 300;

    //             // Rotate the image by an angle (in radians)......
    //             let rotateAngle = -Math.PI / 12;

    //             if (elapsedTime > 0 && elapsedTime <= 7) {
    //                 const rotationStartTime = 1;
    //                 const rotationDuration = 6;
    //                 const rotateProgress = (elapsedTime - rotationStartTime) / rotationDuration;
    //                 const rotateAngleOffset = Math.PI / 12;
    //                 rotateAngle += easeInOutQuad(rotateProgress) * rotateAngleOffset;

    //                 ctx.save();
    //                 ctx.translate(watermarkPosition.x + watermarkSize / 2, watermarkPosition.y + watermarkSize / 2);
    //                 ctx.rotate(rotateAngle);
    //                 watermarkPosition.x -= watermarkSize / 2;
    //                 watermarkPosition.y -= watermarkSize / 2;
    //             }

    //             const watermark = watermarkImageObjects[0];
    //             const watermarkWidth = watermarkSize;
    //             const watermarkHeight = watermarkSize;

    //             ctx.drawImage(watermark, watermarkPosition.x, watermarkPosition.y, watermarkWidth, watermarkHeight);

    //             if (elapsedTime <= 6) {
    //                 ctx.restore();
    //             }

    //         }
    //         else if (elapsedTime > 7 && elapsedTime <= 16) {
    //             const zoomDuration = 10;
    //             const zoomProgress = (elapsedTime - 6) / zoomDuration;

    //             const initialSize = 300;
    //             const finalSize = 600;

    //             const zoomedSize = initialSize + easeInOutQuad(zoomProgress) * (finalSize - initialSize);
    //             const zoomedX = canvas.width / 2 - zoomedSize / 2;
    //             const zoomedY = canvas.height / 2 - zoomedSize / 2;

    //             ctx.drawImage(watermarkImageObjects[1], zoomedX, zoomedY, zoomedSize, zoomedSize);
    //         }
    //     }

    //     if (!video.ended) {
    //         setTimeout(() => {
    //             requestAnimationFrame(drawFrame);
    //         }, 1000 / 15);
    //     }
    // };

    // For perfect time set....
    let holdImageUntilTime = 6;

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (showWatermark && watermarkImageObjects) {
        const elapsedTime = video.currentTime;

        if (elapsedTime <= holdImageUntilTime && holdImageUntilTime > 0) {
          // Display the first image for the specified duration
          const watermarkPosition = { x: 10, y: canvas.height - 110 };
          const bottomMargin = 330;
          const leftMargin = 15;

          watermarkPosition.x += leftMargin;

          const initialY = canvas.height - 110 - bottomMargin;
          const finalY = initialY - 40;
          watermarkPosition.y =
            initialY +
            easeInOutQuad(elapsedTime / holdImageUntilTime) *
              (finalY - initialY);

          const watermarkSize = 300;
          let rotateAngle = -Math.PI / 12;

          if (elapsedTime > 0 && elapsedTime <= 7) {
            const rotationStartTime = 1;
            const rotationDuration = 5;
            const rotateProgress =
              (elapsedTime - rotationStartTime) / rotationDuration;
            const rotateAngleOffset = Math.PI / 12;
            rotateAngle += easeInOutQuad(rotateProgress) * rotateAngleOffset;

            ctx.save();
            ctx.translate(
              watermarkPosition.x + watermarkSize / 2,
              watermarkPosition.y + watermarkSize / 2
            );
            ctx.rotate(rotateAngle);
            watermarkPosition.x -= watermarkSize / 2;
            watermarkPosition.y -= watermarkSize / 2;
          }

          const watermark = watermarkImageObjects[0];
          const watermarkWidth = watermarkSize;
          const watermarkHeight = watermarkSize;

          ctx.drawImage(
            watermark,
            watermarkPosition.x,
            watermarkPosition.y,
            watermarkWidth,
            watermarkHeight
          );

          // Add static text below the watermark
          const staticText = "Dr." + inputText;
          const topMargin = 32;

          const staticTextX = watermarkPosition.x + watermarkWidth / 2;
          const staticTextY = watermarkPosition.y + watermarkHeight + topMargin;

          // Customize text appearance
          ctx.font = "bold 37px 'Poppins', sans-serif";
          ctx.fillStyle = "black";
          ctx.textAlign = "center";

          // Draw the static text
          ctx.fillText(staticText, staticTextX, staticTextY);

          if (elapsedTime <= holdImageUntilTime) {
            ctx.restore();
          }

          // Check if the specified duration has passed, and update the variable
          if (elapsedTime >= holdImageUntilTime) {
            holdImageUntilTime = 0; // Set to 0 to indicate that the duration has passed
          }
        } else if (elapsedTime > 6 && elapsedTime <= 11) {
          const zoomDuration = 1.5;
          const holdDuration = 10;

          if (elapsedTime <= 6 + zoomDuration) {
            // Code to execute during the zoom-in phase for the second watermark
            const zoomProgress = (elapsedTime - 6) / zoomDuration;
            const initialSize = 0;
            const finalSize = 250;
            const zoomedSize =
              initialSize +
              easeInOutQuad(zoomProgress) * (finalSize - initialSize);
            const zoomedX = canvas.width / 2 - zoomedSize / 2;
            const zoomedY = canvas.height / 2 - zoomedSize / 2;
            ctx.drawImage(
              watermarkImageObjects[1],
              zoomedX,
              zoomedY,
              zoomedSize,
              zoomedSize
            );
          } else if (elapsedTime <= 6 + zoomDuration + holdDuration) {
            // Code to execute during the hold phase

            // Display the second watermark at the center
            const zoomedSize = 250; // Adjust this value to the final zoomed size
            const zoomedX = canvas.width / 2 - zoomedSize / 2;
            const zoomedY = canvas.height / 2 - zoomedSize / 2;
            ctx.drawImage(
              watermarkImageObjects[1],
              zoomedX,
              zoomedY,
              zoomedSize,
              zoomedSize
            );

            // Calculate positions for the third and fourth watermarks
            const thirdImage = watermarkImageObjects[2];
            const fourthImage = watermarkImageObjects[3];
            const distance = 35;

            // Display the third watermark at the left side with zoom-in and rotation effect
            const thirdZoomProgress = Math.min(
              1,
              (elapsedTime - (6 + zoomDuration)) / zoomDuration
            );
            const zoomedSizeThird =
              100 + easeInOutQuad(thirdZoomProgress) * (zoomedSize - 100);
            const thirdImageX = zoomedX - distance - zoomedSizeThird;
            const thirdImageY = zoomedY - (zoomedSizeThird - zoomedSize) / 2;
            const thirdRotation =
              Math.PI * 2 * easeInOutQuad(thirdZoomProgress); // Rotate a complete circle
            ctx.save();
            ctx.translate(
              thirdImageX + zoomedSizeThird / 2,
              thirdImageY + zoomedSizeThird / 2
            );
            ctx.rotate(thirdRotation);
            ctx.drawImage(
              thirdImage,
              -zoomedSizeThird / 2,
              -zoomedSizeThird / 2,
              zoomedSizeThird,
              zoomedSizeThird
            );
            ctx.restore();

            // Display the fourth watermark at the right side with zoom-in and rotation effect
            const fourthZoomProgress = Math.min(
              1,
              (elapsedTime - (6 + zoomDuration)) / zoomDuration
            );
            const zoomedSizeFourth =
              100 + easeInOutQuad(fourthZoomProgress) * (zoomedSize - 100);
            const fourthImageX = zoomedX + zoomedSize + distance;
            const fourthImageY = zoomedY - (zoomedSizeFourth - zoomedSize) / 2;
            const fourthRotation =
              -Math.PI * 2 * easeInOutQuad(fourthZoomProgress); // Rotate a complete circle
            ctx.save();
            ctx.translate(
              fourthImageX + zoomedSizeFourth / 2,
              fourthImageY + zoomedSizeFourth / 2
            );
            ctx.rotate(fourthRotation);
            ctx.drawImage(
              fourthImage,
              -zoomedSizeFourth / 2,
              -zoomedSizeFourth / 2,
              zoomedSizeFourth,
              zoomedSizeFourth
            );
            ctx.restore();
          }
        } else if (elapsedTime > 11 && elapsedTime <= 16) {
          const watermarkSize = 300;
          const moveDuration = 1.5; // Adjust the duration for upward movement
          const rotateDuration = 3; // Adjust the duration for rotation
          const totalDuration = moveDuration + rotateDuration;
          const totalProgress = Math.min(1, (elapsedTime - 11) / totalDuration);

          const fixedRightMargin = 50; // Set your desired right margin value

          // Calculate the initial position at the bottom-right with fixed right margin
          const initialX = canvas.width - 10 - watermarkSize - fixedRightMargin;
          const initialY = canvas.height - 10 - watermarkSize;

          // Calculate the final position for upward movement
          const finalY = 100;

          // Interpolate the current position based on the total progress
          let currentX = initialX;
          let currentY =
            initialY - easeInOutQuad(totalProgress) * (initialY - finalY);

          // Save the current transformation state
          ctx.save();

          // Translate to the watermark position
          ctx.translate(
            currentX + watermarkSize / 2,
            currentY + watermarkSize / 2
          );

          // If in the rotation phase, calculate the rotation angle
          if (totalProgress >= 1 - rotateDuration / totalDuration) {
            const rotateProgress =
              (totalProgress - (1 - rotateDuration / totalDuration)) /
              (rotateDuration / totalDuration);
            const rotateAngle = (Math.PI / 12) * easeInOutQuad(rotateProgress);

            // Rotate the watermark to the right side
            ctx.rotate(rotateAngle);
          }

          // Draw the watermark at the calculated position
          ctx.drawImage(
            watermarkImageObjects[0],
            -watermarkSize / 2,
            -watermarkSize / 2,
            watermarkSize,
            watermarkSize
          );

          // Calculate the position for the static text after transformations
          const staticText = inputText;
          const topMargin = 32;

          const staticTextX = 0; // Centered horizontally
          const staticTextY = watermarkSize / 2 + topMargin;

          // Customize text appearance
          ctx.font = "bold 37px 'Poppins', sans-serif";
          ctx.fillStyle = "black"; // Set your desired text color
          ctx.textAlign = "center";

          // Draw the static text
          ctx.fillText(staticText, staticTextX, staticTextY);

          // Restore the previous transformation state
          ctx.restore();
        } else if (elapsedTime > 16 && elapsedTime <= 22) {
          const watermarkSize = 255;
          const moveDuration = 1.8;
          const pulseFrequency = 8;
          const pulseAmplitude = 8;
          let watermarkPositions = []; // Array to store the positions of watermark 2, 3, and 4

          if (elapsedTime <= 16 + moveDuration) {
            // Code to execute during the upward movement phase
            const moveProgress = (elapsedTime - 16) / moveDuration;
            const initialY = canvas.height + watermarkSize; // Start from below the canvas
            const finalY = canvas.height - 400; // Adjust this value for the final position (move more above)
            const currentY =
              initialY - easeInOutQuad(moveProgress) * (initialY - finalY);

            // Draw watermark 2 from bottom-left
            ctx.drawImage(
              watermarkImageObjects[1],
              50,
              currentY,
              watermarkSize,
              watermarkSize
            );

            // Calculate move progress for watermark 3 and watermark 4
            const watermark3X = canvas.width / 2 - watermarkSize / 2;
            const watermark4X = canvas.width - watermarkSize - 50;
            const initialY3 = canvas.height + watermarkSize;
            const initialY4 = canvas.height + watermarkSize;
            const finalY3 = canvas.height - 400;

            // Calculate the current position for watermark 3 and 4
            const currentY3 =
              initialY3 - easeInOutQuad(moveProgress) * (initialY3 - finalY3);
            const currentY4 =
              initialY4 - easeInOutQuad(moveProgress) * (initialY4 - finalY3);

            // Draw watermark 3 from bottom-middle with easing
            ctx.drawImage(
              watermarkImageObjects[2],
              watermark3X,
              currentY3,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 4 from bottom-right with easing
            ctx.drawImage(
              watermarkImageObjects[3],
              watermark4X,
              currentY4,
              watermarkSize,
              watermarkSize
            );

            // Store the positions of watermark 3 and 4 for applying pulsing effect later
            watermarkPositions.push({ x: watermark3X, y: currentY3 });
            watermarkPositions.push({ x: watermark4X, y: currentY4 });
          } else {
            // Code to execute after the upward movement phase (when watermark 3 and 4 should hold their position)
            // Draw watermark 2 at the top left
            ctx.drawImage(
              watermarkImageObjects[1],
              50,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 3 at the hold position
            const watermark3X = canvas.width / 2 - watermarkSize / 2;
            ctx.drawImage(
              watermarkImageObjects[2],
              watermark3X,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 4 at the hold position
            const watermark4X = canvas.width - watermarkSize - 50;
            ctx.drawImage(
              watermarkImageObjects[3],
              watermark4X,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Apply pulsing effect to watermark 3 and 4 after reaching hold position
            //const holdDuration = 3; // Adjust the duration for holding at the top
            //const holdProgress = Math.min(1, (elapsedTime - (16 + moveDuration)) / holdDuration);

            // Apply pulsing effect to saved positions of watermark 3 and 4
            watermarkPositions.forEach((position) => {
              const pulseSize =
                Math.sin(elapsedTime * pulseFrequency) * pulseAmplitude;
              const watermarkWidth = watermarkSize + pulseSize;
              const watermarkHeight = watermarkSize + pulseSize;
              ctx.drawImage(
                watermarkImageObjects[2],
                position.x,
                canvas.height - 400,
                watermarkWidth,
                watermarkHeight
              );
              ctx.drawImage(
                watermarkImageObjects[3],
                position.x,
                canvas.height - 400,
                watermarkWidth,
                watermarkHeight
              );
            });
          }
        } else if (elapsedTime > 23) {
          // Display the watermark at the bottom-left with bottom margin
          const watermarkPosition = { x: 60, y: canvas.height - 130 }; // Updated y position to move upward by 20 pixels

          const bottomMargin = 0;
          const watermarkSize = 300;

          let rotateAngle = -Math.PI / 12; // Initialize rotation angle

          ctx.save(); // Save the current state of the canvas
          const watermark = watermarkImageObjects[0];
          const watermarkWidth = watermarkSize;
          const watermarkHeight = watermarkSize;

          // Add bottom margin to watermark position
          watermarkPosition.y =
            canvas.height - watermarkHeight - bottomMargin - 20;

          // Move the watermark from bottom to top
          const moveDuration = 1; // Adjust the duration as needed
          const moveProgress = Math.min(1, (elapsedTime - 23) / moveDuration);
          const moveDistance = 115; // Adjust the distance as needed
          watermarkPosition.y -= moveDistance * moveProgress;

          // Apply rotation to the watermark
          ctx.translate(
            watermarkPosition.x + watermarkWidth / 2,
            watermarkPosition.y + watermarkHeight / 2
          ); // Translate to the center of the watermark

          if (moveProgress === 1) {
            // Rotate smoothly to the right side
            const rotationDuration = 4; // Adjust the duration of rotation
            const rotationProgress = Math.min(
              1,
              (elapsedTime - 23 - moveDuration) / rotationDuration
            );
            const maxRotateAngle = Math.PI / 13;
            rotateAngle += easeInOutCubic(rotationProgress) * maxRotateAngle;
          }

          ctx.rotate(rotateAngle); // Rotate the watermark
          ctx.translate(
            -(watermarkPosition.x + watermarkWidth / 2),
            -(watermarkPosition.y + watermarkHeight / 2)
          ); // Translate back

          // Draw the watermark
          ctx.drawImage(
            watermark,
            watermarkPosition.x,
            watermarkPosition.y,
            watermarkWidth,
            watermarkHeight
          );

          // Calculate the position for the static text after transformations
          const staticText = inputText;
          const topMargin = 32;
          const textMargin = 6; // Additional margin between watermark and text

          const staticTextX = watermarkPosition.x + watermarkWidth / 2;
          const staticTextY =
            watermarkPosition.y +
            watermarkHeight / 2 +
            watermarkHeight / 2 +
            topMargin +
            textMargin; // Adjusted staticTextY to be below the watermark

          // Customize text appearance
          ctx.font = "bold 38px 'Poppins', sans-serif";
          ctx.fillStyle = "black"; // Set your desired text color
          ctx.textAlign = "center";

          // Draw the static text
          ctx.fillText(staticText, staticTextX, staticTextY);

          // Restore the previous transformation state
          ctx.restore(); // Restore the saved state of the canvas
        }
      }

      if (!video.ended) {
        setTimeout(() => {
          requestAnimationFrame(drawFrame);
        }, 1000 / 15);
      }
    };

    drawFrame();

    audioCtx.resume().then(() => {
      const audioSource = audioCtx.createMediaElementSource(video);
      audioSource.connect(dest);
    });

    setTimeout(() => {
      mediaRecorder.stop();
      video.pause();
    }, video.duration * 1000);
  };

  // Fetch the binary video data from the server
  useEffect(() => {
    axios
      .get(
        ` http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:8050/${videoname}`,
        {
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        // Create a Blob from the binary data
        const blob = new Blob([res.data], { type: "video/mp4" });
        setBinaryVideoData(blob);
      })
      .catch((err) => console.log(err));
  }, []);

  // Update the video source when binary data changes
  useEffect(() => {
    if (binaryVideoData) {
      // Create a URL for the Blob
      const videoURL = URL.createObjectURL(binaryVideoData);

      // Set the video source to the created URL
      const videoPlayer = videoRef.current;
      if (videoPlayer) {
        videoPlayer.src = videoURL;
      }
    }
  }, [binaryVideoData]);
  return (
    <>
      <UserSidebar />
      <div className="flex  relative top-[-24px]">
        <NavLink className="p-5 flex relative left-[3px] " to={`/home/${MRID}`}>
          <div
            style={{ backgroundColor: "#F58420", color: "white" }}
            className="p-[12px] drop-shadow-lg    h-10 w-10   rounded-full "
          >
            <IoMdArrowRoundBack />
          </div>
        </NavLink>
        <div className="text-black text-[20px] font-bold relative left-[-3px] top-[53px]  ">
          <p>Video Card</p>
        </div>
      </div>
      <div className="font-bold text-[9px] top-[-49px] relative left-[83px] w-[195px] text-[rgba(158,156,158,1)] ">
        <p>Please fill the details on your video templates.</p>
      </div>

      <div className="w-screen h-auto  mx-auto p-8 text-center flex justify-center items-center relative top-[-77px]">
        <div className=" w-[94vw] border-4 ">
          <br />
          <video ref={videoRef} controls width="500">
            <source
              src={binaryVideoData ? videoRef.current.src : ""}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {showWatermark && watermarkImages[0] && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "-104px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                className=""
                src={watermarkImages[0]}
                alt="Watermark"
                style={{ maxWidth: "100px", borderRadius: "50%" }}
              />
            </div>
          )}

          {watermarkImages.map((image, index) => (
            <div
              key={index}
              style={{ display: "inline-block", marginRight: "10px" }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
              />
            </div>
          ))}

          <input
            type="text"
            className="w-[98%] h-[40px] border-2 rounded-xl p-[10px]"
            value={inputText}
            onChange={handleInputTxt}
            placeholder="Enter Doctor Name"
          />
          <div className="pt-[20px] flex ">
            <button
              onClick={addWatermark}
              className="bg-green-500 text-white  rounded-full hover:bg-green-600 transition duration-300 w-[300px] h-[30px]"
            >
              Add Image
            </button>
            <ToastContainer />
            <button
              onClick={downloadWithWatermark}
              className="bg-[#ef8018] text-white rounded-full  w-[300px] h-[30px]"
            >
              Download Video
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template2;
