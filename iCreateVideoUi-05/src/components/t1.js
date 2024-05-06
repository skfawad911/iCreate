//Template1  = Video Happy Doctor Day

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import { IoMdArrowRoundBack } from "react-icons/io";
import CropFun from "./Crop/CropFun";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image1 from "../components/assets/doctorimg.jpg";
import { SyncLoader } from "react-spinners";

const Template1 = () => {
  const videoRef = useRef(null);
  const audioCtxRef = useRef(null); // Add this line
  const audioSourceRef = useRef(null);
  const { videoname, MRID, name } = useParams();
  // console.log(name);
  // console.log(videoname);
  const [showWatermark, setShowWatermark] = useState(false);
  const [watermarkImage, setWatermarkImage] = useState(null);
  const [binaryVideoData, setBinaryVideoData] = useState(null);
  const [inputText, setInputText] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [isLoadingVideo1, setIsLoadingVideo1] = useState(false);

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

  // const [allVideName, setAllVideoName] = useState([]);

  //
  const [watermarkImages, setWatermarkImages] = useState([]);

  const charLimit = 19;

  // console.log("all images", watermarkImages);
  // console.log("one image", watermarkImage);
  //

  // console.log("Current watermarkImage:", watermarkImage);

  const [inputTextArray, setInputTextArray] = useState([]);
  // console.log(inputTextArray);
  const [selectedImageNames, setSelectedImageNames] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [inputText1, setInputText1] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [inputText3, setInputText3] = useState("");
  const [inputText4, setInputText4] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("group1");
  const [groupInputs, setGroupInputs] = useState({
    group1: { fileInputs: Array(1).fill(null) },
    group2: { fileInputs: Array(1).fill(null) },
    group3: { fileInputs: Array(1).fill(null) },
    group4: { fileInputs: Array(1).fill(null) },
    group5: { fileInputs: Array(1).fill(null) },
    group6: { fileInputs: Array(1).fill(null) },
    // Add more groups and specify the number of inputs for each
  });

  //MRID Get form localstorage...
  const mrId = localStorage.getItem("mrID");

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
    setIsButtonDisabled(false);
    setWatermarkImages([]);
    setInputTextArray([]);
    setInputText1("");
    setInputText2("");
    setInputText3("");
  };

  const handleInputTextChange1 = (e) => {
    const value = e.target.value;

    if (value.length <= charLimit) {
      setInputText1(e.target.value);
    }

    // Update inputTextArray for group2 with both input values
    setInputTextArray((prevInputTextArray) => {
      const newTextArray = [...prevInputTextArray];
      newTextArray[0] = e.target.value;
      return newTextArray;
    });
  };

  const remainingCharacters1 = Math.max(0, charLimit - inputText1.length);

  const handleInputTextChange2 = (e) => {
    const value = e.target.value;

    if (value.length <= charLimit) {
      setInputText2(e.target.value);
    }

    // Update inputTextArray for group2 with both input values
    setInputTextArray((prevInputTextArray) => {
      const newTextArray = [...prevInputTextArray];
      newTextArray[1] = e.target.value;
      return newTextArray;
    });
  };

  const remainingCharacters2 = Math.max(0, charLimit - inputText2.length);

  const handleInputTextChange3 = (e) => {
    const value = e.target.value;

    if (value.length <= charLimit) {
      setInputText3(e.target.value);
    }

    // Update inputTextArray for group2 with both input values
    setInputTextArray((prevInputTextArray) => {
      const newTextArray = [...prevInputTextArray];
      newTextArray[2] = e.target.value;
      return newTextArray;
    });
  };
  const remainingCharacters3 = Math.max(0, charLimit - inputText3.length);
  const handleInputTextChange4 = (e) => {
    setInputText4(e.target.value);

    // Update inputTextArray for group2 with both input values
    setInputTextArray((prevInputTextArray) => {
      const newTextArray = [...prevInputTextArray];
      newTextArray[3] = e.target.value;
      return newTextArray;
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //Handle the images input....
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedInputs = { ...groupInputs };
        console.log("group", updatedInputs);
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

        const updatedImages = [watermarkImages, ...watermarkImages];
        console.log("Up", updatedImages);
        updatedImages[index] = reader.result;
        setWatermarkImages(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const addWatermark = () => {
    console.log("Image" + watermarkImages.length);

    let isValid = true;

    if (selectedGroup === "group1" && watermarkImages.length <= 0) {
      failed();
      isValid = false;
    } else if (selectedGroup === "group2" && watermarkImages.length < 2) {
      failed();
      isValid = false;
    } else if (selectedGroup === "group3" && watermarkImages.length < 3) {
      failed();
      isValid = false;
    }

    if (isValid) {
      setShowWatermark(true);
      console.log(isButtonDisabled);
      // setButtonText('Image Added');
      setIsButtonDisabled(true);
      console.log("final", isButtonDisabled);

      // Reset button color after a certain delay (e.g., 2 seconds)
      setTimeout(() => {
        // setIsButtonDisabled(false);
        notify();
        console.log(isButtonDisabled);
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

    fetch(
      `http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:8050/api/auth/submitUsage/${mrId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.success);
        if (data.success === true) {
          console.log("Data Added");
        } else {
          console.log("Data Failed to Add");
        }
      });
  };

  const processSelectedImages = async (selectedImages, inputTextArray) => {
    if (selectedImages.length === 0) {
      return;
    }

    const image = selectedImages[0];
    const inputText = inputTextArray[0];
    console.log(inputText);

    // Set the watermarkImage state for the current image
    setWatermarkImage(image);
    setInputText(inputText);

    // Wait for the state to be updated
    await new Promise((resolve) => setTimeout(resolve, 0));

    try {
      // Process and generate video for the current image
      await downloadWithWatermark(image, inputText);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      // Reset watermarkImage state for the next iteration
      setWatermarkImage(null);
      setInputTextArray([]);

      // Process the rest of the images and input texts recursively
      await processSelectedImages(
        selectedImages.slice(1),
        inputTextArray.slice(1)
      );
    }
  };

  // Modify your onClick handler for Download Video button to use processSelectedImages
  const handleDownloadClick = async () => {
    if (selectedGroup === "group1") {
      if (
        watermarkImages.length > 0 &&
        inputText1 != "" &&
        isButtonDisabled === true
      ) {
        // Call the function to process selected images
        await processSelectedImages(watermarkImages, inputTextArray);
      } else {
        // Handle case when no images are selected

        failed();
      }
    } else if (selectedGroup === "group2") {
      if (
        watermarkImages.length == 2 &&
        inputText2 != "" &&
        isButtonDisabled === true
      ) {
        // Call the function to process selected images
        await processSelectedImages(watermarkImages, inputTextArray);
      } else {
        // Handle case when no images are selected

        failed();
      }
    } else if (selectedGroup === "group3") {
      if (
        watermarkImages.length == 3 &&
        inputText3 != "" &&
        isButtonDisabled === true
      ) {
        // Call the function to process selected images
        await processSelectedImages(watermarkImages, inputTextArray);
      } else {
        // Handle case when no images are selected

        failed();
      }
    } else if (selectedGroup === "group4") {
      if (
        watermarkImages.length == 4 &&
        inputText4 != "" &&
        isButtonDisabled === true
      ) {
        // Call the function to process selected images
        await processSelectedImages(watermarkImages, inputTextArray);
      } else {
        // Handle case when no images are selected

        failed();
      }
    }
  };

  const downloadWithWatermark = async (watermarkImage, inputText) => {
    // handleUserData();
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth / 2;
    canvas.height = video.videoHeight / 2;
    const ctx = canvas.getContext("2d");

    // Check if the AudioContext is already created
    const audioCtx = audioCtxRef.current || new AudioContext();
    audioCtxRef.current = audioCtx;
    //
    // Check if the HTMLMediaElementSourceNode is already created
    let audioSource = audioSourceRef.current;
    if (!audioSource) {
      audioSource = audioCtx.createMediaElementSource(video);
      audioSourceRef.current = audioSource;
    }

    const dest = audioCtx.createMediaStreamDestination();

    //
    const videoStream = canvas.captureStream();
    const audioStream = dest.stream;

    const combinedStream = new MediaStream([
      videoStream.getVideoTracks()[0],
      audioStream.getAudioTracks()[0],
    ]);

    //
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

    const mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: mimeType,
    });
    //

    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    //

    // Assuming you have already declared and initialized the mediaRecorder and chunks array

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("video", blob, `${inputText}.webm`);
      console.log(formData.get("video"));

      try {
        setIsLoadingVideo1(true);
        const response = await fetch(
          "  http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:8050/api/auth/videoCon",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Perform additional processing based on your requirements
        // ...

        // Display a toast or handle download completion
        downloadcomplete();

        //Submit User Usage Tracked Post API...
        handleUserData(inputText);

        setIsLoadingVideo1(false);

        navigate(`/home/${MRID}`);

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

        console.log("Video successfully sent to server for download");
      } catch (error) {
        console.error("Error while sending video to server:", error);
      } finally {
        setLoading(false);
      }
    };

    mediaRecorder.start();

    //
    video.play();

    //For smooth transition...
    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (showWatermark && watermarkImage) {
        const watermark = new Image();
        watermark.src = watermarkImage;

        const watermarkMaxWidth = canvas.width;
        const watermarkMaxHeight = canvas.height;

        const elapsedTime = video.currentTime;

        let watermarkWidth, watermarkHeight, watermarkPosition;

        let heldSize = { width: 50, height: 50 }; // Default size for initialization
        let heldPosition = { x: 0, y: 0 }; // Default position for initialization

        // Define pulse parameters
        const pulseFrequency = 8;
        const pulseAmplitude = 3;

        if (elapsedTime <= 10) {
          const progress = elapsedTime / 2;

          // Minimum size to avoid reaching zero
          const minSize = 292;

          // Calculate size with a minimum size
          watermarkWidth = Math.max(
            minSize,
            watermarkMaxWidth - progress * (watermarkMaxWidth - minSize)
          );
          watermarkHeight = Math.max(
            minSize,
            watermarkMaxHeight - progress * (watermarkMaxHeight - minSize)
          );

          // Add pulsing effect
          const pulseSize =
            Math.sin(elapsedTime * pulseFrequency) * pulseAmplitude;
          watermarkWidth += pulseSize;
          watermarkHeight += pulseSize;

          watermarkPosition = {
            x: 60, // Adjusted to stay at the middle-left side
            y: (canvas.height - watermarkHeight) / 2,
          };

          //Store the calculated size....
          heldSize = { width: watermarkWidth, height: watermarkHeight };
          heldPosition = { x: watermarkPosition.x, y: watermarkPosition.y };
        } else if (elapsedTime <= 28) {
          if (elapsedTime <= 10 + 1) {
            // During the first 2 seconds of the transition period (10 seconds to 12 seconds), calculate the eased progress
            const progress = (elapsedTime - 10) / 1;

            // Apply easing function to create a smooth motion
            const easedProgress = easeInOutQuad(progress);

            // Calculate the position based on the easing progress
            heldPosition = {
              x:
                canvas.width / 4 + 5 + easedProgress * (canvas.width / 2 - 120),
              y: (canvas.height - heldSize.height * 6) / 2,
            };
          } else {
            // After the first 2 seconds, stay at middle-right side without further easing
            heldPosition = {
              x: canvas.width / 2 + 120, // Middle-right side
              y: (canvas.height - heldSize.height * 6) / 2,
            };
          }

          watermarkPosition = heldPosition;

          // Adjust the watermark size after the transition
          watermarkWidth = heldSize.width * 6;
          watermarkHeight = heldSize.height * 6;

          // Add pulsing effect
          const pulseSize =
            Math.sin(elapsedTime * pulseFrequency) * pulseAmplitude;
          watermarkWidth += pulseSize;
          watermarkHeight += pulseSize;
        } else if (elapsedTime > 28) {
          const transitionDuration = 1; // Duration of the transition to the left side

          if (elapsedTime <= 28 + transitionDuration) {
            // During the transition period (from 27 seconds to 29 seconds), calculate the eased progress
            const progress = (elapsedTime - 28) / transitionDuration;

            // Apply easing function to create a smooth motion
            const easedProgress = easeInOutQuad(progress);

            // Calculate the position based on the easing progress to move to the left side
            heldPosition = {
              x:
                canvas.width / 2 + 120 - easedProgress * (canvas.width / 2 - 5),
              y: (canvas.height - heldSize.height * 6) / 2,
            };
          } else {
            // After the transition, stay at the middle-left side without further easing
            heldPosition = {
              x: 55, // Middle-left side
              y: (canvas.height - heldSize.height * 6) / 2,
            };
          }

          watermarkPosition = heldPosition;

          // Adjust the watermark size after the transition
          watermarkWidth = heldSize.width * 6;
          watermarkHeight = heldSize.height * 6;

          // Add pulsing effect
          const pulseSize =
            Math.sin(elapsedTime * pulseFrequency) * pulseAmplitude;
          watermarkWidth += pulseSize;
          watermarkHeight += pulseSize;
        }

        // Draw the border around the watermark
        ctx.strokeStyle = "white"; // Set border color to white
        ctx.lineWidth = 12; // Set border width to 12px (or adjust as needed)

        // Draw the border
        ctx.strokeRect(
          watermarkPosition.x - 6, // Adjusted x position for border
          watermarkPosition.y - 6, // Adjusted y position for border
          watermarkWidth + 12, // Add 12 to width for border
          watermarkHeight + 12 // Add 12 to height for border
        );

        // Draw the watermark
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
        const textPosition = {
          x:
            watermarkPosition.x +
            (watermarkWidth - ctx.measureText(staticText).width) / 2,
          y: watermarkPosition.y + watermarkHeight + topMargin + 12, // Adjust the vertical position as needed
        };

        ctx.fillStyle = "black";
        ctx.font = "bold 33px 'Poppins', sans-serif";
        ctx.fillText(staticText, textPosition.x, textPosition.y);
      }

      if (!video.ended) {
        setTimeout(() => {
          requestAnimationFrame(drawFrame);
        }, 1000 / 15); // Adjust the frame rate (15 frames per second in this example)
      }
    };

    // Start drawing frames
    drawFrame();

    // Connect the audio context to the destination
    audioCtx.resume().then(() => {
      audioSource.connect(dest);
    });

    setTimeout(() => {
      mediaRecorder.stop();
      video.pause();
    }, video.duration * 1000);
  };

  //

  // Fetch the binary video data from the server
  useEffect(() => {
    axios
      .get(
        `  http://check-alb-1122689352.ap-south-1.elb.amazonaws.com:8050/${videoname}`,
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
      <div className="flex justify-center items-center flex-col overflow-x-hidden ">
        <div className="w-[100vw]">
          <Sidebar />
        </div>

        <div className="absolute top-[34px] w-[335px]  sm:w-[750px] xl:left-[450px] sm:left-[265px]   ">
          <div className=" w-full">
            <div className="flex flex-row justify-between items-center relative top-[-8px] ">
              <NavLink
                className="p-5 flex relative left-[-36px] "
                to={`/home/${MRID}`}
              >
                <div
                  style={{ backgroundColor: "#F58420", color: "white" }}
                  className="p-[12px] drop-shadow-lg    h-10 w-10   rounded-full relative  top-[-4px] left-[17px] sm:left-[20px]  "
                >
                  <IoMdArrowRoundBack />
                </div>
              </NavLink>
              <div className="text-black text-[20px] font-bold relative left-[-120px] sm:left-[-320px] top-[-2px]  ">
                <p>Doctor's Day</p>
              </div>
            </div>
            <div className="font-bold text-[11px] top-[-34px] relative left-[105px] sm:left-[251px] w-[250px]   sm:text-center   text-[rgba(158,156,158,1)]">
              <p></p>
            </div>
          </div>

          <div className="">
            <div className="w-[335px] border-2  relative sm:w-auto top-[-30px]">
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Crop Modal"
              >
                <CropFun />
                {/* Close icon */}
                <div className="absolute top-[20px] right-0 bg-orange-500 p-[12px] drop-shadow-lg    h-10 w-10   rounded-full ">
                  <button onClick={closeModal} className="">
                    {" "}
                    <FaTimes color={"#fff"} />
                  </button>{" "}
                </div>
              </Modal>

              {/* Video 1 */}
              <div className="video-container">
                {isLoadingVideo1 && (
                  <div className="spicss">
                    <SyncLoader color="#36D7B7" size={10} margin={10} />
                  </div>
                )}

                {!isLoadingVideo1 && (
                  <video ref={videoRef} width="900" poster={Image1} playsInline>
                    {videoRef.current && (
                      <source
                        src={binaryVideoData ? videoRef.current?.src : ""}
                        type="video/mp4"
                      />
                    )}
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              <br />
              {/* relative left-[-93px] text-[15px] mt-[10px] sm:left-[-290px] */}
              {selectedGroup === "group1" && (
                <div className="w-full relative   ">
                  <div className="w-[300px]  relative sm:left-[20px] left-[10px] text-left">
                    <label className="">Doctor Name*</label>
                  </div>

                  <input
                    type="text"
                    className="w-[96%] mb-[10px] h-[40px] border-2 rounded-xl p-[10px] top-[10px] relative sm:top-[10px] sm:left-[10px] "
                    value={inputText1}
                    onChange={handleInputTextChange1}
                    placeholder="Enter Doctor Name(without Dr. prefix)"
                  />

                  <div className="text-sm text-gray-500 flex justify-end mr-[10px]">
                    {remainingCharacters1} of {charLimit}
                  </div>

                  {groupInputs.group1.fileInputs.map((_, index) => (
                    <div
                      className="relative left-[10px] w-full  mb-[10px]"
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
                    onClick={openModal}
                    className="bg-[#e5e5e5] text-black  rounded-full  transition duration-300 w-full h-[30px]"
                  >
                    Crop
                  </button>
                  <button
                    onClick={addWatermark}
                    className={` ${
                      isButtonDisabled
                        ? "bg-gray-400 cursor-not-allowed text-black mt-[20px] rounded-full transition duration-300 w-full h-[30px]"
                        : "bg-yellow-500  text-black mt-[20px] rounded-full transition duration-300 w-full h-[30px]"
                    }`}
                    disabled={isButtonDisabled}
                  >
                    Add Image
                  </button>
                  <ToastContainer />
                  <button
                    onClick={handleDownloadClick}
                    className="bg-green-500  text-white mt-[20px] rounded-full  w-full h-[30px]"
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* // new Ui  */}
    </>
  );
};

export default Template1;
