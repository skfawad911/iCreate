import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";

import UserSidebar from "./Sidebar/Sidebar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { message } from "antd";

import Image1 from '../components/assets/doctor.jpg'
import { SyncLoader } from "react-spinners";

const Test = () => {
  const videoRef = useRef(null);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRef4 = useRef(null);
  const videoRef5 = useRef(null);

 
  const charLimit = 19;

  const [showWatermark, setShowWatermark] = useState(false);
  const [binaryVideoData, setBinaryVideoData] = useState(null);
  const [watermarkImages, setWatermarkImages] = useState([]);

  console.log("all images", watermarkImages);
  const [inputText1, setInputText1] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [inputText3, setInputText3] = useState("");
  const [inputText4, setInputText4] = useState("");
  const [inputText5, setInputText5] = useState("");
  const [inputText6, setInputText6] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("select");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [groupInputs, setGroupInputs] = useState({
    group1: { fileInputs: Array(4).fill(null) },
    group2: { fileInputs: Array(8).fill(null) },
    group3: { fileInputs: Array(12).fill(null) },
    group4: { fileInputs: Array(16).fill(null) },
    group5: { fileInputs: Array(20).fill(null) },
    group6: { fileInputs: Array(24).fill(null) },
    // Add more groups and specify the number of inputs for each
  });



  const [isLoadingVideo1, setIsLoadingVideo1] = useState(false);
  const [isLoadingVideo2, setIsLoadingVideo2] = useState(false);
  



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

  const failed = () => {
    toast.error("Please Check the Fields or Add Image!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const { videoname, MRID, name } = useParams();

  //MRID Get form localstorage...
  const mrId = localStorage.getItem("mrID");

  //Handle groups according images....
  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
    setIsButtonDisabled(false);
    setWatermarkImages([]);
    setInputText1("");
    setInputText2("");
    setInputText3("");
    setInputText4("");
    setInputText5("");
    setInputText6("");
  };

  //Update the inputText for only 1 video...
  const handleInputTextChange1 = (e) => {
    const value = e.target.value;

    if (value.length <= charLimit) {
      setInputText1(e.target.value);
    }
  };

  const remainingCharacters1 = Math.max(0, charLimit - inputText1.length);

  //Update the inputText for only 2 video...
  const handleInputTextChange2 = (e) => {
    const value = e.target.value;

    if (value.length <= charLimit) {
      setInputText2(e.target.value);
    }
  };

  const remainingCharacters2 = Math.max(0, charLimit - inputText2.length);

  //Update the inputText for only 3 video...
  const handleInputTextChange3 = (e) => {
    const value = e.target.value;

    if (value.length <= charLimit) {
      setInputText3(e.target.value);
    }
  };
  const remainingCharacters3 = Math.max(0, charLimit - inputText3.length);

  //Update the inputText for only 4 video...
  const handleInputTextChange4 = (e) => {
    const value = e.target.value;

    if (value.length <= charLimit) {
      setInputText4(e.target.value);
    }
  };

  const remainingCharacters4 = Math.max(0, charLimit - inputText4.length);

  //Update the inputText for only 5 video...
  const handleInputTextChange5 = (e) => {
    const value = e.target.value;

    if (value.length <= charLimit) {
      setInputText5(e.target.value);
    }
  };
  const remainingCharacters5 = Math.max(0, charLimit - inputText5.length);

  //Update the inputText for only 6 video...
  const handleInputTextChange6 = (e) => {
    const value = e.target.value;

    if (value.length <= charLimit) {
      setInputText6(e.target.value);
    }
  };

  const remainingCharacters6 = Math.max(0, charLimit - inputText5.length);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      const loadImage = () =>
        new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });

      loadImage().then((imageResult) => {
        console.log("Index:", index);
        console.log("Previous watermarkImages:", watermarkImages);

        const updatedInputs = { ...groupInputs };
        if (selectedGroup === "group1") {
          updatedInputs.group1.fileInputs[index] = file;
        } else if (selectedGroup === "group2") {
          updatedInputs.group2.fileInputs[index] = file;
        } else if (selectedGroup === "group3") {
          updatedInputs.group3.fileInputs[index] = file;
        } else if (selectedGroup === "group4") {
          updatedInputs.group4.fileInputs[index] = file;
        } else if (selectedGroup === "group5") {
          updatedInputs.group5.fileInputs[index] = file;
        } else if (selectedGroup === "group6") {
          updatedInputs.group6.fileInputs[index] = file;
        }
        setGroupInputs(updatedInputs);

        Promise.all([imageResult, ...watermarkImages]).then((results) =>
          setWatermarkImages(results.filter(Boolean))
        );
      });
    }
  };

  const addWatermark = () => {
    console.log("Image" + watermarkImages.length);

    let isValid = true;

    if (selectedGroup === "group1" && watermarkImages.length <= 3) {
      failed();
      isValid = false;
    } else if (selectedGroup === "group2" && watermarkImages.length <= 7) {
      failed();
      isValid = false;
    } else if (selectedGroup === "group3" && watermarkImages.length <= 11) {
      failed();
      isValid = false;
    } else if (selectedGroup === "group4" && watermarkImages.length <= 15) {
      failed();
      isValid = false;
    } else if (selectedGroup === "group5" && watermarkImages.length <= 19) {
      failed();
      isValid = false;
    } else if (selectedGroup === "group6" && watermarkImages.length <= 23) {
      failed();
      isValid = false;
    }

    if (isValid) {
      setShowWatermark(true);
      console.log(isButtonDisabled);
      // setButtonText('Image Added');
      setIsButtonDisabled(true);
      // console.log("final",isButtonDisabled);

      // Reset button color after a certain delay (e.g., 2 seconds)
      setTimeout(() => {
        // setIsButtonDisabled(false);
        notify();
        // console.log(isButtonDisabled);
      }, 2000);
    }
  };

  // Handle the User Usage Data....
  const handleUserData = (inputText) => {
    const requestBody = {
      MRID,
      type: "videocard",
      videoname: name,
      fileName: videoname,
      doctorName: inputText,
    };

    fetch(` http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:8050/api/auth/submitUsage/${mrId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.success);
        if (data.success === true) {
          message.success("Video Usage tracked successfully..");
        } else {
          message.error("Video is failed to tracked Usage..!!!");
        }
      });
  };

  //Loop the image to store.......
  const watermarkImageObjects = watermarkImages.map((src) => {
    const image = new Image();
    image.src = src;
    return image;
  });

  console.log("Total Images objects :", watermarkImageObjects);

  //Download the 1st video with starting 4Images....
  const downloadWithWatermark1 = async () => {
    console.log("Birthday", watermarkImageObjects);

    if (
      selectedGroup === "group1" &&
      (inputText1 === "" || isButtonDisabled === false)
    ) {
      failed();
    } else if (
      selectedGroup === "group2" &&
      (inputText2 === "" || inputText1 === "" || isButtonDisabled === false)
    ) {
      failed();
    } else if (
      selectedGroup === "group3" &&
      (inputText3 === "" ||
        inputText2 === "" ||
        inputText1 === "" ||
        isButtonDisabled === false)
    ) {
      failed();
    } else if (
      selectedGroup === "group4" &&
      (inputText4 === "" ||
        inputText3 === "" ||
        inputText2 === "" ||
        inputText1 === "" ||
        isButtonDisabled === false)
    ) {
      failed();
    } else if (
      selectedGroup === "group5" &&
      (inputText5 == "" ||
        inputText4 === "" ||
        inputText3 === "" ||
        inputText2 === "" ||
        inputText1 === "" ||
        isButtonDisabled === false)
    ) {
      failed();
    } else if (
      selectedGroup === "group6" &&
      (inputText6 == "" ||
        inputText5 == "" ||
        inputText4 === "" ||
        inputText3 === "" ||
        inputText2 === "" ||
        inputText1 === "" ||
        isButtonDisabled === false)
    ) {
      failed();
    } else {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth / 2;
      canvas.height = video.videoHeight / 2;
      const ctx = canvas.getContext("2d");

      const audioCtx = new AudioContext();
      const dest = audioCtx.createMediaStreamDestination();

      const videoStream = canvas.captureStream();
      const audioStream = dest.stream;

      ///////

      // Detect the device type..
      console.log("User agent:", navigator.userAgent);
      let mimeType;
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        console.log("iOS device detected");
        // mimeType = "video/mp4";
        mimeType = 'video/mp4; codecs="avc1.42E01E"';
      } else {
        console.log("Non-iOS device detected");
        mimeType = "video/webm";
      }
      console.log("Selected MIME type:", mimeType);

      

      const recorder = new MediaRecorder(
        new MediaStream([
          videoStream.getVideoTracks()[0],
          audioStream.getAudioTracks()[0],
        ]),
        { mimeType: mimeType}
      );
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const formData = new FormData();
        formData.append("video", blob, `${inputText1}.webm`);
        console.log(formData.get("video"));

        try {

          setIsLoadingVideo1(true);
          
          const response = await axios.post("/api/auth/videoCon", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            // Ensure response type is set to arraybuffer to receive binary data
            responseType: "arraybuffer",
          });

          // Display a toast or handle download completion
          downloadcomplete();

          handleUserData(inputText1);

          setIsLoadingVideo1(false);

          // Check if selectedgroup is equal to "group2"
          if (selectedGroup === "group2") {
            // Call downloadWithWatermark1() after 30 seconds
            setTimeout(() => {
              downloadWithWatermark2();
            }, 5000); // 30 seconds in milliseconds
          } else if (selectedGroup === "group3") {
            setTimeout(() => {
              downloadWithWatermark2();
            }, 3000); // 3 seconds in milliseconds
          } else if (selectedGroup === "group4") {
            setTimeout(() => {
              downloadWithWatermark2();
            }, 6000);
          } else if (selectedGroup === "group5") {
            setTimeout(() => {
              downloadWithWatermark2();
            }, 9000);
          } else if (selectedGroup === "group6") {
            setTimeout(() => {
              downloadWithWatermark2();
            }, 4000);
          }

          // Create a Blob object from the video data received in the response
          const videoBlob = new Blob([response.data], { type: "video/mp4" });

          // Create a URL for the video blob
          const videoBlobUrl = URL.createObjectURL(videoBlob);

          // Create a link element
          const downloadLink = document.createElement("a");
          downloadLink.href = videoBlobUrl;
          downloadLink.download = `${inputText1}.mp4`;
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

      recorder.start();
      video.play();

      //For smooth transition...
      const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };

      // Easing function for smoother rotation (Cubic)
      const easeInOutCubic = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      // For perfect time set....
      let holdImageUntilTime = 6;

      // console.log("date :",batchObjects);
      const drawFrame = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // console.log("WaterMarkObject before use :", watermarkImageObjects);
        if (
          showWatermark &&
          watermarkImageObjects &&
          watermarkImageObjects.length > 0
        ) {
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
            const staticText = "Dr." + inputText1;
            const topMargin = 32;

            const staticTextX = watermarkPosition.x + watermarkWidth / 2;
            const staticTextY =
              watermarkPosition.y + watermarkHeight + topMargin;

            // Customize text appearance
            ctx.font = "bold 33px 'Poppins', sans-serif";
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
              const fourthImageY =
                zoomedY - (zoomedSizeFourth - zoomedSize) / 2;
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
            const totalProgress = Math.min(
              1,
              (elapsedTime - 11) / totalDuration
            );

            const fixedRightMargin = 50; // Set your desired right margin value

            // Calculate the initial position at the bottom-right with fixed right margin
            const initialX =
              canvas.width - 10 - watermarkSize - fixedRightMargin;
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
              const rotateAngle =
                (Math.PI / 12) * easeInOutQuad(rotateProgress);

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
            const staticText = "Dr." + inputText1;
            const topMargin = 32;

            const staticTextX = 0; // Centered horizontally
            const staticTextY = watermarkSize / 2 + topMargin;

            // Customize text appearance
            ctx.font = "bold 33px 'Poppins', sans-serif";
            ctx.fillStyle = "black"; // Set your desired text color
            ctx.textAlign = "center";

            // Draw the static text
            ctx.fillText(staticText, staticTextX, staticTextY);

            // Restore the previous transformation state
            ctx.restore();
          } else if (elapsedTime > 16 && elapsedTime <= 22) {
            const watermarkSize = 255;
            const moveDuration = 1.8; // Adjust the duration for upward movement
            const pulseFrequency = 8;
            const pulseAmplitude = 8;

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
              const finalY3 = canvas.height - 400; // The position where watermark 3 and 4 should hold

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

              // Apply pulsing effect to watermark 2, 3, and 4 after reaching hold position
              const holdDuration = 3; // Adjust the duration for holding at the top
              const holdProgress = Math.min(
                1,
                (elapsedTime - (16 + moveDuration)) / holdDuration
              );
              const pulseSize =
                Math.sin(elapsedTime * pulseFrequency) * pulseAmplitude;
              const watermarkWidth = watermarkSize + pulseSize;
              const watermarkHeight = watermarkSize + pulseSize;

              // Apply pulsing effect to watermark 2
              ctx.drawImage(
                watermarkImageObjects[1],
                50,
                canvas.height - 400,
                watermarkWidth,
                watermarkHeight
              );

              // Apply pulsing effect to watermark 3
              ctx.drawImage(
                watermarkImageObjects[2],
                watermark3X,
                canvas.height - 400,
                watermarkWidth,
                watermarkHeight
              );

              // Apply pulsing effect to watermark 4
              ctx.drawImage(
                watermarkImageObjects[3],
                watermark4X,
                canvas.height - 400,
                watermarkWidth,
                watermarkHeight
              );
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
            const staticText = "Dr." + inputText1;
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
        recorder.stop();
        video.pause();
      }, video.duration * 1000);
    }
  };

  //Download the 2nd video with starting 4Images....
  const downloadWithWatermark2 = async () => {
    if (
      selectedGroup == "group2" &&
      watermarkImages.length <= 7 &&
      inputText1 == "" &&
      inputText2 == ""
    ) {
      failed();
    } else {
      const video = videoRef1.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth / 2;
      canvas.height = video.videoHeight / 2;
      const ctx = canvas.getContext("2d");

      const audioCtx = new AudioContext();
      const dest = audioCtx.createMediaStreamDestination();

      const videoStream = canvas.captureStream();
      const audioStream = dest.stream;


      console.log("User agent:", navigator.userAgent);
      let mimeType;
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        console.log("iOS device detected");
        // mimeType = "video/mp4";
        mimeType = 'video/mp4; codecs="avc1.42E01E"';
      } else {
        console.log("Non-iOS device detected");
        mimeType = "video/webm";
      }
      console.log("Selected MIME type:", mimeType);



      const recorder = new MediaRecorder(
        new MediaStream([
          videoStream.getVideoTracks()[0],
          audioStream.getAudioTracks()[0],
        ]),
        { mimeType: mimeType }
      );
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const formData = new FormData();
        formData.append("video", blob, `${inputText2}.webm`);
        console.log(formData.get("video"));

        try {
          setIsLoadingVideo2(true);
          const response = await axios.post("/api/auth/videoCon", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            // Ensure response type is set to arraybuffer to receive binary data
            responseType: "arraybuffer",
          });
          // Display a toast or handle download completion
          downloadcomplete();

          handleUserData(inputText2);
          setIsLoadingVideo2(false);

          // Check if selectedgroup is equal to "group2"
          if (selectedGroup === "group3") {
            // Call downloadWithWatermark1() after 30 seconds
            setTimeout(() => {
              downloadWithWatermark3();
            }, 3000); // 60 seconds in milliseconds
          } else if (selectedGroup === "group4") {
            setTimeout(() => {
              downloadWithWatermark3();
            }, 6000);
          } else if (selectedGroup === "group5") {
            setTimeout(() => {
              downloadWithWatermark3();
            }, 9000);
          } else if (selectedGroup === "group6") {
            setTimeout(() => {
              downloadWithWatermark3();
            }, 4000);
          }

          // Create a Blob object from the video data received in the response
          const videoBlob = new Blob([response.data], { type: "video/mp4" });

          // Create a URL for the video blob
          const videoBlobUrl = URL.createObjectURL(videoBlob);

          // Create a link element
          const downloadLink = document.createElement("a");
          downloadLink.href = videoBlobUrl;
          downloadLink.download = `${inputText2}.mp4`;
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

      recorder.start();
      video.play();

      //For smooth transition...
      const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };

      // Easing function for smoother rotation (Cubic)
      const easeInOutCubic = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      // For perfect time set....
      let holdImageUntilTime = 6;

      // console.log("date :",batchObjects);
      const drawFrame = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // console.log("WaterMarkObject before use :", watermarkImageObjects);
        if (
          showWatermark &&
          watermarkImageObjects &&
          watermarkImageObjects.length > 0
        ) {
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

            const watermark = watermarkImageObjects[4];
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
            const staticText = "Dr." + inputText2;
            const topMargin = 32;

            const staticTextX = watermarkPosition.x + watermarkWidth / 2;
            const staticTextY =
              watermarkPosition.y + watermarkHeight + topMargin;

            // Customize text appearance
            ctx.font = "bold 33px 'Poppins', sans-serif";
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
                watermarkImageObjects[5],
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
                watermarkImageObjects[5],
                zoomedX,
                zoomedY,
                zoomedSize,
                zoomedSize
              );

              // Calculate positions for the third and fourth watermarks
              const thirdImage = watermarkImageObjects[6];
              const fourthImage = watermarkImageObjects[7];
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
              const fourthImageY =
                zoomedY - (zoomedSizeFourth - zoomedSize) / 2;
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
            const totalProgress = Math.min(
              1,
              (elapsedTime - 11) / totalDuration
            );

            const fixedRightMargin = 50; // Set your desired right margin value

            // Calculate the initial position at the bottom-right with fixed right margin
            const initialX =
              canvas.width - 10 - watermarkSize - fixedRightMargin;
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
              const rotateAngle =
                (Math.PI / 12) * easeInOutQuad(rotateProgress);

              // Rotate the watermark to the right side
              ctx.rotate(rotateAngle);
            }

            // Draw the watermark at the calculated position
            ctx.drawImage(
              watermarkImageObjects[4],
              -watermarkSize / 2,
              -watermarkSize / 2,
              watermarkSize,
              watermarkSize
            );

            // Calculate the position for the static text after transformations
            const staticText = "Dr." + inputText2;
            const topMargin = 32;

            const staticTextX = 0; // Centered horizontally
            const staticTextY = watermarkSize / 2 + topMargin;

            // Customize text appearance
            ctx.font = "bold 33px 'Poppins', sans-serif";
            ctx.fillStyle = "black"; // Set your desired text color
            ctx.textAlign = "center";

            // Draw the static text
            ctx.fillText(staticText, staticTextX, staticTextY);

            // Restore the previous transformation state
            ctx.restore();
          } else if (elapsedTime > 16 && elapsedTime <= 22) {
            const watermarkSize = 255;
            const moveDuration = 1.8; // Adjust the duration for upward movement
            const pulseFrequency = 8;
            const pulseAmplitude = 8;

            if (elapsedTime <= 16 + moveDuration) {
              // Code to execute during the upward movement phase
              const moveProgress = (elapsedTime - 16) / moveDuration;
              const initialY = canvas.height + watermarkSize; // Start from below the canvas
              const finalY = canvas.height - 400; // Adjust this value for the final position (move more above)
              const currentY =
                initialY - easeInOutQuad(moveProgress) * (initialY - finalY);

              // Draw watermark 2 from bottom-left
              ctx.drawImage(
                watermarkImageObjects[5],
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
              const finalY3 = canvas.height - 400; // The position where watermark 3 and 4 should hold

              // Calculate the current position for watermark 3 and 4
              const currentY3 =
                initialY3 - easeInOutQuad(moveProgress) * (initialY3 - finalY3);
              const currentY4 =
                initialY4 - easeInOutQuad(moveProgress) * (initialY4 - finalY3);

              // Draw watermark 3 from bottom-middle with easing
              ctx.drawImage(
                watermarkImageObjects[6],
                watermark3X,
                currentY3,
                watermarkSize,
                watermarkSize
              );

              // Draw watermark 4 from bottom-right with easing
              ctx.drawImage(
                watermarkImageObjects[7],
                watermark4X,
                currentY4,
                watermarkSize,
                watermarkSize
              );
            } else {
              // Code to execute after the upward movement phase (when watermark 3 and 4 should hold their position)
              // Draw watermark 2 at the top left
              ctx.drawImage(
                watermarkImageObjects[5],
                50,
                canvas.height - 400,
                watermarkSize,
                watermarkSize
              );

              // Draw watermark 3 at the hold position
              const watermark3X = canvas.width / 2 - watermarkSize / 2;
              ctx.drawImage(
                watermarkImageObjects[6],
                watermark3X,
                canvas.height - 400,
                watermarkSize,
                watermarkSize
              );

              // Draw watermark 4 at the hold position
              const watermark4X = canvas.width - watermarkSize - 50;
              ctx.drawImage(
                watermarkImageObjects[7],
                watermark4X,
                canvas.height - 400,
                watermarkSize,
                watermarkSize
              );

              // Apply pulsing effect to watermark 2, 3, and 4 after reaching hold position
              const holdDuration = 3; // Adjust the duration for holding at the top
              const holdProgress = Math.min(
                1,
                (elapsedTime - (16 + moveDuration)) / holdDuration
              );
              const pulseSize =
                Math.sin(elapsedTime * pulseFrequency) * pulseAmplitude;
              const watermarkWidth = watermarkSize + pulseSize;
              const watermarkHeight = watermarkSize + pulseSize;

              // Apply pulsing effect to watermark 2
              ctx.drawImage(
                watermarkImageObjects[5],
                50,
                canvas.height - 400,
                watermarkWidth,
                watermarkHeight
              );

              // Apply pulsing effect to watermark 3
              ctx.drawImage(
                watermarkImageObjects[6],
                watermark3X,
                canvas.height - 400,
                watermarkWidth,
                watermarkHeight
              );

              // Apply pulsing effect to watermark 4
              ctx.drawImage(
                watermarkImageObjects[7],
                watermark4X,
                canvas.height - 400,
                watermarkWidth,
                watermarkHeight
              );
            }
          } else if (elapsedTime > 23) {
            // Display the watermark at the bottom-left with bottom margin
            const watermarkPosition = { x: 60, y: canvas.height - 130 }; // Updated y position to move upward by 20 pixels

            const bottomMargin = 0;
            const watermarkSize = 300;

            let rotateAngle = -Math.PI / 12; // Initialize rotation angle

            ctx.save(); // Save the current state of the canvas
            const watermark = watermarkImageObjects[4];
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
            const staticText = "Dr." + inputText2;
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
        recorder.stop();
        video.pause();
      }, video.duration * 1000);
    }
  };

  //Download the 3rd video with starting 4Images....
  const downloadWithWatermark3 = async () => {
    const video = videoRef2.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth / 2;
    canvas.height = video.videoHeight / 2;
    const ctx = canvas.getContext("2d");

    const audioCtx = new AudioContext();
    const dest = audioCtx.createMediaStreamDestination();

    const videoStream = canvas.captureStream();
    const audioStream = dest.stream;

    const recorder = new MediaRecorder(
      new MediaStream([
        videoStream.getVideoTracks()[0],
        audioStream.getAudioTracks()[0],
      ]),
      { mimeType: "video/webm" }
    );
    const chunks = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("video", blob, `${inputText3}.webm`);
      console.log(formData.get("video"));

      try {
        const response = await axios.post("/api/auth/videoCon", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // Ensure response type is set to arraybuffer to receive binary data
          responseType: "arraybuffer",
        });
        // Display a toast or handle download completion
        downloadcomplete();
        handleUserData(inputText3);

        // Check if selectedgroup is equal to "group2"
        if (selectedGroup === "group4") {
          // Call downloadWithWatermark1() after 30 seconds
          setTimeout(() => {
            downloadWithWatermark4();
          }, 6000); // 60 seconds in milliseconds
        } else if (selectedGroup === "group5") {
          setTimeout(() => {
            downloadWithWatermark4();
          }, 9000);
        } else if (selectedGroup === "group6") {
          setTimeout(() => {
            downloadWithWatermark4();
          }, 4000);
        }

        // Create a Blob object from the video data received in the response
        const videoBlob = new Blob([response.data], { type: "video/mp4" });

        // Create a URL for the video blob
        const videoBlobUrl = URL.createObjectURL(videoBlob);

        // Create a link element
        const downloadLink = document.createElement("a");
        downloadLink.href = videoBlobUrl;
        downloadLink.download = `${inputText3}.mp4`;
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

    recorder.start();
    video.play();

    //For smooth transition...
    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    // Easing function for smoother rotation (Cubic)
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    // For perfect time set....
    let holdImageUntilTime = 6;

    // console.log("date :",batchObjects);
    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // console.log("WaterMarkObject before use :", watermarkImageObjects);
      if (
        showWatermark &&
        watermarkImageObjects &&
        watermarkImageObjects.length > 0
      ) {
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

          const watermark = watermarkImageObjects[8];
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
          const staticText = "Dr." + inputText3;
          const topMargin = 32;

          const staticTextX = watermarkPosition.x + watermarkWidth / 2;
          const staticTextY = watermarkPosition.y + watermarkHeight + topMargin;

          // Customize text appearance
          ctx.font = "bold 33px 'Poppins', sans-serif";
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
              watermarkImageObjects[9],
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
              watermarkImageObjects[9],
              zoomedX,
              zoomedY,
              zoomedSize,
              zoomedSize
            );

            // Calculate positions for the third and fourth watermarks
            const thirdImage = watermarkImageObjects[10];
            const fourthImage = watermarkImageObjects[11];
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
            watermarkImageObjects[8],
            -watermarkSize / 2,
            -watermarkSize / 2,
            watermarkSize,
            watermarkSize
          );

          // Calculate the position for the static text after transformations
          const staticText = "Dr." + inputText3;
          const topMargin = 32;

          const staticTextX = 0; // Centered horizontally
          const staticTextY = watermarkSize / 2 + topMargin;

          // Customize text appearance
          ctx.font = "bold 33px 'Poppins', sans-serif";
          ctx.fillStyle = "black"; // Set your desired text color
          ctx.textAlign = "center";

          // Draw the static text
          ctx.fillText(staticText, staticTextX, staticTextY);

          // Restore the previous transformation state
          ctx.restore();
        } else if (elapsedTime > 16 && elapsedTime <= 22) {
          const watermarkSize = 255;
          const moveDuration = 1.8; // Adjust the duration for upward movement
          const pulseFrequency = 8;
          const pulseAmplitude = 8;

          if (elapsedTime <= 16 + moveDuration) {
            // Code to execute during the upward movement phase
            const moveProgress = (elapsedTime - 16) / moveDuration;
            const initialY = canvas.height + watermarkSize; // Start from below the canvas
            const finalY = canvas.height - 400; // Adjust this value for the final position (move more above)
            const currentY =
              initialY - easeInOutQuad(moveProgress) * (initialY - finalY);

            // Draw watermark 2 from bottom-left
            ctx.drawImage(
              watermarkImageObjects[9],
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
            const finalY3 = canvas.height - 400; // The position where watermark 3 and 4 should hold

            // Calculate the current position for watermark 3 and 4
            const currentY3 =
              initialY3 - easeInOutQuad(moveProgress) * (initialY3 - finalY3);
            const currentY4 =
              initialY4 - easeInOutQuad(moveProgress) * (initialY4 - finalY3);

            // Draw watermark 3 from bottom-middle with easing
            ctx.drawImage(
              watermarkImageObjects[10],
              watermark3X,
              currentY3,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 4 from bottom-right with easing
            ctx.drawImage(
              watermarkImageObjects[11],
              watermark4X,
              currentY4,
              watermarkSize,
              watermarkSize
            );
          } else {
            // Code to execute after the upward movement phase (when watermark 3 and 4 should hold their position)
            // Draw watermark 2 at the top left
            ctx.drawImage(
              watermarkImageObjects[9],
              50,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 3 at the hold position
            const watermark3X = canvas.width / 2 - watermarkSize / 2;
            ctx.drawImage(
              watermarkImageObjects[10],
              watermark3X,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 4 at the hold position
            const watermark4X = canvas.width - watermarkSize - 50;
            ctx.drawImage(
              watermarkImageObjects[11],
              watermark4X,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Apply pulsing effect to watermark 2, 3, and 4 after reaching hold position
            const holdDuration = 3; // Adjust the duration for holding at the top
            const holdProgress = Math.min(
              1,
              (elapsedTime - (16 + moveDuration)) / holdDuration
            );
            const pulseSize =
              Math.sin(elapsedTime * pulseFrequency) * pulseAmplitude;
            const watermarkWidth = watermarkSize + pulseSize;
            const watermarkHeight = watermarkSize + pulseSize;

            // Apply pulsing effect to watermark 2
            ctx.drawImage(
              watermarkImageObjects[9],
              50,
              canvas.height - 400,
              watermarkWidth,
              watermarkHeight
            );

            // Apply pulsing effect to watermark 3
            ctx.drawImage(
              watermarkImageObjects[10],
              watermark3X,
              canvas.height - 400,
              watermarkWidth,
              watermarkHeight
            );

            // Apply pulsing effect to watermark 4
            ctx.drawImage(
              watermarkImageObjects[11],
              watermark4X,
              canvas.height - 400,
              watermarkWidth,
              watermarkHeight
            );
          }
        } else if (elapsedTime > 23) {
          // Display the watermark at the bottom-left with bottom margin
          const watermarkPosition = { x: 60, y: canvas.height - 130 }; // Updated y position to move upward by 20 pixels

          const bottomMargin = 0;
          const watermarkSize = 300;

          let rotateAngle = -Math.PI / 12; // Initialize rotation angle

          ctx.save(); // Save the current state of the canvas
          const watermark = watermarkImageObjects[8];
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
          const staticText = "Dr." + inputText3;
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
      recorder.stop();
      video.pause();
    }, video.duration * 1000);
  };

  //Download the 4th video with starting 4Images....
  const downloadWithWatermark4 = async () => {
    const video = videoRef3.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth / 2;
    canvas.height = video.videoHeight / 2;
    const ctx = canvas.getContext("2d");

    const audioCtx = new AudioContext();
    const dest = audioCtx.createMediaStreamDestination();

    const videoStream = canvas.captureStream();
    const audioStream = dest.stream;

    const recorder = new MediaRecorder(
      new MediaStream([
        videoStream.getVideoTracks()[0],
        audioStream.getAudioTracks()[0],
      ]),
      { mimeType: "video/webm" }
    );
    const chunks = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("video", blob, `${inputText4}.webm`);
      console.log(formData.get("video"));

      try {
        const response = await axios.post("/api/auth/videoCon", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // Ensure response type is set to arraybuffer to receive binary data
          responseType: "arraybuffer",
        });
        // Display a toast or handle download completion
        downloadcomplete();

        handleUserData(inputText4);

        // Check if selectedgroup is equal to "group2"
        if (selectedGroup === "group5") {
          // Call downloadWithWatermark1() after 30 seconds
          setTimeout(() => {
            downloadWithWatermark5();
          }, 12000); // 30 seconds in milliseconds
        } else if (selectedGroup === "group6") {
          setTimeout(() => {
            downloadWithWatermark5();
          }, 6000);
        }

        // Create a Blob object from the video data received in the response
        const videoBlob = new Blob([response.data], { type: "video/mp4" });

        // Create a URL for the video blob
        const videoBlobUrl = URL.createObjectURL(videoBlob);

        // Create a link element
        const downloadLink = document.createElement("a");
        downloadLink.href = videoBlobUrl;
        downloadLink.download = `${inputText4}.mp4`;
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

    recorder.start();
    video.play();

    //For smooth transition...
    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    // Easing function for smoother rotation (Cubic)
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    // For perfect time set....
    let holdImageUntilTime = 6;

    // console.log("date :",batchObjects);
    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // console.log("WaterMarkObject before use :", watermarkImageObjects);
      if (
        showWatermark &&
        watermarkImageObjects &&
        watermarkImageObjects.length > 0
      ) {
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

          const watermark = watermarkImageObjects[12];
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
          const staticText = "Dr." + inputText4;
          const topMargin = 32;

          const staticTextX = watermarkPosition.x + watermarkWidth / 2;
          const staticTextY = watermarkPosition.y + watermarkHeight + topMargin;

          // Customize text appearance
          ctx.font = "bold 33px 'Poppins', sans-serif";
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
              watermarkImageObjects[13],
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
              watermarkImageObjects[13],
              zoomedX,
              zoomedY,
              zoomedSize,
              zoomedSize
            );

            // Calculate positions for the third and fourth watermarks
            const thirdImage = watermarkImageObjects[14];
            const fourthImage = watermarkImageObjects[15];
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
            watermarkImageObjects[12],
            -watermarkSize / 2,
            -watermarkSize / 2,
            watermarkSize,
            watermarkSize
          );

          // Calculate the position for the static text after transformations
          const staticText = "Dr." + inputText4;
          const topMargin = 32;

          const staticTextX = 0; // Centered horizontally
          const staticTextY = watermarkSize / 2 + topMargin;

          // Customize text appearance
          ctx.font = "bold 33px 'Poppins', sans-serif";
          ctx.fillStyle = "black"; // Set your desired text color
          ctx.textAlign = "center";

          // Draw the static text
          ctx.fillText(staticText, staticTextX, staticTextY);

          // Restore the previous transformation state
          ctx.restore();
        } else if (elapsedTime > 16 && elapsedTime <= 22) {
          const watermarkSize = 255;
          const moveDuration = 1.8; // Adjust the duration for upward movement
          const pulseFrequency = 8;
          const pulseAmplitude = 8;

          if (elapsedTime <= 16 + moveDuration) {
            // Code to execute during the upward movement phase
            const moveProgress = (elapsedTime - 16) / moveDuration;
            const initialY = canvas.height + watermarkSize; // Start from below the canvas
            const finalY = canvas.height - 400; // Adjust this value for the final position (move more above)
            const currentY =
              initialY - easeInOutQuad(moveProgress) * (initialY - finalY);

            // Draw watermark 2 from bottom-left
            ctx.drawImage(
              watermarkImageObjects[13],
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
            const finalY3 = canvas.height - 400; // The position where watermark 3 and 4 should hold

            // Calculate the current position for watermark 3 and 4
            const currentY3 =
              initialY3 - easeInOutQuad(moveProgress) * (initialY3 - finalY3);
            const currentY4 =
              initialY4 - easeInOutQuad(moveProgress) * (initialY4 - finalY3);

            // Draw watermark 3 from bottom-middle with easing
            ctx.drawImage(
              watermarkImageObjects[14],
              watermark3X,
              currentY3,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 4 from bottom-right with easing
            ctx.drawImage(
              watermarkImageObjects[15],
              watermark4X,
              currentY4,
              watermarkSize,
              watermarkSize
            );
          } else {
            // Code to execute after the upward movement phase (when watermark 3 and 4 should hold their position)
            // Draw watermark 2 at the top left
            ctx.drawImage(
              watermarkImageObjects[13],
              50,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 3 at the hold position
            const watermark3X = canvas.width / 2 - watermarkSize / 2;
            ctx.drawImage(
              watermarkImageObjects[14],
              watermark3X,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 4 at the hold position
            const watermark4X = canvas.width - watermarkSize - 50;
            ctx.drawImage(
              watermarkImageObjects[15],
              watermark4X,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Apply pulsing effect to watermark 2, 3, and 4 after reaching hold position
            const holdDuration = 3; // Adjust the duration for holding at the top
            const holdProgress = Math.min(
              1,
              (elapsedTime - (16 + moveDuration)) / holdDuration
            );
            const pulseSize =
              Math.sin(elapsedTime * pulseFrequency) * pulseAmplitude;
            const watermarkWidth = watermarkSize + pulseSize;
            const watermarkHeight = watermarkSize + pulseSize;

            // Apply pulsing effect to watermark 2
            ctx.drawImage(
              watermarkImageObjects[13],
              50,
              canvas.height - 400,
              watermarkWidth,
              watermarkHeight
            );

            // Apply pulsing effect to watermark 3
            ctx.drawImage(
              watermarkImageObjects[14],
              watermark3X,
              canvas.height - 400,
              watermarkWidth,
              watermarkHeight
            );

            // Apply pulsing effect to watermark 4
            ctx.drawImage(
              watermarkImageObjects[15],
              watermark4X,
              canvas.height - 400,
              watermarkWidth,
              watermarkHeight
            );
          }
        } else if (elapsedTime > 23) {
          // Display the watermark at the bottom-left with bottom margin
          const watermarkPosition = { x: 60, y: canvas.height - 130 }; // Updated y position to move upward by 20 pixels

          const bottomMargin = 0;
          const watermarkSize = 300;

          let rotateAngle = -Math.PI / 12; // Initialize rotation angle

          ctx.save(); // Save the current state of the canvas
          const watermark = watermarkImageObjects[12];
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
          const staticText = "Dr." + inputText4;
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
      recorder.stop();
      video.pause();
    }, video.duration * 1000);
  };

  //Download the 5th video with starting 4Images....
  const downloadWithWatermark5 = async () => {
    const video = videoRef4.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth / 2;
    canvas.height = video.videoHeight / 2;
    const ctx = canvas.getContext("2d");

    const audioCtx = new AudioContext();
    const dest = audioCtx.createMediaStreamDestination();

    const videoStream = canvas.captureStream();
    const audioStream = dest.stream;

    const recorder = new MediaRecorder(
      new MediaStream([
        videoStream.getVideoTracks()[0],
        audioStream.getAudioTracks()[0],
      ]),
      { mimeType: "video/webm" }
    );
    const chunks = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("video", blob, `${inputText5}.webm`);
      console.log(formData.get("video"));

      try {
        const response = await axios.post("/api/auth/videoCon", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // Ensure response type is set to arraybuffer to receive binary data
          responseType: "arraybuffer",
        });

        // Display a toast or handle download completion
        downloadcomplete();

        handleUserData(inputText5);

        // Check if selectedgroup is equal to "group2"
        if (selectedGroup === "group6") {
          // Call downloadWithWatermark1() after 30 seconds
          setTimeout(() => {
            downloadWithWatermark6();
          }, 6000); // 30 seconds in milliseconds
        } else if (selectedGroup === "") {
        }

        // Create a Blob object from the video data received in the response
        const videoBlob = new Blob([response.data], { type: "video/mp4" });

        // Create a URL for the video blob
        const videoBlobUrl = URL.createObjectURL(videoBlob);

        // Create a link element
        const downloadLink = document.createElement("a");
        downloadLink.href = videoBlobUrl;
        downloadLink.download = `${inputText5}.mp4`;
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

    recorder.start();
    video.play();

    //For smooth transition...
    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    // Easing function for smoother rotation (Cubic)
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    // For perfect time set....
    let holdImageUntilTime = 6;

    // console.log("date :",batchObjects);
    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // console.log("WaterMarkObject before use :", watermarkImageObjects);
      if (
        showWatermark &&
        watermarkImageObjects &&
        watermarkImageObjects.length > 0
      ) {
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

          const watermark = watermarkImageObjects[16];
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
          const staticText = "Dr." + inputText5;
          const topMargin = 32;

          const staticTextX = watermarkPosition.x + watermarkWidth / 2;
          const staticTextY = watermarkPosition.y + watermarkHeight + topMargin;

          // Customize text appearance
          ctx.font = "bold 33px 'Poppins', sans-serif";
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
              watermarkImageObjects[17],
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
              watermarkImageObjects[17],
              zoomedX,
              zoomedY,
              zoomedSize,
              zoomedSize
            );

            // Calculate positions for the third and fourth watermarks
            const thirdImage = watermarkImageObjects[18];
            const fourthImage = watermarkImageObjects[19];
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
            watermarkImageObjects[16],
            -watermarkSize / 2,
            -watermarkSize / 2,
            watermarkSize,
            watermarkSize
          );

          // Calculate the position for the static text after transformations
          const staticText = "Dr." + inputText5;
          const topMargin = 32;

          const staticTextX = 0; // Centered horizontally
          const staticTextY = watermarkSize / 2 + topMargin;

          // Customize text appearance
          ctx.font = "bold 33px 'Poppins', sans-serif";
          ctx.fillStyle = "black"; // Set your desired text color
          ctx.textAlign = "center";

          // Draw the static text
          ctx.fillText(staticText, staticTextX, staticTextY);

          // Restore the previous transformation state
          ctx.restore();
        } else if (elapsedTime > 16 && elapsedTime <= 22) {
          const watermarkSize = 255;
          const moveDuration = 1.8; // Adjust the duration for upward movement
          const pulseFrequency = 8;
          const pulseAmplitude = 8;

          if (elapsedTime <= 16 + moveDuration) {
            // Code to execute during the upward movement phase
            const moveProgress = (elapsedTime - 16) / moveDuration;
            const initialY = canvas.height + watermarkSize; // Start from below the canvas
            const finalY = canvas.height - 400; // Adjust this value for the final position (move more above)
            const currentY =
              initialY - easeInOutQuad(moveProgress) * (initialY - finalY);

            // Draw watermark 2 from bottom-left
            ctx.drawImage(
              watermarkImageObjects[17],
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
            const finalY3 = canvas.height - 400; // The position where watermark 3 and 4 should hold

            // Calculate the current position for watermark 3 and 4
            const currentY3 =
              initialY3 - easeInOutQuad(moveProgress) * (initialY3 - finalY3);
            const currentY4 =
              initialY4 - easeInOutQuad(moveProgress) * (initialY4 - finalY3);

            // Draw watermark 3 from bottom-middle with easing
            ctx.drawImage(
              watermarkImageObjects[18],
              watermark3X,
              currentY3,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 4 from bottom-right with easing
            ctx.drawImage(
              watermarkImageObjects[19],
              watermark4X,
              currentY4,
              watermarkSize,
              watermarkSize
            );
          } else {
            // Code to execute after the upward movement phase (when watermark 3 and 4 should hold their position)
            // Draw watermark 2 at the top left
            ctx.drawImage(
              watermarkImageObjects[17],
              50,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 3 at the hold position
            const watermark3X = canvas.width / 2 - watermarkSize / 2;
            ctx.drawImage(
              watermarkImageObjects[18],
              watermark3X,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 4 at the hold position
            const watermark4X = canvas.width - watermarkSize - 50;
            ctx.drawImage(
              watermarkImageObjects[19],
              watermark4X,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Apply pulsing effect to watermark 2, 3, and 4 after reaching hold position
            const holdDuration = 3; // Adjust the duration for holding at the top
            const holdProgress = Math.min(
              1,
              (elapsedTime - (16 + moveDuration)) / holdDuration
            );
            const pulseSize =
              Math.sin(elapsedTime * pulseFrequency) * pulseAmplitude;
            const watermarkWidth = watermarkSize + pulseSize;
            const watermarkHeight = watermarkSize + pulseSize;

            // Apply pulsing effect to watermark 2
            ctx.drawImage(
              watermarkImageObjects[17],
              50,
              canvas.height - 400,
              watermarkWidth,
              watermarkHeight
            );

            // Apply pulsing effect to watermark 3
            ctx.drawImage(
              watermarkImageObjects[18],
              watermark3X,
              canvas.height - 400,
              watermarkWidth,
              watermarkHeight
            );

            // Apply pulsing effect to watermark 4
            ctx.drawImage(
              watermarkImageObjects[19],
              watermark4X,
              canvas.height - 400,
              watermarkWidth,
              watermarkHeight
            );
          }
        } else if (elapsedTime > 23) {
          // Display the watermark at the bottom-left with bottom margin
          const watermarkPosition = { x: 60, y: canvas.height - 130 }; // Updated y position to move upward by 20 pixels

          const bottomMargin = 0;
          const watermarkSize = 300;

          let rotateAngle = -Math.PI / 12; // Initialize rotation angle

          ctx.save(); // Save the current state of the canvas
          const watermark = watermarkImageObjects[16];
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
          const staticText = "Dr." + inputText5;
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
      recorder.stop();
      video.pause();
    }, video.duration * 1000);
  };

  //Download the 6th video with starting 4Images....
  const downloadWithWatermark6 = async () => {
    const video = videoRef5.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth / 2;
    canvas.height = video.videoHeight / 2;
    const ctx = canvas.getContext("2d");

    const audioCtx = new AudioContext();
    const dest = audioCtx.createMediaStreamDestination();

    const videoStream = canvas.captureStream();
    const audioStream = dest.stream;

    const recorder = new MediaRecorder(
      new MediaStream([
        videoStream.getVideoTracks()[0],
        audioStream.getAudioTracks()[0],
      ]),
      { mimeType: "video/webm" }
    );
    const chunks = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("video", blob, `${inputText6}.webm`);
      console.log(formData.get("video"));

      try {
        const response = await axios.post("/api/auth/videoCon", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // Ensure response type is set to arraybuffer to receive binary data
          responseType: "arraybuffer",
        });

        // Display a toast or handle download completion
        downloadcomplete();
        handleUserData(inputText6);
        // Create a Blob object from the video data received in the response
        const videoBlob = new Blob([response.data], { type: "video/mp4" });

        // Create a URL for the video blob
        const videoBlobUrl = URL.createObjectURL(videoBlob);

        // Create a link element
        const downloadLink = document.createElement("a");
        downloadLink.href = videoBlobUrl;
        downloadLink.download = `${inputText6}.mp4`;
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

    recorder.start();
    video.play();

    //For smooth transition...
    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    // Easing function for smoother rotation (Cubic)
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    // For perfect time set....
    let holdImageUntilTime = 6;

    // console.log("date :",batchObjects);
    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // console.log("WaterMarkObject before use :", watermarkImageObjects);
      if (
        showWatermark &&
        watermarkImageObjects &&
        watermarkImageObjects.length > 0
      ) {
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

          const watermark = watermarkImageObjects[20];
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
          const staticText = "Dr." + inputText6;
          const topMargin = 32;

          const staticTextX = watermarkPosition.x + watermarkWidth / 2;
          const staticTextY = watermarkPosition.y + watermarkHeight + topMargin;

          // Customize text appearance
          ctx.font = "bold 33px 'Poppins', sans-serif";
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
              watermarkImageObjects[21],
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
              watermarkImageObjects[21],
              zoomedX,
              zoomedY,
              zoomedSize,
              zoomedSize
            );

            // Calculate positions for the third and fourth watermarks
            const thirdImage = watermarkImageObjects[22];
            const fourthImage = watermarkImageObjects[23];
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
            watermarkImageObjects[20],
            -watermarkSize / 2,
            -watermarkSize / 2,
            watermarkSize,
            watermarkSize
          );

          // Calculate the position for the static text after transformations
          const staticText = "Dr." + inputText6;
          const topMargin = 32;

          const staticTextX = 0; // Centered horizontally
          const staticTextY = watermarkSize / 2 + topMargin;

          // Customize text appearance
          ctx.font = "bold 33px 'Poppins', sans-serif";
          ctx.fillStyle = "black"; // Set your desired text color
          ctx.textAlign = "center";

          // Draw the static text
          ctx.fillText(staticText, staticTextX, staticTextY);

          // Restore the previous transformation state
          ctx.restore();
        } else if (elapsedTime > 16 && elapsedTime <= 22) {
          const watermarkSize = 255;
          const moveDuration = 1.8; // Adjust the duration for upward movement
          const pulseFrequency = 8;
          const pulseAmplitude = 8;

          if (elapsedTime <= 16 + moveDuration) {
            // Code to execute during the upward movement phase
            const moveProgress = (elapsedTime - 16) / moveDuration;
            const initialY = canvas.height + watermarkSize; // Start from below the canvas
            const finalY = canvas.height - 400; // Adjust this value for the final position (move more above)
            const currentY =
              initialY - easeInOutQuad(moveProgress) * (initialY - finalY);

            // Draw watermark 2 from bottom-left
            ctx.drawImage(
              watermarkImageObjects[21],
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
            const finalY3 = canvas.height - 400; // The position where watermark 3 and 4 should hold

            // Calculate the current position for watermark 3 and 4
            const currentY3 =
              initialY3 - easeInOutQuad(moveProgress) * (initialY3 - finalY3);
            const currentY4 =
              initialY4 - easeInOutQuad(moveProgress) * (initialY4 - finalY3);

            // Draw watermark 3 from bottom-middle with easing
            ctx.drawImage(
              watermarkImageObjects[22],
              watermark3X,
              currentY3,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 4 from bottom-right with easing
            ctx.drawImage(
              watermarkImageObjects[23],
              watermark4X,
              currentY4,
              watermarkSize,
              watermarkSize
            );
          } else {
            // Code to execute after the upward movement phase (when watermark 3 and 4 should hold their position)
            // Draw watermark 2 at the top left
            ctx.drawImage(
              watermarkImageObjects[21],
              50,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 3 at the hold position
            const watermark3X = canvas.width / 2 - watermarkSize / 2;
            ctx.drawImage(
              watermarkImageObjects[22],
              watermark3X,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Draw watermark 4 at the hold position
            const watermark4X = canvas.width - watermarkSize - 50;
            ctx.drawImage(
              watermarkImageObjects[23],
              watermark4X,
              canvas.height - 400,
              watermarkSize,
              watermarkSize
            );

            // Apply pulsing effect to watermark 2, 3, and 4 after reaching hold position
            const holdDuration = 3; // Adjust the duration for holding at the top
            const holdProgress = Math.min(
              1,
              (elapsedTime - (16 + moveDuration)) / holdDuration
            );
            const pulseSize =
              Math.sin(elapsedTime * pulseFrequency) * pulseAmplitude;
            const watermarkWidth = watermarkSize + pulseSize;
            const watermarkHeight = watermarkSize + pulseSize;

            // Apply pulsing effect to watermark 2
            ctx.drawImage(
              watermarkImageObjects[21],
              50,
              canvas.height - 400,
              watermarkWidth,
              watermarkHeight
            );

            // Apply pulsing effect to watermark 3
            ctx.drawImage(
              watermarkImageObjects[22],
              watermark3X,
              canvas.height - 400,
              watermarkWidth,
              watermarkHeight
            );

            // Apply pulsing effect to watermark 4
            ctx.drawImage(
              watermarkImageObjects[23],
              watermark4X,
              canvas.height - 400,
              watermarkWidth,
              watermarkHeight
            );
          }
        } else if (elapsedTime > 23) {
          // Display the watermark at the bottom-left with bottom margin
          const watermarkPosition = { x: 60, y: canvas.height - 130 }; // Updated y position to move upward by 20 pixels

          const bottomMargin = 0;
          const watermarkSize = 300;

          let rotateAngle = -Math.PI / 12; // Initialize rotation angle

          ctx.save(); // Save the current state of the canvas
          const watermark = watermarkImageObjects[20];
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
          const staticText = "Dr." + inputText6;
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
      recorder.stop();
      video.pause();
    }, video.duration * 1000);
  };

  // Fetch the binary video data from the server......
  useEffect(() => {
    if (
      selectedGroup === "group1" ||
      selectedGroup === "group2" ||
      selectedGroup === "group3" ||
      selectedGroup === "group4" ||
      selectedGroup === "group5" ||
      selectedGroup === "group6"
    ) {
      axios
        .get(` http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:8050/${videoname}`, {
          responseType: "arraybuffer",
        })
        .then((res) => {
          // Create a Blob from the binary data
          const blob = new Blob([res.data], { type: "video/mp4" });
          setBinaryVideoData(blob);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedGroup,isLoadingVideo1,isLoadingVideo2]);

  // Update the video source when binary data changes for 1st Video....
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

  // Update the video source when binary data changes for 2nd Video....
  useEffect(() => {
    if (binaryVideoData) {
      // Create a URL for the Blob
      const videoURL = URL.createObjectURL(binaryVideoData);

      // Set the video source to the created URL
      const videoPlayer = videoRef1.current;
      if (videoPlayer) {
        videoPlayer.src = videoURL;
      }
    }
  }, [binaryVideoData]);

  // Update the video source when binary data changes for 3rd Video....
  useEffect(() => {
    if (binaryVideoData) {
      // Create a URL for the Blob
      const videoURL = URL.createObjectURL(binaryVideoData);

      // Set the video source to the created URL
      const videoPlayer = videoRef2.current;
      if (videoPlayer) {
        videoPlayer.src = videoURL;
      }
    }
  }, [binaryVideoData]);

  // Update the video source when binary data changes for 4th Video....
  useEffect(() => {
    if (binaryVideoData) {
      // Create a URL for the Blob
      const videoURL = URL.createObjectURL(binaryVideoData);

      // Set the video source to the created URL
      const videoPlayer = videoRef3.current;
      if (videoPlayer) {
        videoPlayer.src = videoURL;
      }
    }
  }, [binaryVideoData]);

  // Update the video source when binary data changes for 5th Video....
  useEffect(() => {
    if (binaryVideoData) {
      // Create a URL for the Blob
      const videoURL = URL.createObjectURL(binaryVideoData);

      // Set the video source to the created URL
      const videoPlayer = videoRef4.current;
      if (videoPlayer) {
        videoPlayer.src = videoURL;
      }
    }
  }, [binaryVideoData]);

  // Update the video source when binary data changes for 6th Video....
  useEffect(() => {
    if (binaryVideoData) {
      // Create a URL for the Blob
      const videoURL = URL.createObjectURL(binaryVideoData);

      // Set the video source to the created URL
      const videoPlayer = videoRef5.current;
      if (videoPlayer) {
        videoPlayer.src = videoURL;
      }
    }
  }, [binaryVideoData]);

  //Download Multiple videos......
  // const download2Videos = () =>{
  //     downloadWithWatermark1();
  //     downloadWithWatermark2();
  // }

  return (
    <>
      <div className="flex justify-center items-center flex-col ">
        <div className="w-[100vw]">
          <UserSidebar />
        </div>

        <div className="absolute top-[34px] w-[335px] ">
          <div className="flex flex-row justify-between items-center relative top-[-8px] ">
            <NavLink
              className="p-5 flex relative left-[-36px] "
              to={`/home/${MRID}`}
            >
              <div
                style={{ backgroundColor: "#F58420", color: "white" }}
                className="p-[12px] drop-shadow-lg    h-10 w-10   rounded-full relative  top-[-4px] left-[17px] "
              >
                <IoMdArrowRoundBack />
              </div>
            </NavLink>
            <div className="text-black text-[20px] font-bold relative left-[-120px] top-[4px]  ">
              <p>Video Card</p>
            </div>
          </div>

          <div className="font-bold text-[11px] top-[-34px] relative left-[55px] w-[250px] text-[rgba(158,156,158,1)] ">
            <p>Please select your preferable design templates.</p>
          </div>
          {/* Handle the dropdown options.... */}
          <div className="flex flex-col relative top-[-40px]">
            <select
              value={selectedGroup}
              onChange={handleGroupChange}
              className="mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-gray-800 hover:shadow-md transition duration-300"
            >
              <option value="select" className="text-gray-500">
                Select
              </option>
              <option value="group1">Number of Doctors 1</option>
              <option value="group2">Number of Doctors 2</option>
              <option value="group3">Number of Doctors 3</option>
              <option value="group4">Number of Doctors 4</option>
              <option value="group5">Number of Doctors 5</option>
              <option value="group6">Number of Doctors 6</option>
            </select>

            {selectedGroup === "group1" && (
              <div className="w-[335px] border-4 relative sm:w-[50vw] sm:left-[-200px] ">
                <video ref={videoRef} controls width="100%">
                  <source
                    src={binaryVideoData ? videoRef.current?.src : ""}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <br />
                <label className="relative left-[13px] text-[15px] mt-[10px]">
                  Doctor 1 Name*
                </label>
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px] relative left-[9px]"
                  value={inputText1}
                  onChange={handleInputTextChange1}
                  placeholder="Enter Doctor 1 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px]">
                  {remainingCharacters1} of {charLimit}
                </div>

                {groupInputs.group1.fileInputs.map((_, index) => (
                  <div
                    className="relative left-[10px]  mb-[10px]"
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

                <br />
                <button
                  onClick={addWatermark}
                  className={` ${
                    isButtonDisabled
                      ? "bg-gray-400 cursor-not-allowed text-black mt-[20px] rounded-md transition duration-300 w-full h-[30px]"
                      : "bg-yellow-500  text-black mt-[20px] rounded-md transition duration-300 w-full h-[30px]"
                  }`}
                  disabled={isButtonDisabled}
                >
                  Add Image
                </button>
                <ToastContainer />
                <button
                  onClick={downloadWithWatermark1}
                  className="bg-green-500 text-white mt-[20px] rounded-full  w-full h-[30px]"
                >
                  Download
                </button>
              </div>
            )}

            {selectedGroup === "group2" && (
              <div className="w-[335px] border-4 relative sm:w-[50vw] sm:left-[-200px] ">
                <div className=" grid grid-cols-2 gap-4">

                  

                  {/* <video ref={videoRef} controls width="380">
                    <source
                      src={binaryVideoData ? videoRef.current?.src : ""}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>


                  {videoRef.current && (
                    <video ref={videoRef1} controls width="380">
                      <source
                        src={binaryVideoData ? videoRef1.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )} */}

                  {/* Video 1 */}
<div className="video-container">
  {isLoadingVideo1 && (
    <div className="spicss" >
      <SyncLoader color="#36D7B7" size={10} margin={2} />
    </div>
  )}

  {!isLoadingVideo1 && (
    <video ref={videoRef} controls width="380" poster={Image1}>
      <source
        src={binaryVideoData ? videoRef.current?.src : ""}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  )}
</div>

{/* Video 2 */}
<div className="video-container">
  {isLoadingVideo2 && (
    <div className="spicss" >
      <SyncLoader color="#36D7B7" size={10} margin={2} />
    </div>
  )}

  {!isLoadingVideo2 && (
    <video ref={videoRef1} controls width="380" poster={Image1}>
      <source
        src={binaryVideoData ? videoRef1.current?.src : ""}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  )}
</div>





                </div>
                <label className="relative left-[13px] text-[15px] mt-[10px]">
                  Doctor 1 Name*
                </label>
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px] relative left-[9px]"
                  value={inputText1}
                  onChange={handleInputTextChange1}
                  placeholder="Enter Doctor 1 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px]">
                  {remainingCharacters1} of {charLimit}
                </div>
                {groupInputs.group2.fileInputs.slice(0, 4).map((_, index) => (
                  <div
                    className="relative left-[10px]  mb-[10px]"
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

               
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 2 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px]  left-[9px] relative sm:top-[25px]"
                  value={inputText2}
                  onChange={handleInputTextChange2}
                  placeholder="Enter Doctor 2 Name"
                />

                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters2} of {charLimit}
                </div>
                {groupInputs.group2.fileInputs.slice(4, 8).map((_, index) => (
                  <div
                    className="relative left-[10px]  mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 4)}
                    />
                  </div>
                ))}
                <br />
                <button
                  onClick={addWatermark}
                  className={` ${
                    isButtonDisabled
                      ? "bg-gray-400 cursor-not-allowed text-black mt-[20px] rounded-md transition duration-300 w-full h-[30px]"
                      : "bg-yellow-500  text-black mt-[20px] rounded-md transition duration-300 w-full h-[30px]"
                  }`}
                  disabled={isButtonDisabled}
                >
                  Add Image
                </button>
                <ToastContainer />
                <button
                  onClick={downloadWithWatermark1}
                  className="bg-green-500 text-white mt-[20px] rounded-full  w-full h-[30px]"
                >
                  Download
                </button>
              </div>
            )}

            {selectedGroup === "group3" && (
              <div className="w-[335px] border-4 relative sm:w-[50vw] sm:left-[-200px]  ">
                <div className=" grid grid-cols-3 gap-4">

                  <video ref={videoRef} controls width="300">
                    <source
                      src={binaryVideoData ? videoRef.current?.src : ""}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>


                  {videoRef.current && (
                    <video ref={videoRef1} controls width="300">
                      <source
                        src={binaryVideoData ? videoRef1.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {videoRef.current && (
                    <video ref={videoRef2} controls width="300">
                      <source
                        src={binaryVideoData ? videoRef2.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 1 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] sm:top-[20px] border-2 rounded-xl p-[10px] relative left-[9px]"
                  value={inputText1}
                  onChange={handleInputTextChange1}
                  placeholder="Enter Doctor 1 Name"
                />

                <div className="text-sm text-gray-500 flex justify-end mr-[10px]">
                  {remainingCharacters1} of {charLimit}
                </div>
                {groupInputs.group3.fileInputs.slice(0, 4).map((_, index) => (
                  <div
                    className="relative left-[10px]  mb-[10px]"
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

             
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 2 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px] left-[9px] relative sm:top-[25px]"
                  value={inputText2}
                  onChange={handleInputTextChange2}
                  placeholder="Enter Doctor 2 Name"
                />

                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters2} of {charLimit}
                </div>
                {groupInputs.group3.fileInputs.slice(4, 8).map((_, index) => (
                  <div
                    className="relative left-[10px]  mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 4)}
                    />
                  </div>
                ))}

               
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 3 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px] relative left-[9px]  sm:top-[25px]"
                  value={inputText3}
                  onChange={handleInputTextChange3}
                  placeholder="Enter Doctor 3 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters3} of {charLimit}
                </div>
                {groupInputs.group3.fileInputs.slice(8, 12).map((_, index) => (
                  <div
                    className="relative left-[10px]  mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 8)}
                    />
                  </div>
                ))}
                <br />

                {/*.......Handle the buttons..... */}
                <button
                  onClick={addWatermark}
                  className={` ${
                    isButtonDisabled
                      ? "bg-gray-400 cursor-not-allowed text-black mt-[20px] rounded-md transition duration-300 w-full h-[30px]"
                      : "bg-yellow-500  text-black mt-[20px] rounded-md transition duration-300 w-full h-[30px]"
                  }`}
                  disabled={isButtonDisabled}
                >
                  Add Image
                </button>
                <ToastContainer />
                <button
                  onClick={downloadWithWatermark1}
                  className="bg-green-500 mt-[20px] text-white rounded-full  w-full h-[30px]"
                >
                  Download
                </button>
              </div>
            )}

            {selectedGroup === "group4" && (
              <div className="w-[335px] border-4 relative sm:w-[50vw] sm:left-[-200px]  ">
                <div className=" grid grid-cols-2 gap-4">
                  <video ref={videoRef} controls width="350">
                    <source
                      src={binaryVideoData ? videoRef.current?.src : ""}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  {videoRef.current && (
                    <video ref={videoRef1} controls width="350">
                      <source
                        src={binaryVideoData ? videoRef1.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {videoRef.current && (
                    <video ref={videoRef2} controls width="350">
                      <source
                        src={binaryVideoData ? videoRef2.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {videoRef.current && (
                    <video ref={videoRef3} controls width="350">
                      <source
                        src={binaryVideoData ? videoRef3.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 1 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] sm:top-[20px] border-2 rounded-xl p-[10px] relative left-[9px]"
                  value={inputText1}
                  onChange={handleInputTextChange1}
                  placeholder="Enter Doctor 1 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px]">
                  {remainingCharacters1} of {charLimit}
                </div>
                {groupInputs.group4.fileInputs.slice(0, 4).map((_, index) => (
                  <div
                    className="relative left-[10px]  mb-[10px]"
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

            
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 2 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px]  relative left-[9px]  sm:top-[25px]"
                  value={inputText2}
                  onChange={handleInputTextChange2}
                  placeholder="Enter Doctor 2 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters2} of {charLimit}
                </div>
                {groupInputs.group4.fileInputs.slice(4, 8).map((_, index) => (
                  <div
                    className="relative left-[10px]  mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 4)}
                    />
                  </div>
                ))}

               
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 3 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px]  relative left-[9px]  sm:top-[25px]"
                  value={inputText3}
                  onChange={handleInputTextChange3}
                  placeholder="Enter Doctor 3 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters3} of {charLimit}
                </div>
                {groupInputs.group4.fileInputs.slice(8, 12).map((_, index) => (
                  <div
                    className="relative left-[10px]  mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 8)}
                    />
                  </div>
                ))}

               
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 4 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px] relative left-[9px]  sm:top-[25px] "
                  value={inputText4}
                  onChange={handleInputTextChange4}
                  placeholder="Enter Doctor 4 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters4} of {charLimit}
                </div>
                {groupInputs.group4.fileInputs.slice(12, 16).map((_, index) => (
                  <div
                    className="relative left-[10px] mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 12)}
                    />
                  </div>
                ))}
                <br />

                {/*.......Handle the buttons..... */}
                <button
                  onClick={addWatermark}
                  className={` ${
                    isButtonDisabled
                      ? "bg-gray-400 cursor-not-allowed text-black mt-[20px] rounded-md transition duration-300 w-full h-[30px]"
                      : "bg-yellow-500  text-black mt-[20px] rounded-md transition duration-300 w-full h-[30px]"
                  }`}
                  disabled={isButtonDisabled}
                >
                  Add Image
                </button>
                <ToastContainer />
                <button
                  onClick={downloadWithWatermark1}
                  className="bg-green-500 mt-[20px] text-white rounded-full  w-full h-[30px]"
                >
                  Download
                </button>
              </div>
            )}

            {selectedGroup === "group5" && (
              <div className="w-[335px] border-4 relative sm:w-[50vw] sm:left-[-200px] ">
                <div className=" grid grid-cols-2 gap-4">
                  <video ref={videoRef} controls width="380">
                    <source
                      src={binaryVideoData ? videoRef.current?.src : ""}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  {videoRef.current && (
                    <video ref={videoRef1} controls width="380">
                      <source
                        src={binaryVideoData ? videoRef1.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {videoRef.current && (
                    <video ref={videoRef2} controls width="380">
                      <source
                        src={binaryVideoData ? videoRef2.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {videoRef.current && (
                    <video ref={videoRef3} controls width="380">
                      <source
                        src={binaryVideoData ? videoRef3.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {videoRef.current && (
                    <video ref={videoRef4} controls width="380">
                      <source
                        src={binaryVideoData ? videoRef4.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
               
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 1 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] sm:top-[20px] h-[40px] border-2 rounded-xl p-[10px] relative left-[9px]"
                  value={inputText1}
                  onChange={handleInputTextChange1}
                  placeholder="Enter Doctor 1 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px]">
                  {remainingCharacters1} of {charLimit}
                </div>
                {groupInputs.group5.fileInputs.slice(0, 4).map((_, index) => (
                  <div
                    className="relative left-[10px] mb-[10px]"
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

              
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 2 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px] relative left-[9px]  sm:top-[25px]"
                  value={inputText2}
                  onChange={handleInputTextChange2}
                  placeholder="Enter Doctor 2 Name"
                />

                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters2} of {charLimit}
                </div>
                {groupInputs.group5.fileInputs.slice(4, 8).map((_, index) => (
                  <div
                    className="relative left-[10px] mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 4)}
                    />
                  </div>
                ))}

              
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 3 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px] relative left-[9px]  sm:top-[25px]"
                  value={inputText3}
                  onChange={handleInputTextChange3}
                  placeholder="Enter Doctor 3 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters3} of {charLimit}
                </div>
                {groupInputs.group5.fileInputs.slice(8, 12).map((_, index) => (
                  <div
                    className="relative left-[10px] mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 8)}
                    />
                  </div>
                ))}

              
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 4 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px] relative left-[9px]  sm:top-[25px]"
                  value={inputText4}
                  onChange={handleInputTextChange4}
                  placeholder="Enter Doctor 4 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters4} of {charLimit}
                </div>
                {groupInputs.group5.fileInputs.slice(12, 16).map((_, index) => (
                  <div
                    className="relative left-[10px] mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 12)}
                    />
                  </div>
                ))}

           
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 5 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px]  relative left-[9px]  sm:top-[25px] "
                  value={inputText5}
                  onChange={handleInputTextChange5}
                  placeholder="Enter Doctor 5 Name "
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters5} of {charLimit}
                </div>
                {groupInputs.group5.fileInputs.slice(16, 20).map((_, index) => (
                  <div
                    className="relative left-[10px] mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 16)}
                    />
                  </div>
                ))}
                <br />

                {/*.......Handle the buttons..... */}
                <button
                  onClick={addWatermark}
                  className={` ${
                    isButtonDisabled
                      ? "bg-gray-400 cursor-not-allowed text-black mt-[20px] rounded-md transition duration-300 w-full h-[30px]"
                      : "bg-yellow-500  text-black mt-[20px] rounded-md transition duration-300 w-full h-[30px]"
                  }`}
                  disabled={isButtonDisabled}
                >
                  Add Image
                </button>
                <ToastContainer />
                <button
                  onClick={downloadWithWatermark1}
                  className="bg-green-500 text-white mt-[20px] rounded-full  w-full h-[30px]"
                >
                  Download
                </button>
              </div>
            )}

            {selectedGroup === "group6" && (
              <div className="w-[335px] border-4  relative sm:w-[50vw] sm:left-[-200px]   ">
                <div className=" grid grid-cols-3 gap-4">
                  <video ref={videoRef} controls width="240">
                    <source
                      src={binaryVideoData ? videoRef.current?.src : ""}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  {videoRef.current && (
                    <video ref={videoRef1} controls width="240">
                      <source
                        src={binaryVideoData ? videoRef1.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {videoRef.current && (
                    <video ref={videoRef2} controls width="240">
                      <source
                        src={binaryVideoData ? videoRef2.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {videoRef.current && (
                    <video ref={videoRef3} controls width="240">
                      <source
                        src={binaryVideoData ? videoRef3.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {videoRef.current && (
                    <video ref={videoRef4} controls width="240">
                      <source
                        src={binaryVideoData ? videoRef4.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {videoRef.current && (
                    <video ref={videoRef5} controls width="240">
                      <source
                        src={binaryVideoData ? videoRef5.current?.src : ""}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 1 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] sm:top-[20px] border-2 rounded-xl p-[10px] relative left-[9px]"
                  value={inputText1}
                  onChange={handleInputTextChange1}
                  placeholder="Enter Doctor 1 Name"
                />

                <div className="text-sm text-gray-500 flex justify-end mr-[10px]">
                  {remainingCharacters1} of {charLimit}
                </div>
                {groupInputs.group6.fileInputs.slice(0, 4).map((_, index) => (
                  <div
                    className="relative left-[10px] mb-[10px]"
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

              
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 2 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px] relative left-[9px]  sm:top-[25px]"
                  value={inputText2}
                  onChange={handleInputTextChange2}
                  placeholder="Enter Doctor 2 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px]  relative sm:top-[25px]">
                  {remainingCharacters2} of {charLimit}
                </div>
                {groupInputs.group6.fileInputs.slice(4, 8).map((_, index) => (
                  <div
                    className="relative left-[10px] mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 4)}
                    />
                  </div>
                ))}

               
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 3 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px]  relative left-[9px]  sm:top-[25px]"
                  value={inputText3}
                  onChange={handleInputTextChange3}
                  placeholder="Enter Doctor 3 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters3} of {charLimit}
                </div>
                {groupInputs.group6.fileInputs.slice(8, 12).map((_, index) => (
                  <div
                    className="relative left-[10px] mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 8)}
                    />
                  </div>
                ))}

               
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 4 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px]  relative left-[9px]  sm:top-[25px]"
                  value={inputText4}
                  onChange={handleInputTextChange4}
                  placeholder="Enter Doctor 4 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters4} of {charLimit}
                </div>
                {groupInputs.group6.fileInputs.slice(12, 16).map((_, index) => (
                  <div
                    className="relative left-[10px] mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 12)}
                    />
                  </div>
                ))}

               
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 5 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px] relative left-[9px]  sm:top-[25px]"
                  value={inputText5}
                  onChange={handleInputTextChange5}
                  placeholder="Enter Doctor 5 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters5} of {charLimit}
                </div>
                {groupInputs.group6.fileInputs.slice(16, 20).map((_, index) => (
                  <div
                    className="relative left-[10px] mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 16)}
                    />
                  </div>
                ))}

               
<div className="w-[300px]  relative sm:left-[20px] left-[10px] sm:top-[10px] text-left"> 
                    <label className="">
                      Doctor 6 Name*
                    </label>
                    </div> 
                <input
                  type="text"
                  className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px] relative left-[9px]  sm:top-[25px]"
                  value={inputText6}
                  onChange={handleInputTextChange6}
                  placeholder="Enter Doctor 6 Name"
                />
                <div className="text-sm text-gray-500 flex justify-end mr-[10px] relative sm:top-[25px]">
                  {remainingCharacters6} of {charLimit}
                </div>
                {groupInputs.group6.fileInputs.slice(20, 24).map((_, index) => (
                  <div
                    className="relative left-[10px] mb-[10px]"
                    key={index}
                    style={{ display: "inline-block", marginRight: "10px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index + 20)}
                    />
                  </div>
                ))}
                <br />

                {/*.......Handle the buttons..... */}
                <button
                  onClick={addWatermark}
                  className={` ${
                    isButtonDisabled
                      ? "bg-gray-400 cursor-not-allowed text-black mt-[20px] rounded-md transition duration-300 w-full h-[30px]"
                      : "bg-yellow-500  text-black mt-[20px] rounded-md transition duration-300 w-full h-[30px]"
                  }`}
                  disabled={isButtonDisabled}
                >
                  Add Image
                </button>
                <ToastContainer />
                <button
                  onClick={downloadWithWatermark1}
                  className="bg-green-500 text-white mt-[20px] rounded-full  w-full h-[30px]"
                >
                  Download
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;



